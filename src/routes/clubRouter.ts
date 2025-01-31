import { Router } from 'express';
import * as clubController from '../controllers/clubController';

const router = Router();

// Ruta para dar de alta un club
router.post('/', clubController.registerClub);

// Ruta para modificar el presupuesto de un club
router.put('/budget', clubController.modifyClubBudget);

// Rutas para añadir y quitar jugadores
router.post('/players', clubController.addPlayer);
router.delete('/players/:playerId', clubController.removePlayer);

// Rutas para añadir y quitar entrenadores
router.post('/coaches', clubController.addCoach);
router.delete('/coaches/:coachId', clubController.removeCoach);

// Ruta para listar jugadores de un club
router.get('/:clubId/players', clubController.getPlayersInClub);

export default router;