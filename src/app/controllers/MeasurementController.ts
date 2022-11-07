import { Request, Response } from 'express';
import { MeasurementRepository } from '../../repositories/MeasurementRepository';
import { measurementCreate, measurementDelete, findOneMeasurement } from '../services/measurementService';

class MeasurementController {
  async index(req: Request, res: Response) {
    const usersFound = await MeasurementRepository.find();
    return res.json(usersFound);
  }

  async show(req: Request, res: Response) {
    const findResponse = await findOneMeasurement(req, res);
    return res.status(findResponse.status).json(findResponse.message);
  }

  async measurementCreate(req: Request, res: Response) {
    const createResponse = await measurementCreate(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }

  async measurementDelete(req: Request, res: Response) {
    const delateResponse = await measurementDelete(req, res);
    return res.status(delateResponse.status).json(delateResponse.message);

  }

}
export default new MeasurementController();