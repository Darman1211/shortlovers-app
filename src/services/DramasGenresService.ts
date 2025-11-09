import { DramasGenres } from "../types/collection_types.js";
import { BaseService } from "./BaseService.js";
import { GenreService } from "./GenreService.js";

export class DramasGenresService extends BaseService {
    async createGenresForDrama(genres: string[], dramaId: string) {
        const genresService = this.getItemsService<DramasGenres>('dramas_genres');
        const genreService = new GenreService(this.options);

        for (const genreName of genres) {
            const genreId = await genreService.createGenreIfNotExists(genreName);
            await genresService.createOne({
                drama_id: String(dramaId),
                genre_id: String(genreId),
            });
        }
    }
}
