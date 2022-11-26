import { Request, Response } from "express";
import { AlertRepository } from "../../repositories/AlertRepository";
import logError from "../../utils/logError";
import { responseWithStatus } from "../../utils/responseWithStatus";

export async function createAlert(req: Request, res: Response) {
  const { minLowAlert, maxLowAlert, minMediumAlert, maxMediumAlert, minHighAlert, maxHighAlert, parameterId } = req.body;

  try {
    const hasAlert = await AlertRepository.findOne({ where: {} })
    if (hasAlert) return responseWithStatus("Este alerta já existe", 409);

    const newAlert = AlertRepository.create({
      minLowAlert, maxLowAlert, minMediumAlert, maxMediumAlert, minHighAlert, maxHighAlert, parameter: parameterId,
      created_at: Date.now()
    });
    await AlertRepository.save(newAlert);

    return responseWithStatus("Alerta cadastrado com sucesso", 201);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde.", 500);
  }
}



export async function deleteAlert(req: Request, res: Response) {
  const { alertId } = req.params;

  try {
    const AlertFound = await AlertRepository.findOne({ where: { id: parseInt(alertId), }, });

    if (!AlertFound) return responseWithStatus("Usuário não foi encontrado.", 404);

    await AlertRepository.delete({ id: parseInt(alertId) });
    return responseWithStatus("Alerta deletado com sucesso!", 200);

  } catch (err) {
    logError(req, err);
    return responseWithStatus("Ocorreu um erro no servidor, tente novamente mais tarde", 500);
  }
}