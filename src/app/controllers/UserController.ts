import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    res.send('ok')
  }

  async store(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { username, email, role } = req.body

    const userExists = await userRepository.findOne({ where: { email } })

    if (!userExists) {
      const user = userRepository.create({
        username,
        email,
        role
      });

      await userRepository.save(user)

      return res.json(user);
    } else {
      return res.sendStatus(409);
    }

  }
}

export default new UserController();