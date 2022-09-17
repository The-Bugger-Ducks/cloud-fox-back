import { Request, Response } from "express";
import { Between } from "typeorm";
import { CollectRepository } from "../../repositories/CollectRepository";

export async function getHeatParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.query;

  const heatParams = await CollectRepository.find({
    select: [
      'moment',
      'heatValue',
      'heatUnit'
    ],

    where: {
      station: {
        id: String(stationId)
      },
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
    },
  })

  return heatParams;
}

export async function getPluvParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.query;

  const pluvParams = await CollectRepository.find({
    select: [
      'moment',
      'pluvValue',
      'pluvUnit'
    ],

    where: {
      station: {
        id: String(stationId)
      },
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
    },
  })

  return pluvParams;
}

export async function getHumidityParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.query;

  const humidityParams = await CollectRepository.find({
    select: [
      'moment',
      'humidityValue',
      'humidityUnit',
    ],

    where: {
      station: {
        id: String(stationId)
      },
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
    },
  })

  return humidityParams;
}

export async function getAtmPressureParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.query;

  const atmPressureParams = await CollectRepository.find({
    select: [
      'moment',
      'atmPresValue',
      'atmPresUnit',
    ],

    where: {
      station: {
        id: String(stationId)
      },
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
    },
  })

  return atmPressureParams;
}

export async function getWindParams(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.query;

  const windParams = await CollectRepository.find({
    select: [
      'moment',
      "WindVelocityValue",
      'WindVelocityUnit',
      'WindDirectionValue',
      'WindDirectionUnit'
    ],

    where: {
      station: {
        id: String(stationId)
      },
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
    },
  })

  return windParams;
}

export async function getAllParamsWithDate(req: Request, res: Response) {
  const { stationId, startDate, endDate } = req.query;

  const allParamsfiltered = await CollectRepository.find({

    where: {
      station: {
        id: String(stationId)
      },
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
    },
  })

  return allParamsfiltered;
}

export async function getAllParams(req: Request, res: Response) {
  const { stationId } = req.query;

  const allParams = await CollectRepository.find({

    where: {
      station: {
        id: String(stationId)
      },
    },
  })

  return allParams;
}