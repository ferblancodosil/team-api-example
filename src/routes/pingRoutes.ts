import { Router } from 'express';
import * as pingController from '../controllers/pingController';

const router = Router();

// Define the ping route
router.get('/', pingController.ping);

export default router;