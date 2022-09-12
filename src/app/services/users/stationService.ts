import { Request, Response } from 'express';
import { StationRepository } from "../../../repositories/StationRepository"


export async function createStation(req: Request, res: Response){
    const {lat, lon, startdate, name} = req.body;
    

    const hasStation = await StationRepository.findOne({where: {name}})

    if(!hasStation){
        const newStation = StationRepository.create({
            lat, lon, startdate, name
        })
    
        await StationRepository.save(newStation)
    
        return{
            "message": "Estação cadastrada com sucesso",
            "status": 201
        }

    }else{
        return {
            "message": "Esta estação já existe",
            "status": 409
        }
    }

}


export async function findStation(req: Request, res: Response) {
    const { id } = req.params;
  
    try {
      const stationFound = await StationRepository.findOne({
        where: {
          id,
        },
      });
  
      return {
        "message": stationFound,
        "status": 200
      };
    } catch (err) {
      return {
        "message": {
          "error": "Estação não encontrada"
        },
        "status": 404
      }
    }

}
export async function deleteStation(req: Request, res: Response){
    const {id} = req.body

    const StationExist = await StationRepository.findOne({where:{id}})


    if(!StationExist){
        return {
            "message": "Estação não existe",
            "status": 404
        }
    }

    try {
        await StationRepository.delete({id})

        return {
            "message": "Estação foi deletada",
            "status": 200
        }
    } catch (error) {
        console.log(error);
        
        
    }

    
}








    
