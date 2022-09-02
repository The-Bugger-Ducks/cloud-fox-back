import { Request, Response } from 'express';
import { AppDataSource } from "../../../data-source";
import { User } from "../../entities/User";

export async function findUser(req: Request, res: Response) {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const userFound = await userRepository.findOne({
      where: {
        id,
      },
    });

    return {
      "message": userFound,
      "status": 200
    };

  } catch (err) {
    return {
      "message": {
        "error": "usuário não encontrado"
      },
      "status": 404
    }
  }
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

    return {
      "message": user,
      "status": 201
    };
  } else {
    return {
      "response": "Este e-mail já foi usado!",
      "status": 409
    };
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const userFound = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (!userFound) {
    return {
      "message": "Usuário não encontrado",
      "status": 404
    }
  }

  try {
    await userRepository.delete({
      id
    });

    return {
      "message": "Usuário deletado com sucesso!",
      "status": 200
    };

  } catch (err) {
    console.log('----------- ERR: ' + err)
    return {
      "message": "Não foi possível deletar o usuário!",
      "status": 500
    }
  }

}
