import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Station } from '../entities/Station';
import {createStation } from '../services/users/stationService';


class StationController{
    async index(req: Request, res: Response) {
        const foundStation = await AppDataSource.getRepository(Station);    
        return res.json(foundStation);
    }

    async stationCreate(req: Request, res: Response){
        const createResponse = await createStation(req,res)
        return res.status(createResponse.status).json(createResponse.message)
    }

    // async sensorCreate(req: Request, res: Response){
    //     const createSensorResponse = await createSensor(req,res)
    //     return res.status(createSensorResponse.status).json(createSensorResponse.message)
    // }
}
export default new StationController();