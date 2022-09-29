import { Measurement } from "../app/entities/Measurement"
import { AppDataSource } from "../data-source"

export const MeasurementRepository = AppDataSource.getRepository(Measurement)