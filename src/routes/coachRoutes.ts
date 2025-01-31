import { Router } from 'express';
import * as coachController from '../controllers/coachController';

const router = Router();

// Ruta para dar de alta un entrenador
router.post('/', coachController.registerCoach);

export default router;