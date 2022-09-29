import { Request, Response } from 'express';
import { AppDataSource } from "../../data-source";
import { User } from "../entities/User";
import { UserRole } from '../enums/UserRoleEnum';

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

export async function findAdvancedUsers(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const usersFound = await userRepository.find({
      where: [{
        role: UserRole.ADVANCED
      },
      {
        role: UserRole.ADMIN
      }],
      order: {
        role: 'ASC',
        username: 'ASC'
      }
    });

    return {
      "message": usersFound,
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
  const { username, email, role, imgSrc } = req.body

  const userExists = await userRepository.findOne({ where: { email } })

  if (!userExists) {
    const user = userRepository.create({
      username,
      imgSrc,
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
      "message": userExists,
      "status": 200
    };
  }
}

export async function updateRole(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const { id, role } = req.body

  const userExists = await userRepository.findOne({ where: { id } })

  if (userExists) {
    const user = await userRepository.createQueryBuilder()
      .update(User)
      .set({ role: role })
      .where("id = :id", { id: id })
      .returning('*')
      .execute();

    return {
      "message": user.raw[0],
      "status": 200
    };
  } else {
    return {
      "message": "Usuário não foi encontrado.",
      "status": 404
    };
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
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
