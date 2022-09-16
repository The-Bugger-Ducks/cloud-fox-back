import { Request, Response } from 'express';
import { AppDataSource } from '../../../data-source';
import { SolicitationRepository } from '../../../repositories/SolicitationRepository';
import { UserRepository } from '../../../repositories/UserRepository';
import { User } from '../../entities/User';



export async function createSolicitation(req: Request, res: Response) {
    const {roleReq, user} = req.body 

    const hasUser = await UserRepository.findOneBy({id:user})

    const hasSolicitation = await SolicitationRepository.findOneBy({id:user})

    const hasRole = await UserRepository.findOneBy({id:user})

    if(hasRole.role == roleReq){
        return {
            "message": "Você já possuí este nível de acesso",
            "status": 400
        }

    }

    if(!hasSolicitation && hasUser){


        const newSolicitation = SolicitationRepository.create({
           roleReq, user
        })

        await SolicitationRepository.save(newSolicitation)
        return {
            "message": "Solicitação criada",
            "status": 201
        }


        
    } else{
        return {
            "message": "Solicitação já existe ",
            "status": 409
        }
    }
}



export async function deleteSolicitation(req: Request, res: Response) {
    const {id, role, user} = req.body

    const hasSolicitation = await SolicitationRepository.findOne({
        relations:{
            user:true,
        },
        where:{id}

    })


    if(!hasSolicitation){
        return {
            "message": "Solicitação não existe",
            "status": 404
        }
    }

    if(hasSolicitation.roleReq != role){
        return{
            "message": "A permissão esta incondizente com a solicitação",
            "status": 400
        }

    }
    const hasUser = await UserRepository.findOneBy({id:user})



    if (!hasUser) {
        await SolicitationRepository.delete({id})
        return {
            "message": "Solicitação foi deletada",
            "status": 200
        }
    }else{

        hasUser.role = role ? role : hasUser.role
        await UserRepository.save(hasUser)            
        await SolicitationRepository.delete({id})
        return {
            "message": "Permissão alterada",
            "status": 200
        } 

    }

}