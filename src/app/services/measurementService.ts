import { Request, Response } from 'express';
import { MeasurementRepository } from '../../repositories/MeasurementRepository';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { ParameterTypeRepository } from '../../repositories/ParameterTypeRepository';
import { StationRepository } from '../../repositories/StationRepository';
import logError from '../../utils/logError';
import { responseWithStatus } from '../../utils/responseWithStatus';


export async function measurementCreate(req: Request, res: Response) {
  const { stationId, measurements, moment }: { stationId: string, measurements: object, moment: number } = req.body

  try {
    const stationExists = await StationRepository.findOne({ where: { id: stationId } });
    if (!stationExists) {
      return responseWithStatus("Estação ainda não cadastrada!", 404);
    }

    for (let [key, value] of Object.entries(measurements)) {
      const parameterTypeFound = await ParameterTypeRepository.findOne({ where: { type: key } });
      if (!parameterTypeFound) {
        return responseWithStatus("Tipo do Parametro não cadastrado ainda!", 404);
      }

      const parameterFound = await ParameterRepository.findOne({
        where: {
          stationId: stationId,
          parameterTypeId: parameterTypeFound.id
        }
      });
      if (!parameterFound) {
        return responseWithStatus("Parametro não cadastrado ainda!", 404);
      }

      const newCollect = MeasurementRepository.create({ moment, parameterId: parameterFound.id, value: value });
      await MeasurementRepository.save(newCollect);
    }

    return responseWithStatus("Medida cadastrada com sucesso", 201);

  } catch (err) {
    logError(req, err);
    return responseWithStatus('Ocorreu um erro no servidor, tente novamente mais tarde.', 500);
  }
}

export async function findOneMeasurement(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const collectFound = await MeasurementRepository.findOne({ where: { id: parseInt(id), }, });

    if (!collectFound) {
      return responseWithStatus("A medida não existe", 404);
    }

    return responseWithStatus(collectFound, 200);
  } catch (err) {
    logError(req, err);
    return responseWithStatus('Ocorreu um erro no servidor, tente novamente mais tarde.', 500);
  }
}

export async function measurementDelete(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const hasCollect = await MeasurementRepository.findOne({ where: { id: parseInt(id) } })

    if (!hasCollect) {
      return responseWithStatus("A medida não existe", 404);
    }

    await MeasurementRepository.delete({ id: parseInt(id) })
    return responseWithStatus("A medida foi deletada", 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus('Ocorreu um erro no servidor, tente novamente mais tarde.', 500);
  }
}