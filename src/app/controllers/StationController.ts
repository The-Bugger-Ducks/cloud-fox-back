import { Request, Response } from 'express';
import { StationRepository } from "../../repositories/StationRepository"


export class StationController{
    async create(req:Request, res:Response){
        const {lat, long, localReference } = req.body

        const hasStation = StationRepository.find({where: localReference })

        if(!hasStation){
            const newStation = StationRepository.create({
                lat, long, localReference
            })

            await StationRepository.save(newStation)
            
            return res.status(201).json(newStation)

        }


        
    }

    async index(req: Request, res: Response) {
        const foundStation = await StationRepository.find();
    
        return res.json(foundStation);
      }
}
