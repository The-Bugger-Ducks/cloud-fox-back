import { Request, Response } from 'express';
import { SolicitationRepository } from '../../repositories/SolicitationRepository';
import { UserRepository } from '../../repositories/UserRepository';
import logError from '../../utils/logError';
import { responseWithStatus } from '../../utils/responseWithStatus';


export async function createSolicitation(req: Request, res: Response) {
  const { roleReq, user } = req.body

  try {
    const hasUser = await UserRepository.findOne({
      relations: {
        solicitations: true
      },
      where: { id: user }
    })

    if (!hasUser) return responseWithStatus("Esse usuário não foi encontrado", 404);

    if (hasUser.solicitations || hasUser.solicitations != null) return responseWithStatus("Essa solicitação já existe", 409);

    if (hasUser.role == roleReq) return responseWithStatus("Você já possuí este nível de acesso", 400);

    const newSolicitation = SolicitationRepository.create({
      roleReq, user
    })
    await SolicitationRepository.save(newSolicitation)
    return responseWithStatus("Solicitação criada", 201);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}

export async function deleteSolicitation(req: Request, res: Response) {
  const { id, role, user } = req.body

  try {
    const hasSolicitation = await SolicitationRepository.findOne({
      relations: {
        user: true,
      },
      where: { id }

    })

    if (!hasSolicitation) return responseWithStatus("Solicitação não existe", 404);

    if (role == null) {
      await SolicitationRepository.delete({ id })
      return responseWithStatus("Solicitação foi deletada", 200);
    }

    const hasUser = await UserRepository.findOneBy({ id: user })

    if (hasSolicitation.roleReq != role) return responseWithStatus("A permissão esta incondizente com a solicitação", 400);

    hasUser.role = role ? role : hasUser.role
    await UserRepository.save(hasUser)
    await SolicitationRepository.delete({ id })
    return responseWithStatus("Permissão alterada", 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}