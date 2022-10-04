import { Request, Response } from "express";
import { Between } from "typeorm";
import { MeasurementRepository } from "../../repositories/MeasurementRepository";
import { ParameterRepository } from "../../repositories/ParameterRepository";
import { ParameterTypeRepository } from "../../repositories/ParameterTypeRepository";

export async function getSingleParam(req: Request, res: Response) {
  const { stationId, startDate, endDate, paramType } = req.query;

  const collectSingleParam = await MeasurementRepository.find({
    select: [
      'id', 'moment', 'value'
    ],
    where: {
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
      parameter: {
        stationId: String(stationId),
        parameterType: {
          type: String(paramType)
        }
      },
    },
    order: {
      parameter: {
        parameterType: {
          type: 'ASC'
        }
      },
      moment: 'ASC'
    }
  });



  if (collectSingleParam.length === 0) {
    return null;
  }
  return collectSingleParam;
}

export async function getAllParams(req: Request, res: Response) {
  const { stationId } = req.query;

  const allParams = await MeasurementRepository.find({
    where: {
      // moment: Between(parseInt(String(startDate)), parseInt(String(endDate)))
      parameter: {
        stationId: String(stationId)
      },
    },
    order: {
      moment: 'ASC',
    },
    relations: {
      parameter: {
        parameterType: true
      }
    }
  });

  if (allParams.length === 0) {
    return null;
  }
  return allParams;
}