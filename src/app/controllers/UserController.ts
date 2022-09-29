import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';

import { User } from '../entities/User';

import { createUser, findUser, deleteUser, findAdvancedUsers, updateRole } from '../services/userServices';

class UserController {
  async index(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const usersFound = await userRepository.find({
      relations: {
        solicitations: true
      }
    });

    return res.json(usersFound);
  }

  async show(req: Request, res: Response) {
    const findResponse = await findUser(req, res);
    return res.status(findResponse.status).json(findResponse.message);
  }

  async findAdvancedUsers(req: Request, res: Response) {
    const findResponse = await findAdvancedUsers(req, res);
    return res.status(findResponse.status).json(findResponse.message);
  }

  async store(req: Request, res: Response) {
    const createResponse = await createUser(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }

  async updateRole(req: Request, res: Response) {
    const updateResponse = await updateRole(req, res);
    return res.status(updateResponse.status).json(updateResponse.message);
  }

  async delete(req: Request, res: Response) {
    const deleteResponse = await deleteUser(req, res);
    return res.status(deleteResponse.status).json(deleteResponse.message);
  }
}

export default new UserController();