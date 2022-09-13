import { Request, Response } from 'express';
import { CollectRepository } from './../../repositories/CollectRepository';
import { StationRepository } from './../../repositories/StationRepository';


export async function createCollect(req: Request, res: Response) {
  const { moment, pluvValue, pluvUnit, heatValue,
    heatUnit, atmPresValue, atmPresUnit, humidityValue,
    humidityUnit, WindDirection, WindVelocity, station } = req.body

  if (!await StationRepository.findOne({ where: { id: station } })) {
    const newStation = StationRepository.create({ id: station });
    await StationRepository.save(newStation);
  }

  const hasCollect = await CollectRepository.findOne({ where: { moment } })
  if (!hasCollect) {
    const newCollect = CollectRepository.create({
      moment, pluvValue, pluvUnit, heatValue,
      heatUnit, atmPresValue, atmPresUnit, humidityValue,
      humidityUnit, WindDirection, WindVelocity, station

    })

    await CollectRepository.save(newCollect)

    return {
      "message": "Coletor cadastrada com sucesso",
      "status": 201
    }


  } else {
    return {
      "message": "Coletor já existe",
      "status": 409
    }
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