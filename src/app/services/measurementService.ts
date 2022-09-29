import { Request, Response } from 'express';
import { MeasurementRepository } from '../../repositories/MeasurementRepository';


export async function measurementCreate(req: Request, res: Response) {
  const { moment, parameterId, value } = req.body

  const newCollect = MeasurementRepository.create({ moment, parameterId, value });
  await MeasurementRepository.save(newCollect)

  return {
    "message": "Coletor cadastrada com sucesso",
    "status": 201
  }
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
        "error": "Coletor não encontrado"
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
      "message": "Coletor não existe",
      "status": 404
    }
  }

  try {
    await MeasurementRepository.delete({ id: parseInt(id) })

    return {
      "message": "Coletor foi deletado",
      "status": 200
    }
  } catch (error) {
    console.log(error);
  }
}