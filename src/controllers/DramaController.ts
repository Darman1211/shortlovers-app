import { Request, Response, NextFunction } from 'express';
import { parseDataFilter } from "../utils/dataFilter.js";
import * as services from "../services/index.js";
import { BaseController } from "./BaseController.js";

export class DramaController extends BaseController {
    async getDataDrama(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const dataFilter = parseDataFilter(req);

			const dramaService = new services.DramaService({
				...this.options,
				accountability: req.accountability,
			});

			const result = await dramaService.getAllDramas(dataFilter);
			res.json(result);

		} catch (error) {
            console.log('DramaController getDataDrama error:', error);
			// await handleControllerError(error, res, this.options, req.accountability);
		}
	}
}