import { Request, Response } from 'express';
import { ParameterRepository } from '../../repositories/ParameterRepository';
import { ParameterTypeRepository } from '../../repositories/ParameterTypeRepository';
import { Parameter } from '../entities/Parameter';
import { ParameterType } from '../entities/ParameterType';
import { Station } from '../entities/Station';
import { ICreateParameterType } from '../interfaces/ICreateParameterType';
import { ICreateStationWithParameterTypes } from '../interfaces/ICreateStationWithParameterTypes';
import { StationRepository } from "./../../repositories/StationRepository"


export async function createStation(req: Request, res: Response) {
  const { name, lat, lon, description, startdate } = req.body;

  const hasStation = await StationRepository.findOne({ where: { lat, lon } })
  if (!hasStation) {
    const newStation = StationRepository.create({
      name,
      lat,
      lon,
      description,
      startdate,
      isActive: false
    });
    await StationRepository.save(newStation);

    return {
      "message": "Estação cadastrada com sucesso",
      "status": 201
    }

  } else {
    return {
      "message": "Esta estação já existe",
      "status": 409
    }
  }
}

export async function createStationWithParameterTypes(req: Request, res: Response) {
  const { id, name, lat, lon, description, parameterTypes }: ICreateStationWithParameterTypes = req.body;

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

    return { "message": "Estação cadastrada com sucesso", "status": 201 };

  } else {
    return { "message": "Esta estação já existe", "status": 409 };
  };
}


export async function findStation(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const stationFound = await StationRepository.findOne({
      relations: {
        parameters: true
      },
      where: {
        id,
      },
    });

    return {
      "message": stationFound,
      "status": 200
    };
  } catch (err) {
    return {
      "message": {
        "error": "Estação não encontrada"
      },
      "status": 404
    }
  }
}

export async function activateStation(req: Request, res: Response) {
  const { id } = req.params;

  const StationExist = await StationRepository.findOne({ where: { id } })
  if (!StationExist) {
    return {
      "message": "Estação não existe",
      "status": 404
    }
  }

  try {
    await StationRepository.createQueryBuilder()
      .update(Station)
      .set({ startdate: Date.now().valueOf() as any, isActive: true as any })
      .where("id = :id", { id: id })
      .execute();

    return {
      "message": "Estação foi Ativada",
      "status": 200
    }
  } catch (error) {
    console.log(error)
    return {
      "message": "Ocorreu um erro, tente novamente mais tarde.",
      "status": 500
    }
  }
}

export async function deleteStation(req: Request, res: Response) {
  const { id } = req.params

  const StationExist = await StationRepository.findOne({ where: { id } })

  if (!StationExist) {
    return {
      "message": "Estação não existe",
      "status": 404
    }
  }

  try {
    await StationRepository.delete({ id })

    return {
      "message": "Estação foi deletada",
      "status": 200
    }
  } catch (error) {
    console.log(error);
  }
}









