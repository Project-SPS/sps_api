import { Router } from 'express';
import createSessionController from '../controllers/sessions/createSession.controllers';

const sessionRoutes = Router();

sessionRoutes.post('', createSessionController);

export default sessionRoutes;