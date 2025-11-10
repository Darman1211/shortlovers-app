import { Genres } from "src/types/collection_types.js";
import { BaseService } from "./BaseService.js";

export class GenreService extends BaseService {
    async createGenreIfNotExists(genreName: string): Promise<number> {
        const genresService = this.getItemsService<Genres>('genres');
        const genresData = await genresService.readByQuery({ fields: ['*'], limit: -1 });

        const existingGenre = genresData.find(gen => gen.name.toLocaleLowerCase() === genreName.toLocaleLowerCase())?.id;

        if (existingGenre) {
            return existingGenre;
        } else {
            const newGenId = await genresService.createOne({ name: genreName });
            return Number(newGenId);
        }
    }
}
