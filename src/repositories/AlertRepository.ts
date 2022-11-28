import { Alert } from "../app/entities/Alert"
import { AppDataSource } from "../data-source"

export const AlertRepository = AppDataSource.getRepository(Alert)