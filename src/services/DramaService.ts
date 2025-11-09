import { Categories, Drama, DramasGenres, Episodes } from "src/types/collection_types.js";
import { BaseService } from "./BaseService.js";
import { DataFilter, MetaResponse } from "src/types/directus_types.js";

export class DramaService extends BaseService {
    async getAllDramas(filter: DataFilter): Promise<{ data: Drama[]; meta: MetaResponse }> {
        const fields = filter.fields?.length ? filter.fields : ['*'];
        const dramaService = this.getItemsService<Drama>('dramas');
        const allDramasData = await dramaService.readByQuery({
            fields: fields,
            limit: -1
        })

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
        const categoryService = this.getItemsService<Categories>('categories');
        const genresService = this.getItemsService<Categories>('genres');
        const dramasGenresService = this.getItemsService<DramasGenres>('dramas_genres');
        const episodesService = this.getItemsService<Episodes>('episodes');

        const categoriesData = await categoryService.readByQuery({ fields: ['*'], limit: -1 });
        const genresData = await genresService.readByQuery({ fields: ['*'], limit: -1 });

        const categoryCache = categoriesData || [];
        const genreCache = genresData || [];

        if (bodyRequest && bodyRequest.length > 0) {
            try {
                // Helper: create category dan tambahkan ke cache
                const createCategory = async (categoryName: string) => {
                    const newCatId = await categoryService.createOne({ name: categoryName });
                    categoryCache.push({ id: Number(newCatId), name: categoryName });
                    return newCatId;
                };

                // Helper: create genre dan tambahkan ke cache
                const createGenre = async (genreName: string) => {
                    const newGenId = await genresService.createOne({ name: genreName });
                    genreCache.push({ id: Number(newGenId), name: genreName });
                    return newGenId;
                };

                for (const drama of bodyRequest) {
                    // check if category of drama exists, if not, create it
                    const dramaCategory = drama.type;
                    let categoryId = null;
                    if (categoryCache && categoryCache.length > 0) {
                        const existingCategory = categoryCache.find(cat => cat.name.toLocaleLowerCase() === dramaCategory.toLocaleLowerCase())?.id;
                        if (existingCategory) {
                            categoryId = existingCategory;
                        } else {
                            categoryId = await createCategory(dramaCategory);       
                        }
                    } else {
                        categoryId = await createCategory(dramaCategory);
                    }

                    const dramaData = {
                        id: drama.id,
                        category: categoryId,
                        title: drama.name,
                        synopsis: drama.sinopsis,
                        cover_link: drama.imgSrc,
                        cover: drama.bookCover,
                        status: 'published',
                    }

                    const dramaId = await dramaService.createOne(dramaData);

                    // create genres relations
                    const dramaGenres = drama.genres;
                    if (dramaGenres && dramaGenres.length > 0) {
                        for (const genreName of dramaGenres) {
                            let genreId = null;
                            if (genreCache && genreCache.length > 0) {
                                genreId = genreCache.find(gen => gen.name.toLocaleLowerCase() === genreName.toLocaleLowerCase())?.id;
                                
                                if (!genreId) {
                                    genreId = await createGenre(genreName);
                                }
                            } else {
                                genreId = await createGenre(genreName);
                            }

                            if (dramaId && genreId) {
                                await dramasGenresService.createOne({
                                    drama_id: String(dramaId),
                                    genre_id: String(genreId),
                                });
                            }
                        }
                    }

                    // create episodes relations
                    const dramaEpisodes = drama.episodes;
                    if (dramaEpisodes && dramaEpisodes.length > 0) {
                        const episodeData = dramaEpisodes.map((episode: any) => {
                            const episodeNumber = episode.episodeNumber.match(/\d+/)?.[0];
                            const epsNum = episodeNumber ? Number(episodeNumber) : 0;
                            
                            return {
                                id: episode.idEpisode,
                                drama_id: dramaId,
                                episode_link: episode.href,
                                cover_link: episode.imgSrc,
                                cover: episode.episodeCover,
                                name: episode.alt,
                                episode_number: epsNum,
                                status: 'published',
                            }
                        });
                        
                        await this.knex.transaction(async (trx) => {
                            await trx('episodes').insert(episodeData);
                        });
                    }
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