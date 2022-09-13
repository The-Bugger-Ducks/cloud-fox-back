import { Request, Response } from "express";
import { Between } from "typeorm";
import { CollectRepository } from "../../repositories/CollectRepository";
import { StationRepository } from "../../repositories/StationRepository";

class DashboardController {
	async getParameters(req:Request, res:Response) {
		const {stationId, startDate, endDate, parameter} = req.body;

		try {
			const collects = CollectRepository.find({
				relations: ['stations'],
				where:{
					station: stationId,
					moment: Between(startDate,endDate)
				}
			})
			// const collects = CollectRepository.createQueryBuilder("dashboard")
			// 	.where(`station = :stationId`, {stationId})
			// 	.andWhere(`momment BETWEEN :startDate AND :endDate`, {startDate, endDate})
			// 	.select([`collects.${parameter}Value`, `collect.${parameter}Unit`])
			// 	.execute();
	
				if(!collects) {
					return res.status(404).json("Não foi encontrado dados com esse filtro.");
				}
				return res.status(200).json(collects);
				
		} catch(err) {
			return res.status(500).json("Ocorreu um erro!");
		}


	}
}

export default new DashboardController();