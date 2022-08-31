import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import StationController  from './app/controllers/StationController';


const router = Router();

router.get('/users', UserController.index)
router.post('/users', UserController.store);

router.get('/stations', StationController.index)
router.post('/stations', StationController.create);
router.post('/stations', StationController.createSensor);

router.post('/auth', AuthController.authenticate);





export default router;