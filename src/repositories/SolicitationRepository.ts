import { Solicitation } from "../app/entities/Solicitation";
import { AppDataSource } from "../data-source";

export const SolicitationRepository = AppDataSource.getRepository(Solicitation)