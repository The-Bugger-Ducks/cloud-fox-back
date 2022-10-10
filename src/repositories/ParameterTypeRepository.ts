import { ParameterType } from "../app/entities/ParameterType";
import { AppDataSource } from "../data-source";

export const ParameterTypeRepository = AppDataSource.getRepository(ParameterType)