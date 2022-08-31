import { Request, Response } from 'express';
import { SensorRepository } from '../../repositories/SensorRepostory';
import { StationRepository } from "../../repositories/StationRepository"


class StationController{
    async create(req:Request, res:Response){
        const {lat, long, localReference, sensor } = req.body

        const hasStation = StationRepository.find({where: localReference })
        const hasSensor = StationRepository.find({where: sensor })


        if(hasSensor){
            await SensorRepository.insert(await hasSensor)
        }


        if(!hasStation){
            const newStation = StationRepository.create({
                lat, long, localReference
            })

            await StationRepository.save(newStation)
            
            return res.status(201).json(newStation)
        } else {
            return res.sendStatus(409);
        }

    }

    async index(req: Request, res: Response) {
        const foundStation = await StationRepository.find();
    
        return res.json(foundStation);
    }


    async createSensor(req: Request, res: Response){

        const {model, minrange, maxrange, accurace, 
            start_date, end_date, unit, station } = req.body

        const hasSensor = SensorRepository.findOneBy({unit})


        if (!hasSensor){
            const newSensor = SensorRepository.create({
                model, minrange, maxrange, accurace, 
                start_date, end_date, unit 
            })


            await SensorRepository.save(newSensor)

            return res.status(201).json(newSensor)    
        }else{
            return res.status(409)
        }
    }
}
export default new StationController();