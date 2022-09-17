import { Collect } from "../app/entities/Collect"
import { AppDataSource } from "../data-source"

export const CollectRepository = AppDataSource.getRepository(Collect)