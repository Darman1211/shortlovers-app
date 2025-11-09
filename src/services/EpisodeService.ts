import { BaseService } from "./BaseService.js";

export class EpisodeService extends BaseService {
    async createEpisodesForDrama(episodes: any[], dramaId: string) {
        if (episodes && episodes.length > 0) {
            const episodeData = episodes.map((episode: any) => {
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
                };
            });

            await this.knex.transaction(async (trx) => {
                await trx('episodes').insert(episodeData);
            });
        }
    }
}
