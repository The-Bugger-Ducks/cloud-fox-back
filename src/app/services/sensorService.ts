import { Request, Response } from 'express';
import { SensorRepository } from '../../repositories/SensorRepository';
import { ICreateSensor } from '../interfaces/ICreateSensor';


export async function createSensor(req: Request, res: Response) {
  const { sensors }: { sensors: Array<ICreateSensor> } = req.body;

  sensors.map(async (newSensor: ICreateSensor) => {
    const sensorCreated = SensorRepository.create({
      model: newSensor.model,
      factor: newSensor.factor,
      maxRange: newSensor.maxRange,
      minRange: newSensor.minRange,
      unit: newSensor.unit,
      startDate: Date.now().valueOf(),
      endDate: null,
      stationId: newSensor.stationId,
    });
    await SensorRepository.save(sensorCreated);
  });

  return {
    "message": "Sensor cadastrado com sucesso",
    "status": 201
  }
}

export async function findSensor(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const SensorFound = await SensorRepository.findOne({
      relations: {
        station: true
      },
      where: { id, },
    });

    return {
      "message": SensorFound,
      "status": 200
    };

  } catch (err) {
    return {
      "message": {
        "error": "Sensor não encontrado"
      },
      "status": 404
    }
  }
}

export async function deleteSensor(req: Request, res: Response) {
  const { id } = req.params

  const sensorExist = await SensorRepository.findOne({ where: { id } })

  if (!sensorExist) {
    return {
      "message": "Sensor não existe",
      "status": 404
    }
  }

  try {
    await SensorRepository.delete({ id })

    return {
      "message": "Sensor foi deletado",
      "status": 200
    }

  } catch (error) {
    console.log(error);
  }
}









