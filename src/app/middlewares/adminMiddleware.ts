import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/UserRepository';


interface TokenPayload {
  id:string;
}

export default async function adminMiddleware(
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
    
    if(user.role === 'admin'){
      return next();
    }
    
  } catch {
    return res.sendStatus(401);
  }
}