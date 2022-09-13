import { Request, Response } from 'express';
import { CollectRepository } from '../../repositories/CollectRepository';
import { createCollect, DeleteCollect, findCollects } from '../services/collectService';

class CollectController {
    async index(req: Request, res: Response) {
        const usersFound = await CollectRepository.find();
        return res.json(usersFound);
    }


    async show(req: Request, res: Response) {
        const findResponse = await findCollects(req, res);
        return res.status(findResponse.status).json(findResponse.message);
    }

    async collectCreate(req: Request, res: Response) {
        const createResponse = await createCollect(req, res);
        return res.status(createResponse.status).json(createResponse.message);
    }

    async collectDelete(req: Request, res: Response) {
        const delateResponse = await DeleteCollect(req, res);
        return res.status(delateResponse.status).json(delateResponse.message);

    }

}
export default new CollectController();