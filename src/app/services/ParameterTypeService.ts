import { Request, Response } from 'express';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { ParameterTypeRepository } from '../../repositories/ParameterTypeRepository';
import logError from '../../utils/logError';
import { responseWithStatus } from '../../utils/responseWithStatus';
import { ICreateParameterType } from '../interfaces/ICreateParameterType';


export async function createParameterType(req: Request, res: Response) {
  const { parameterTypes }: { parameterTypes: Array<ICreateParameterType> } = req.body;

  try {
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

    return responseWithStatus("ParameterType cadastrado com sucesso", 201);

  } catch (err) {
    logError(req, err);
    responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
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

    if (!ParameterTypeFound) {
      return responseWithStatus("ParameterType não encontrado", 404);
    }

    return responseWithStatus(ParameterTypeFound, 200);

  } catch (err) {
    logError(req, err);
    responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}

export async function deleteParameterType(req: Request, res: Response) {
  const { id } = req.params

  try {
    const ParameterTypeExist = await ParameterTypeRepository.findOne({ where: { id: parseInt(id) } })

    if (!ParameterTypeExist) {
      return responseWithStatus("ParameterType não encontrado", 404);
    }

    await ParameterTypeRepository.delete({ id: parseInt(id) })
    return responseWithStatus("ParameterType foi deletado", 200);

  } catch (err) {
    logError(req, err);
    responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}









