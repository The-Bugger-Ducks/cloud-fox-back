import { Request, Response } from 'express';
import { AlertRepository } from '../../repositories/AlertRepository';
import logError from '../../utils/logError';
import { responseWithStatus } from '../../utils/responseWithStatus';
import { createAlert, deleteAlert } from '../services/alertService';


class AlertController {
  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const alertFound = await AlertRepository.findOne({
        relations: ['parameter', 'parameter.parameterType'],
        where: { id: parseInt(String(id)), },
      });

      if (!alertFound) {
        const { message, status } = responseWithStatus("alerta não encontrado", 404)
        return res.status(status).json(message);
      }

      const { message, status } = responseWithStatus(alertFound, 200);
      return res.json(message).status(status);
    } catch (err) {
      logError(req, err);
      const { message, status } = responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
      return res.status(status).json(message);
    }
  }

  async index(req: Request, res: Response) {
    const alertsFound = await AlertRepository.find({ relations: ['parameter.parameterType'] });
    return res.json(alertsFound);
  }

  async create(req: Request, res: Response) {
    const alertsCreated = await createAlert(req, res);
    return res.status(alertsCreated.status).json(alertsCreated.message);
  }

  async delete(req: Request, res: Response) {
    const alertsCreated = await deleteAlert(req, res);
    return res.status(alertsCreated.status).json(alertsCreated.message);
  }
}

export default new AlertController();