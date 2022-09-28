import { Request, Response, Router } from 'express';

// import authMiddleware from './app/middlewares/authMiddleware';

// import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import StationController from './app/controllers/StationController';
import SolicitationController from './app/controllers/SolicitationController';
import ParameterTypeController from './app/controllers/ParameterTypeController';
import MeasurementController from './app/controllers/MeasurementController';
import DashboardController from './app/controllers/DashboardController';
class Welcome {
  static getWelcome(req: Request, res: Response) {
    return res.send({ message: "CloudFox's API 🦊 ⛈️ 🌪️ " })
  }
}

const router = Router();

router.get('/', Welcome.getWelcome);

// router.post('/auth', AuthController.authenticate);

// router.get('/dashboard', DashboardController.getSingleOrAllParameters);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.get('/users/advanced', UserController.findAdvancedUsers);
router.post('/users', UserController.store);
router.delete('/users/:id', UserController.delete);

router.get('/solicitations', SolicitationController.index);
router.post('/users/solicitation', SolicitationController.solicitationtCreate);
router.delete('/solicitation', SolicitationController.solicitationtDelete);

router.get('/stations', StationController.index);
router.get('/stations/:id', StationController.show);
router.post('/stations', StationController.stationCreate);
router.put('/stations/activate/:id', StationController.stationActivate);
router.delete('/stations/:id', StationController.stationDelete);

router.get('/parametersType', ParameterTypeController.index);
router.get('/parametersType/:id', ParameterTypeController.show);
router.post('/parametersType', ParameterTypeController.parameterTypeCreate);
router.delete('/parametersType/:id', ParameterTypeController.parameterTypeDelete);

router.get('/measurements', MeasurementController.index);
router.get('/measurements/:id', MeasurementController.show);
router.post('/measurements', MeasurementController.measurementCreate);
router.delete('/measurements/:id', MeasurementController.measurementDelete);



export default router;