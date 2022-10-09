import { Request, Response, Router } from 'express';

// import authMiddleware from './app/middlewares/authMiddleware';

// import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import StationController from './app/controllers/StationController';
import SolicitationController from './app/controllers/SolicitationController';
import ParameterTypeController from './app/controllers/ParameterTypeController';
import MeasurementController from './app/controllers/MeasurementController';
import DashboardController from './app/controllers/DashboardController';
import adminMiddleware from './app/middlewares/adminMiddleware';

import ParameterController from './app/controllers/ParameterController';
import advancedMiddleware from './app/middlewares/advancedMiddleware';
class Welcome {
  static getWelcome(req: Request, res: Response) {
    return res.send({ message: "CloudFox's API 🦊 ⛈️ 🌪️ " })
  }
}

const router = Router();

router.get('/', Welcome.getWelcome);

// router.post('/auth', AuthController.authenticate);

router.get('/dashboard', DashboardController.getSingleOrAllParameters);

router.get('/users', adminMiddleware, UserController.index);
router.get('/users/advanced', adminMiddleware, UserController.findAdvancedUsers);
router.get('/users/:id', adminMiddleware, UserController.show);
router.post('/users', UserController.store);
router.put('/users/updateRole',adminMiddleware, UserController.updateRole);
router.delete('/users/:id', adminMiddleware, UserController.delete);

router.get('/solicitations', adminMiddleware, SolicitationController.index);
router.post('/users/solicitation', SolicitationController.solicitationtCreate);
router.delete('/solicitation',adminMiddleware, SolicitationController.solicitationtDelete);

router.get('/stations', StationController.index);
router.put('/stations/activate/:id', advancedMiddleware, StationController.stationActivate);
router.get('/stations/:id', StationController.show);
router.post('/stations', advancedMiddleware, StationController.stationCreate);
router.delete('/stations/:id',advancedMiddleware, StationController.stationDelete);

router.get('/parametersType',advancedMiddleware, ParameterTypeController.index);
router.get('/parametersType/:id',advancedMiddleware, ParameterTypeController.show);
router.post('/parametersType', advancedMiddleware, ParameterTypeController.parameterTypeCreate);
router.delete('/parametersType/:id', advancedMiddleware, ParameterTypeController.parameterTypeDelete);

router.get('/parameters', advancedMiddleware ,ParameterController.index);

router.get('/measurements', MeasurementController.index);
router.get('/measurements/:id', MeasurementController.show);
router.post('/measurements', MeasurementController.measurementCreate);
router.delete('/measurements/:id', MeasurementController.measurementDelete);



export default router;