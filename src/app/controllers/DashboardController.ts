import { Request, Response } from "express";
import { getAllParams, getAtmPressureParams, getHeatParams, getHumidityParams, getPluvParams, getWindParams } from "../services/dashboardService";

class DashboardController {
	async getSingleOrAllParameters(req: Request, res: Response) {
		const { parameter } = req.query;

		console.log(parameter)

		try {
			let collects;

			if (parameter === 'heat') {
				collects = await getHeatParams(req, res);
			} else if (parameter === 'pluv') {
				collects = await getPluvParams(req, res);
			} else if (parameter === 'humidity') {
				collects = await getHumidityParams(req, res);
			} else if (parameter === 'wind') {
				collects = await getWindParams(req, res);
			} else if (parameter === 'atmPres') {
				collects = await getAtmPressureParams(req, res);
			} else if ((parameter === null || parameter === 'null' || parameter == undefined)) {
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