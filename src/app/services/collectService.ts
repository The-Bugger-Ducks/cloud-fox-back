import { Request, Response } from 'express';
import { CollectRepository } from './../../repositories/CollectRepository';
import { StationRepository } from './../../repositories/StationRepository';


export async function createCollect(req: Request, res: Response) {
  const { moment, sensorId, value } = req.body

  const newCollect = CollectRepository.create({ moment, sensorId, value });
  await CollectRepository.save(newCollect)

  return {
    "message": "Coletor cadastrada com sucesso",
    "status": 201
  }
}

export async function findCollects(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const collectFound = await CollectRepository.findOne({
      where: {
        id,
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

export async function DeleteCollect(req: Request, res: Response) {
  const { id } = req.params
  const hasCollect = await CollectRepository.findOne({ where: { id } })

  if (!hasCollect) {
    return {
      "message": "Coletor não existe",
      "status": 404
    }
  }

  try {
    await CollectRepository.delete({ id })

    return {
      "message": "Coletor foi deletado",
      "status": 200
    }
  } catch (error) {
    console.log(error);
  }
}