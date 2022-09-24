import { Request, Response } from 'express';
import { SensorRepository } from '../../repositories/SensorRepository';
import { ICreateSensor } from '../interfaces/ICreateSensor';
import { ICreateStationWithSensors } from '../interfaces/ICreateStationWithSensors';
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

export async function createStationWithSensors(req: Request, res: Response) {
  const { name, lat, lon, description, sensors }: ICreateStationWithSensors = req.body;

  const hasStation = await StationRepository.find({ where: { lat, lon } })

  if (hasStation.length < 1) {
    const newStation = StationRepository.create({ name, lat, lon, description });
    const stationSaved = await StationRepository.save(newStation);


    sensors.map(async sensor => {
      const sensorCreated = SensorRepository.create({
        model: sensor.model,
        factor: sensor.factor,
        maxRange: sensor.maxRange,
        minRange: sensor.minRange,
        unit: sensor.unit,
        startDate: Date.now().valueOf(),
        endDate: null,
        stationId: stationSaved.id,
      });
      console.log(stationSaved.id)
      const sensorSaved = await SensorRepository.save(sensorCreated);

      console.log("===================================", sensorSaved)
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
        sensors: true
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
    // await StationRepository.update({ id }, {
    //   startdate: Date.now().valueOf(),
    //   isActive: true
    // });

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









