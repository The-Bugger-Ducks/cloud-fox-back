import { Station } from "../app/entities/Station"
import { AppDataSource } from "../data-source"

export const StationRepository = AppDataSource.getRepository(Station)