import { Request, Response } from 'express';
import { IsNull, Not } from 'typeorm';
import { SensorRepository } from '../../repositories/SensorRepository';
import { ICreateSensor } from '../interfaces/ICreateSensor';
import { createSensor, deleteSensor, findSensor } from '../services/sensorService';


class SensorController {
  async index(req: Request, res: Response) {
    const sensorsFound = await SensorRepository.find({
      relations: { station: true, collects: true },
      where: {
        startDate: Not(IsNull())
      }
    });
    return res.json(sensorsFound);
  }

  async show(req: Request, res: Response) {
    const findResponse = await findSensor(req, res);
    return res.status(findResponse.status).json(findResponse.message);
  }

  async sensorCreate(req: Request, res: Response) {
    const createResponse = await createSensor(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }

  async sensorDelete(req: Request, res: Response) {
    const deleteResponse = await deleteSensor(req, res);
    return res.status(deleteResponse.status).json(deleteResponse.message);
  }


}
export default new SensorController();