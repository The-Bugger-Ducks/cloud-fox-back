import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Station } from '../entities/Station';
import { ICreateSensor } from '../interfaces/ICreateSensor';
import { activateStation, createStation, createStationWithSensors, deleteStation, findStation } from '../services/stationService';


class StationController {
  async index(req: Request, res: Response) {
    const StationRepository = AppDataSource.getRepository(Station);

    if (req.query.isActive == 'true') {
      const stationsFound = await StationRepository.find({
        relations: {
          sensors: true
        },
        where: {
          isActive: true
        }
      });
      return res.json(stationsFound);
    }

    const stationsFound = await StationRepository.find({
      relations: {
        sensors: true
      }
    });
    return res.json(stationsFound);
  }

  async show(req: Request, res: Response) {
    const findResponse = await findStation(req, res);
    return res.status(findResponse.status).json(findResponse.message);
  }

  async stationCreate(req: Request, res: Response) {
    const { sensors }: { sensors: Array<ICreateSensor> } = req.body;
    let createResponse;

    if (!sensors || sensors.length < 0) {
      createResponse = await createStation(req, res);
    } else {
      createResponse = await createStationWithSensors(req, res);
    }
    return res.status(createResponse.status).json(createResponse.message);
  }

  async stationActivate(req: Request, res: Response) {
    const activateResponse = await activateStation(req, res);
    return res.status(activateResponse.status).json(activateResponse.message);
  }

  async stationDelete(req: Request, res: Response) {
    const deleteResponse = await deleteStation(req, res);
    return res.status(deleteResponse.status).json(deleteResponse.message);
  }


}
export default new StationController();