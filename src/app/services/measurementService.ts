import { Request, Response } from 'express';
import { MeasurementRepository } from '../../repositories/MeasurementRepository';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { ParameterTypeRepository } from '../../repositories/ParameterTypeRepository';
import { StationRepository } from '../../repositories/StationRepository';


export async function measurementCreate(req: Request, res: Response) {
  const { stationId, measurements, moment }: { stationId: string, measurements: object, moment: number } = req.body

  const stationExists = await StationRepository.findOne({ where: { id: stationId } });
  if (!stationExists) {
    return {
      "message": "Estação ainda não cadastrada!",
      "status": 404
    }
  }

  for (let [key, value] of Object.entries(measurements)) {
    const parameterTypeFound = await ParameterTypeRepository.findOne({
      where: {
        type: key
      }
    });
    if (!parameterTypeFound) {
      return { "message": "Tipo do Parametro não cadastrado ainda!", "status": 404 }
    }

    const parameterFound = await ParameterRepository.findOne({
      where: {
        stationId: stationId,
        parameterTypeId: parameterTypeFound.id
      }
    });
    if (!parameterFound) {
      return { "message": "Parametro não cadastrado ainda!", "status": 404 }
    }

    const newCollect = MeasurementRepository.create({ moment, parameterId: parameterFound.id, value: value });
    await MeasurementRepository.save(newCollect);
  }

  return { "message": "Medida cadastrada com sucesso", "status": 201 }
}

export async function findMeasurements(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const collectFound = await MeasurementRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return {
      "message": collectFound,
      "status": 200
    };
  } catch (err) {
    return {
      "message": {
        "error": "Medida não encontrada"
      },
      "status": 404
    }
  }
}

export async function measurementDelete(req: Request, res: Response) {
  const { id } = req.params
  const hasCollect = await MeasurementRepository.findOne({ where: { id: parseInt(id) } })

  if (!hasCollect) {
    return {
      "message": "Medida não existe",
      "status": 404
    }
  }

  try {
    await MeasurementRepository.delete({ id: parseInt(id) })

    return {
      "message": "Medida foi deletada",
      "status": 200
    }
  } catch (error) {
    console.log(error);
  }
}