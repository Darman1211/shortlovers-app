import { Drama } from "src/types/collection_types.js";
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
}