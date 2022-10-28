import { Request, Response } from "express";
import { ParameterTypeRepository } from "../../repositories/ParameterTypeRepository";
import { StationRepository } from "../../repositories/StationRepository";
import logError from "../../utils/logError";
import { getAllParams, getSingleParam, } from "../services/dashboardService";

class DashboardController {
	async getSingleOrAllParameters(req: Request, res: Response) {
		const { stationId, paramType } = req.query;

		try {
			let collects = null;

			if (paramType === null || paramType === 'null' || paramType == undefined) {
				return res.status(404).json("O tipo do parametro não foi informado: ex: ?stationId=C14H&paramType=heat");
				collects = await getAllParams(req, res);
			} else {
				collects = await getSingleParam(req, res);
			}

			if (!collects) {
				return res.status(404).json("Não foi encontrado dados com esse filtro.");
			}
			return res.status(200).json(collects);

		} catch (err) {
			logError(req, err);
			return res.status(500).json("Ocorreu um erro!");
		}
	}
}

export default new DashboardController();