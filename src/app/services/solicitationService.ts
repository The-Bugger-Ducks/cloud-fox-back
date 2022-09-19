import { Request, Response } from 'express';
import { SolicitationRepository } from '../../repositories/SolicitationRepository';
import { UserRepository } from '../../repositories/UserRepository';


export async function createSolicitation(req: Request, res: Response) {
    const {roleReq, user} = req.body 

    const hasUser = await UserRepository.findOne({ 
        relations:{
            solicitations:true
        },
        where:{id:user}
    })
    
    if (!hasUser) {
        return{
            "message": "Esse usuário não foi encontrado",
            "status": 404
        }       
    }
  
    if (hasUser.solicitations || hasUser.solicitations != null) {
        return{
            "message": "Essa solicitação já existe",
            "status": 409
        }       
    }

    if(hasUser.role == roleReq){
        return {
            "message": "Você já possuí este nível de acesso",
            "status": 400
        }
    }

    const newSolicitation = SolicitationRepository.create({
       roleReq, user
    })
    await SolicitationRepository.save(newSolicitation)
    return {
        "message": "Solicitação criada",
        "status": 201
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

    if (role == null) {
        await SolicitationRepository.delete({id})
        return {
            "message": "Solicitação foi deletada",
            "status": 200
        }
    }

    const hasUser = await UserRepository.findOneBy({id:user})

    if(hasSolicitation.roleReq != role){
        return{
            "message": "A permissão esta incondizente com a solicitação",
            "status": 400
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