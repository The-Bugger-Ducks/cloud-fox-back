import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../entities/User';
import { createUser, findUser } from '../services/users/userServices';

class UserController {
  async index(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const usersFound = await userRepository.find();

    return res.json(usersFound);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    return res.json(await findUser(req, res, id));
  }

  async store(req: Request, res: Response) {
    return await createUser(req, res);
  }
}

export default new UserController();