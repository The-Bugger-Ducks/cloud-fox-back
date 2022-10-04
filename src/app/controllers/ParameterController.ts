import { Request, Response } from 'express';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { createParameterType, deleteParameterType, findParameterType } from '../services/ParameterTypeService';


class ParameterController {
  async index(req: Request, res: Response) {
    const parametersFound = await ParameterRepository.find({
      relations: { station: true, measurements: true }
    });
    return res.json(parametersFound);
  }
}

export default new ParameterController();