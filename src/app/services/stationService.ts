import { Request, Response } from 'express';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { ParameterTypeRepository } from '../../repositories/ParameterTypeRepository';
import logError from '../../utils/logError';
import { responseWithStatus } from '../../utils/responseWithStatus';
import { Station } from '../entities/Station';
import { ICreateStationWithParameterTypes } from '../interfaces/ICreateStationWithParameterTypes';
import { StationRepository } from "./../../repositories/StationRepository"


export async function createStation(req: Request, res: Response) {
  const { id, name, lat, lon, description } = req.body;

  try {
    const hasStation = await StationRepository.findOne({ where: { lat, lon } })
    if (hasStation) {
      return responseWithStatus("Esta estação já existe", 409);
    }

    const newStation = StationRepository.create({
      id,
      name,
      lat,
      lon,
      description,
      isActive: false,
      startdate: null
    });
    await StationRepository.save(newStation);

    return responseWithStatus("Estação cadastrada com sucesso", 201);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde.", 500);
  }
}


export async function createStationWithParameterTypes(req: Request, res: Response) {
  const { id, name, lat, lon, description, parameterTypes }: ICreateStationWithParameterTypes = req.body;

  try {
    const hasStation = await StationRepository.find({ where: { lat, lon } })

    if (hasStation.length < 1) {
      const newStation = StationRepository.create({ id, name, lat, lon, description });
      const stationSaved = await StationRepository.save(newStation);

      parameterTypes.map(async parameterType => {
        const paramsTypeExists = await ParameterTypeRepository.findOne({ where: { name: parameterType.name } })
        if (paramsTypeExists) {
          const paramsCreated = ParameterRepository.create({
            stationId: stationSaved.id,
            parameterTypeId: paramsTypeExists.id,
          });
          const paramsSaved = await ParameterRepository.save(paramsCreated);

        } else {
          const paramsTypeCreated = ParameterTypeRepository.create({
            name: parameterType.name,
            factor: parameterType.factor,
            unit: parameterType.unit,
            type: parameterType.type
          });
          const paramsTypeSaved = await ParameterTypeRepository.save(paramsTypeCreated);

          const paramsCreated = ParameterRepository.create({
            stationId: stationSaved.id,
            parameterTypeId: paramsTypeSaved.id,
          });
          const paramsSaved = await ParameterRepository.save(paramsCreated);
        }
      });

      return responseWithStatus("Estação cadastrada com sucesso", 201);

    } else {
      return responseWithStatus("Esta estação já existe", 409);
    };

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde.", 500);
  }
}


export async function findStation(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const stationFound = await StationRepository.findOne({ where: { id, } });
    if (!stationFound) {
      return responseWithStatus("Estação não foi encontrada.", 404);
    }

    const paramsTypeFound = await ParameterTypeRepository.find({
      where: {
        parameter: {
          stationId: id
        }
      }
    });

    return responseWithStatus({ "station": stationFound, "parameterTypes": paramsTypeFound }, 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde.", 500);
  }
}


export async function activateStation(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const StationExist = await StationRepository.findOne({ where: { id } })
    if (!StationExist) {
      return responseWithStatus("Estação não foi encontrada.", 404);
    }

    await StationRepository.createQueryBuilder()
      .update(Station)
      .set({ startdate: Date.now().valueOf() as any, isActive: true as any })
      .where("id = :id", { id: id })
      .execute();

    return responseWithStatus("A Estação foi Ativada com sucesso", 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde.", 500);
  }
}


export async function updateStationData(req: Request, res: Response) {
  const { id, name, description, lat, lon, isActive } = req.body;

  try {
    const stationExist = await StationRepository.findOne({ where: { id } });
    if (!stationExist) {
      return responseWithStatus("Estação não foi encontrada.", 404);
    }

    const stationUpdated = await StationRepository.createQueryBuilder()
      .update(Station)
      .set({ name, description, lat, lon, isActive })
      .where("id = :id", { id })
      .returning('*').execute();

    return responseWithStatus(stationUpdated.raw[0], 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde.", 500);
  }
}


export async function deleteStation(req: Request, res: Response) {
  const { id } = req.params

  try {
    const StationExist = await StationRepository.findOne({ where: { id } })
    if (!StationExist) {
      return responseWithStatus("Estação não existe", 404);
    }

    await StationRepository.delete({ id })
    return responseWithStatus("A Estação foi deletada com sucesso", 200);

  } catch (err) {
    logError(req, err);
    responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde.", 500);
  }
}









