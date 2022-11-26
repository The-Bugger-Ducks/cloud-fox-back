import { Request, Response } from 'express';
import { AlertRepository } from '../../repositories/AlertRepository';
import logError from '../../utils/logError';
import { responseWithStatus } from '../../utils/responseWithStatus';
import { createAlert, deleteAlert } from '../services/alertService';


class AlertController {
  async show(req: Request, res: Response) {
    const { alertId } = req.params;
    try {
      const alertFound = await AlertRepository.findOne({ where: { id: parseInt(alertId), } });
      if (!alertFound) {
        const { message, status } = responseWithStatus("alerta não encontrado", 404)
        return res.json(message).status(status);
      }

      const { message, status } = responseWithStatus(alertFound, 200);
      return res.json(message).status(status);
    } catch (err) {
      logError(req, err);
      const { message, status } = responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
      return res.json(message).status(status);
    }
  }

  async index(req: Request, res: Response) {
    const alertsFound = await AlertRepository.find({});
    return res.json(alertsFound);
  }

  async create(req: Request, res: Response) {
    const alertsCreated = await createAlert(req, res);
    return res.json(alertsCreated.message).status(alertsCreated.status);
  }

  async delete(req: Request, res: Response) {
    const alertsCreated = await deleteAlert(req, res);
    return res.json(alertsCreated.message).status(alertsCreated.status);
  }
}

export default new AlertController();