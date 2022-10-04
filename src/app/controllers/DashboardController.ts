import { Request, Response } from "express";
import { ParameterTypeRepository } from "../../repositories/ParameterTypeRepository";
import { StationRepository } from "../../repositories/StationRepository";
import { getAllParams, getSingleParam, } from "../services/dashboardService";

class DashboardController {
	async getSingleOrAllParameters(req: Request, res: Response) {
		const { stationId, paramType } = req.query;

		const stationsFound = await StationRepository.findOne({ where: { id: String(stationId) } });
		const paramTypeFound = await ParameterTypeRepository.findOne({ where: { type: String(paramType) } });

		try {
			let collects;

			if (paramType === null || paramType === 'null' || paramType == undefined) {
				collects = await getAllParams(req, res);
			} else {
				collects = await getSingleParam(req, res);
			}

			if (!collects) {
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