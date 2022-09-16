import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { StationRepository } from '../../repositories/StationRepository';
import { Station } from '../entities/Station';
import { createStation, deleteStation, findStation } from '../services/users/stationService';


class StationController{
    async index(req: Request, res: Response) {
        const usersFound = await StationRepository.find({
            relations:{
                collects: true
            }
        });
        return res.json(usersFound);
    }

    async show(req: Request, res: Response) {
        const findResponse = await findStation(req, res);
        return res.status(findResponse.status).json(findResponse.message);
    }

    async stationCreate(req: Request, res: Response){
        const createResponse = await createStation(req,res);
        return res.status(createResponse.status).json(createResponse.message);
    }

    async stationDelete(req: Request, res: Response){
        const deleteResponse = await deleteStation(req,res);
        return res.status(deleteResponse.status).json(deleteResponse.message);
    }


}
export default new StationController();