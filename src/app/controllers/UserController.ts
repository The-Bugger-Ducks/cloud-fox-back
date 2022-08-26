import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../entities/User';

class UserController {
  async index(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const usersFound = await userRepository.find();

    return res.json(usersFound);
  }

  async store(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const { username, email, role } = req.body

    const userExists = await userRepository.findOne({ where: { email } })

    if (!userExists) {
      const user = userRepository.create({
        username,
        email,
        role,
      });

      await userRepository.save(user)

      return res.json(user);
    } else {
      return res.sendStatus(409);
    }

  }
}

export default new UserController();