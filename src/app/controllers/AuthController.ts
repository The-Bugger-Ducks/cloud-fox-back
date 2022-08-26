import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User } from '../entities/User';
import { AppDataSource } from '../../data-source';
class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email } = req.body
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      return res.sendStatus(401);
    }

    // --------------------------------------------------------------------------------------
    // quando o usuario tiver senha (habilitar este codigo e adaptar com usuario OAuth)
    // const isValidPassword = await bcrypt.compare(password, user.password)

    // if (!isValidPassword) {
    //   return res.sendStatus(401);
    // }

    // adicionar um dovEnv para guardar o secret, 
    // para fins de teste, deixarei aberto
    // --------------------------------------------------------------------------------------


    const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, { expiresIn: '1d' });

    return res.json({
      user,
      token
    })
  }
}

export default new AuthController();