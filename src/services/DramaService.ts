import { Drama } from "src/types/collection_types.js";
import { BaseService } from "./BaseService.js";
import { DataFilter, MetaResponse } from "src/types/directus_types.js";
import { CategoryService } from "./CategoryService.js";
import { GenreService } from "./GenreService.js";
import { DramasGenresService } from "./DramasGenresService.js";
import { EpisodeService } from "./EpisodeService.js";

export class DramaService extends BaseService {
    private categoryService: CategoryService;
    private genreService: GenreService;
    private dramasGenresService: DramasGenresService;
    private episodeService: EpisodeService;

    constructor(options: any) {
        super(options);
        this.categoryService = new CategoryService(options);
        this.genreService = new GenreService(options);
        this.dramasGenresService = new DramasGenresService(options);
        this.episodeService = new EpisodeService(options);
    }

    async getAllDramas(filter: DataFilter): Promise<{ data: Drama[]; meta: MetaResponse }> {
        const fields = filter.fields?.length ? filter.fields : ['*'];
        const dramaService = this.getItemsService<Drama>('dramas');
        const allDramasData = await dramaService.readByQuery({
            fields: fields,
            limit: -1
        });

        return {
            data: allDramasData,
            meta: {
                filter_count: 0,
                limit: 0,
                offset: 0,
                page: 0,
                page_count: 0
            },
        };
    }

    async createDramaAndEpisodes(bodyRequest: any): Promise<{ data: Drama[]; meta: MetaResponse }> {
        const dramaService = this.getItemsService<Drama>('dramas');

        if (bodyRequest && bodyRequest.length > 0) {
            try {
                for (const drama of bodyRequest) {
                    // Handle category
                    const categoryId = await this.categoryService.createCategoryIfNotExists(drama.type);

                    const dramaData = {
                        id: drama.id,
                        category: categoryId,
                        title: drama.name,
                        synopsis: drama.sinopsis,
                        cover_link: drama.imgSrc,
                        cover: drama.bookCover,
                        status: 'published',
                    };

                    const dramaId = await dramaService.createOne(dramaData);
                    
                    await this.dramasGenresService.createGenresForDrama(drama.genres, String(dramaId));
                    await this.episodeService.createEpisodesForDrama(drama.episodes, String(dramaId));
                }
            } catch (error) {
                throw error;
            }
        }

        const dramasData = await dramaService.readByQuery({ fields: ['*'], limit: -1 });

        return {
            data: dramasData,
            meta: {
                filter_count: 0,
                limit: 0,
                offset: 0,
                page: 0,
                page_count: 0
            },
        };
    }
}
