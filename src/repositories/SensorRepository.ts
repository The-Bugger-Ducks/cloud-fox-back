import { Sensor } from "../app/entities/Sensor";
import { AppDataSource } from "../data-source";

export const SensorRepository = AppDataSource.getRepository(Sensor)