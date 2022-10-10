import { Parameter } from "../app/entities/Parameter";
import { AppDataSource } from "../data-source";

export const ParameterRepository = AppDataSource.getRepository(Parameter)