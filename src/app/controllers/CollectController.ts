import { Request, Response } from 'express';
import { createCollect, DeleteCollect } from '../services/users/collectService';

class CollectController{
    // async index(req: Request, res: Response) {
    //     const StationRepository = AppDataSource.getRepository(Station);
    //     const usersFound = await StationRepository.find({
    //         relations:{
    //             collects: true
    //         }
    //     });
    //     return res.json(usersFound);
    //   }

    async collectCreate(req: Request, res: Response){
        const createResponse = await createCollect(req,res);
        return res.status(createResponse.status).json(createResponse.message);
    }

    async collectDelete(req: Request, res: Response){
        const delateResponse = await DeleteCollect(req,res);
        return res.status(delateResponse.status).json(delateResponse.message);

    }

}
export default new CollectController();