import { Request, Response } from 'express';
import { CollectRepository } from '../../../repositories/CollectRepository';
import { StationRepository } from '../../../repositories/StationRepository';


export async function createCollect (req: Request, res: Response) {
    const {moment, pluvValue, pluvUnit, heatValue, 
        heatUnit, atmPresValue, atmPresUnit,humidityValue,
        humidityUnit,WindDirection,WindVelocity, station} = req.body


    const hasCollect = await CollectRepository.findOne({where: {moment} })




    if(!hasCollect){
        const newCollect = CollectRepository.create({
            moment, pluvValue, pluvUnit, heatValue, 
            heatUnit, atmPresValue, atmPresUnit,humidityValue,
            humidityUnit,WindDirection,WindVelocity, station

        })


        await CollectRepository.save(newCollect)

        return{
            "message": "Coletor cadastrada com sucesso",
            "status": 201
        }


    }else{
        return {
            "message": "Coletor já existe",
            "status": 409
        }
    }
    
}


export async function DeleteCollect(req: Request, res: Response) {

    const {id} = req.body

    const hasCollect = await CollectRepository.findOne({where: {id}})

    if(!hasCollect){
        return {
            "message": "Coletor não existe",
            "status": 409
        }
    }

    try {
        await CollectRepository.remove(id)

        return {
            "message": "Coletor foi deletado",
            "status": 201
        }
    } catch (error) {
        console.log(error);
        
        
    }


    
}