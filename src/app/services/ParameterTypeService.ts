import { Request, Response } from 'express';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { ParameterTypeRepository } from '../../repositories/ParameterTypeRepository';
import { ICreateParameterType } from '../interfaces/ICreateParameterType';


export async function createParameterType(req: Request, res: Response) {
  const { parameterTypes }: { parameterTypes: Array<ICreateParameterType> } = req.body;

  parameterTypes.forEach(async (newParameterType: ICreateParameterType) => {
    const paramsTypeExists = await ParameterTypeRepository.findOne({ where: { name: newParameterType.name } })
    if (paramsTypeExists) {
      const paramsCreated = ParameterRepository.create({
        stationId: newParameterType.stationId,
        parameterTypeId: paramsTypeExists.id,
      });
      const paramsSaved = await ParameterRepository.save(paramsCreated);

    } else {
      const paramsTypeCreated = ParameterTypeRepository.create({
        name: newParameterType.name,
        factor: newParameterType.factor,
        unit: newParameterType.unit,
        type: newParameterType.type
      });
      const paramsTypeSaved = await ParameterTypeRepository.save(paramsTypeCreated);

      const paramsCreated = ParameterRepository.create({
        stationId: newParameterType.stationId,
        parameterTypeId: paramsTypeSaved.id,
      });
      const paramsSaved = await ParameterRepository.save(paramsCreated);
    }
  });

  return {
    "message": "ParameterType cadastrado com sucesso",
    "status": 201
  }
}

export async function findParameterType(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const ParameterTypeFound = await ParameterTypeRepository.findOne({
      relations: {
        parameter: true
      },
      where: { id: parseInt(id) },
    });

    return {
      "message": ParameterTypeFound,
      "status": 200
    };

  } catch (err) {
    return {
      "message": {
        "error": "ParameterType não encontrado"
      },
      "status": 404
    }
  }
}

export async function deleteParameterType(req: Request, res: Response) {
  const { id } = req.params

  const ParameterTypeExist = await ParameterTypeRepository.findOne({ where: { id: parseInt(id) } })

  if (!ParameterTypeExist) {
    return {
      "message": "ParameterType não existe",
      "status": 404
    }
  }

  try {
    await ParameterTypeRepository.delete({ id: parseInt(id) })

    return {
      "message": "ParameterType foi deletado",
      "status": 200
    }

  } catch (error) {
    console.log(error);
  }
}









