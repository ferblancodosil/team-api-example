import { Router } from 'express';
import * as playerController from '../controllers/playerController';

const router = Router();

// Ruta para dar de alta un jugador
router.post('/', playerController.registerPlayer);

export default router;