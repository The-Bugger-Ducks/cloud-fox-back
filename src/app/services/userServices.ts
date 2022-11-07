import { Request, Response } from 'express';
import { AppDataSource } from "../../data-source";
import { User } from "../entities/User";
import jwt from 'jsonwebtoken';
import { UserRole } from '../enums/UserRoleEnum';
import { Not } from 'typeorm';
import logError from '../../utils/logError';
import { responseWithStatus } from '../../utils/responseWithStatus';

export async function findUser(req: Request, res: Response) {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const userFound = await userRepository.findOne({ where: { id, }, });

    if (!userFound) return responseWithStatus("usuário não encontrado", 404);

    return responseWithStatus(userFound, 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}

export async function findAdvancedUsers(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const usersFound = await userRepository.find({
      where: [
        { role: UserRole.ADVANCED },
        { role: UserRole.ADMIN, id: Not(req.userId) },
      ],
      order: {
        role: 'ASC',
        username: 'ASC'
      }
    });

    if (usersFound.length <= 0) return responseWithStatus("usuário não encontrado", 404);

    return responseWithStatus(usersFound, 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}

export async function createUser(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const { username, email, role, imgSrc } = req.body

  try {
    const userExists = await userRepository.findOne({ where: { email } })

    if (!userExists) {
      const user = userRepository.create({
        username,
        imgSrc,
        email,
        role,
      });

      await userRepository.save(user)

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_JWT,
        { expiresIn: '1d' });

      return responseWithStatus({ user, token }, 201);
    } else {
      const token = jwt.sign(
        { id: userExists.id, role: userExists.role },
        process.env.SECRET_JWT,
        { expiresIn: '1d' }
      );

      return responseWithStatus({ userExists, token }, 200);
    }
  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}

export async function updateRole(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const { id, role } = req.body

  try {
    const userExists = await userRepository.findOne({ where: { id } })
    if (!userExists) return responseWithStatus("Usuário não foi encontrado.", 404);

    const user = await userRepository.createQueryBuilder()
      .update(User)
      .set({ role: role })
      .where("id = :id", { id: id })
      .returning('*').execute();

    return responseWithStatus(user.raw[0], 200);

  } catch (err) {
    logError(req, err);
    responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const userFound = await userRepository.findOne({ where: { id, }, });

    if (!userFound) return responseWithStatus("Usuário não foi encontrado.", 404);

    await userRepository.delete({ id });
    return responseWithStatus("Usuário deletado com sucesso!", 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }

}
