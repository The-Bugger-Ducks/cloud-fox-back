import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../entities/User';

interface TokenPayload {
  id:string;
}

export default async function advacedMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const verified = jwt.verify(token, process.env.SECRET_JWT);
    const { id } = verified as TokenPayload
    req.userId = id

    const user = await UserRepository.findOne({ where: { id } })

    if (user.role === 'advanced'){
        return next();
    }
    

  } catch {
    return res.sendStatus(401);
  }
}