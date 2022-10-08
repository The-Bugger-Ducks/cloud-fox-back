import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserRepository } from '../../repositories/UserRepository';
class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, role } = req.body

    const user = await UserRepository.findOne({ where: { email } })

    if (!user) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_JWT, 
      { expiresIn: '1d' });

    return res.json({
      user,
      role,
      token
    })
  }
}

export default new AuthController();