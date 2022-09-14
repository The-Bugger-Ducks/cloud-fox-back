import { Request, Response } from "express";
import { Between } from "typeorm";
import { CollectRepository } from "../../repositories/CollectRepository";
import { StationRepository } from "../../repositories/StationRepository";
import { getAllParams, getAtmPressureParams, getHeatParams, getHumidityParams, getPluvParams, getWindParams } from "../services/dashboardService";

class DashboardController {
	async getParameters(req: Request, res: Response) {
		const { parameter } = req.body;

		try {
			let collects;

			if (parameter === 'heat') {
				collects = await getHeatParams(req, res);
			} else if (parameter === 'pluv') {
				collects = await getPluvParams(req, res);
			} else if (parameter === 'umidity') {
				collects = await getHumidityParams(req, res);
			} else if (parameter === 'wind') {
				collects = await getWindParams(req, res);
			} else if (parameter === 'atmPres') {
				collects = await getAtmPressureParams(req, res);
			} else if (parameter === null) {
				collects = await getAllParams(req, res);
			}

			if (!collects || collects.length < 1) {
				return res.status(404).json("Não foi encontrado dados com esse filtro.");
			}
			return res.status(200).json(collects);

		} catch (err) {
			console.log(err)
			return res.status(500).json("Ocorreu um erro!");
		}


	}
}

export default new DashboardController();