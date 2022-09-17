import { User } from "../app/entities/User"
import { AppDataSource } from "../data-source"

export const UserRepository = AppDataSource.getRepository(User)