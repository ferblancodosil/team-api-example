import { Router } from 'express';
import * as clubController from '../controllers/clubController';

const router = Router();

// Ruta para dar de alta un club
router.post('/', clubController.registerClub);

export default router;