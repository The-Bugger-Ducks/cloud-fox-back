import { Request, Response } from 'express';
import { AppDataSource } from "../../../data-source";
import { User } from "../../entities/User";

export async function findUser(req: Request, res: Response, id: string) {
  const userRepository = AppDataSource.getRepository(User);
  const userFound = await userRepository.findOne({
    where: {
      id,
    },
  });

  return userFound;
}

export async function createUser(req: Request, res: Response) {
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