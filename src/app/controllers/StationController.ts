import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { StationRepository } from '../../repositories/StationRepository';
import { Station } from '../entities/Station';
import { createStation } from '../services/users/stationService';


class StationController{
    async index(req: Request, res: Response) {
        const StationRepository = AppDataSource.getRepository(Station);
        const usersFound = await StationRepository.find({
            relations:{
                collects: true
            }
        });
        return res.json(usersFound);
      }

    async stationCreate(req: Request, res: Response){
        const createResponse = await createStation(req,res);
        return res.status(createResponse.status).json(createResponse.message);
    }


}
export default new StationController();