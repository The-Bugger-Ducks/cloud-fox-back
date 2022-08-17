import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { email } = req.body

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      return res.sendStatus(401);
    }

    // const isValidPassword = await bcrypt.compare(password, user.password)

    // if (!isValidPassword) {
    //   return res.sendStatus(401);
    // }

    // adicionar um dovEnv para guardar o secret, 
    // para fins de teste, deixarei aberto
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    return res.json({
      user,
      token
    })
  }
}

export default new AuthController();