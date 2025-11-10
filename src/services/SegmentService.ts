import { BaseService } from "./BaseService.js";

export class SegmentService extends BaseService {
    async createSegments(segments: any) {
        try {
            if (segments && segments.length > 0) {
                const allSegmentData: any[] = [];
                
                for (const segData of segments) {
                    const segmentData = segData.segment;
                    if (segmentData && segmentData.length > 0) {
                        const segmentsDataFinal = segmentData.map((s: any) => {
                            return {
                                episode: segData.episode,
                                file_name: s,
                                status: 'published',
                            };
                        });

                        allSegmentData.push(...segmentsDataFinal);
                    }
                }

                if (allSegmentData.length > 0) {
                    await this.knex.transaction(async (trx) => {
                        await trx('segments').insert(allSegmentData);
                    });
                }
            }
        } catch (error) {
            throw error;
        }
    }
}
