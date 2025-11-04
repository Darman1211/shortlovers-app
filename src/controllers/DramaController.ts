import { Request, Response, NextFunction } from 'express';
import { parseDataFilter } from "../utils/dataFilter.js";
import * as services from "../services/index.js";
import { BaseController } from "./BaseController.js";

export class DramaController extends BaseController {
    async createDrama(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const bodyRequest = req.body;

			const dramaService = new services.DramaService({
				...this.options,
				accountability: req.accountability,
			});

			const result = await dramaService.createDramaAndEpisodes(bodyRequest);
			res.json(result);

		} catch (error) {
			console.log('DramaController createDrama error:', error);
			throw error;
			// await handleControllerError(error, res, this.options, req.accountability);
		}
	}
}