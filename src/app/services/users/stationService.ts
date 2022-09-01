import { Request, Response } from 'express';
import { AppDataSource } from '../../../data-source';
import { SensorRepository } from "../../../repositories/SensorRepository"
import { StationRepository } from "../../../repositories/StationRepository"
import { Station } from '../../entities/Station';

export async function createStation(req: Request, res: Response){
    const userRepository = AppDataSource.getRepository(Station);
    const {lat, lon, localReference, sensors} = req.body

    const hasStation = await userRepository.findOne({where: localReference})

    if(!hasStation){
        const newStation = userRepository.create({
            lat, lon, localReference, sensors
        })

        await StationRepository.save(newStation)

    }

    return{
        "message": "Estação cadastrada com sucesso",
        "status": 201
    }


}    



// export async function createSensor(req: Request, res: Response) {
//     const {sensors} = req.body

//     try {
//         const hasSensor = StationRepository.find(sensors)


//         if (!hasSensor) {

//             const {model, minRange, maxRange, accuracy, 
//                 startDate, endDate, unit } = req.body


                
//             const newSensor = SensorRepository.create({
//                 model, minRange, maxRange, accuracy, 
//                 startDate, endDate, unit 
//             })

//             await SensorRepository.save(newSensor)

//             return {
//                 "message": "Estação cadastrada",
//                 "status": 201
//               }
   
//         }else {
//             return {
//                 "message": "Este sensor já existe",
//                 "status": 409
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         return {
//             "status": 500
//           }       
//     }
// }

//     if(!hasSensor) {

//         const {model, minRange, maxRange, accuracy, 
//             startDate, endDate, unit, station } = req.body
        
//         const newSensor = SensorRepository.create({
//             model, minRange, maxRange, accuracy, 
//             startDate, endDate, unit
//         })

//         await SensorRepository.save(newSensor)
//     } else if(hasSensor){
//         return {
//             "message": {
//               "error": "Este sensor já existe"
//             },
//             "status": 409
//           }

//     }

// }
    
