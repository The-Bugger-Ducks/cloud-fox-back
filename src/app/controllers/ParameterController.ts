import { Request, Response } from 'express';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { createParameterType, deleteParameterType, findParameterType } from '../services/ParameterTypeService';


class ParameterTypeController {
  async index(req: Request, res: Response) {
    const parameterTypesFound = await ParameterRepository.find({
      relations: { station: true, measurements: true }
    });
    return res.json(parameterTypesFound);
  }

  async show(req: Request, res: Response) {
    const findResponse = await findParameterType(req, res);
    return res.status(findResponse.status).json(findResponse.message);
  }

  async parameterTypeCreate(req: Request, res: Response) {
    const createResponse = await createParameterType(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }

  async parameterTypeDelete(req: Request, res: Response) {
    const deleteResponse = await deleteParameterType(req, res);
    return res.status(deleteResponse.status).json(deleteResponse.message);
  }
}
export default new ParameterTypeController();