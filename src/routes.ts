import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import StationController  from './app/controllers/StationController';
import CollectController from './app/controllers/CollectController';



const router = Router();


router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.delete('/users', UserController.delete);

router.get('/stations', StationController.index);
router.post('/stations', StationController.stationCreate);

router.post('/collects', CollectController.collectCreate)
router.delete('/collects',CollectController.collectDelete)





router.post('/auth', AuthController.authenticate);



export default router;