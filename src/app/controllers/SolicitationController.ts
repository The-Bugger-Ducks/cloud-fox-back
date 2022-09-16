import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { SolicitationRepository } from '../../repositories/SolicitationRepository';
import { Solicitation } from '../entities/Solicitation';
import { createSolicitation, deleteSolicitation } from "../services/users/solicitationService";

class SolicitationController{

    async index(req: Request, res: Response) {
        const solicitationsFound = await SolicitationRepository.find();
        return res.json(solicitationsFound);
    }

    
    async solicitationtCreate(req: Request, res: Response){
        const createResponse = await createSolicitation(req,res);
        return res.status(createResponse.status).json(createResponse.message);
    }

    async solicitationtDelete(req: Request, res: Response){
        const createResponse = await deleteSolicitation(req,res);
        return res.status(createResponse.status).json(createResponse.message);
    }

}

export default new SolicitationController();