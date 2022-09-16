import { Request, Response } from "express";
import { Between } from "typeorm";
import { CollectRepository } from "../../repositories/CollectRepository";

export async function getHeatParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.body;
  const heatParams = await CollectRepository.find({
    select: [
      'moment',
      'heatValue',
      'heatUnit'
    ],
    where: {
      station: stationId,
      moment: Between(startDate, endDate)
    }
  })

  return heatParams;
}

export async function getPluvParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.body;
  const pluvParams = await CollectRepository.find({
    select: [
      'moment',
      'pluvValue',
      'pluvUnit'
    ],
    where: {
      station: stationId,
      moment: Between(startDate, endDate)
    }
  })

  return pluvParams;
}

export async function getHumidityParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.body;
  const humidityParams = await CollectRepository.find({
    select: [
      'moment',
      'humidityValue',
      'humidityUnit',
    ],
    where: {
      station: stationId,
      moment: Between(startDate, endDate)
    }
  })

  return humidityParams;
}

export async function getAtmPressureParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.body;
  const atmPressureParams = await CollectRepository.find({
    select: [
      'moment',
      'atmPresValue',
      'atmPresUnit',
    ],
    where: {
      station: stationId,
      moment: Between(startDate, endDate)
    }
  })

  return atmPressureParams;
}

export async function getWindParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.body;
  const windParams = await CollectRepository.find({
    select: [
      'moment',
      "WindVelocityValue",
      'WindVelocityUnit',
      'WindDirectionValue',
      'WindDirectionUnit'
    ],
    where: {
      station: stationId,
      moment: Between(startDate, endDate)
    }
  })

  return windParams;
}

export async function getAllParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.body;
  const windParams = await CollectRepository.find({
    where: {
      station: stationId,
      moment: Between(startDate, endDate)
    }
  })

  return windParams;
}