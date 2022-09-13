import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import StationController from './app/controllers/StationController';
import CollectController from './app/controllers/CollectController';
import DashboardController from './app/controllers/DashboardController';



const router = Router();


router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.delete('/users/:id', UserController.delete);

router.get('/stations', StationController.index);
router.get('/stations/:id', StationController.show);
// router.post('/stations', StationController.stationCreate);
router.put('/stations/:id', StationController.stationActivate);
router.delete('/stations/:id', StationController.stationDelete);

router.get('/collects', CollectController.index);
router.get('/collects/:id', CollectController.show);
router.post('/collects', CollectController.collectCreate);
router.delete('/collects/:id', CollectController.collectDelete);

router.get('/dashboard', DashboardController.getParameters);



router.post('/auth', AuthController.authenticate);



export default router;