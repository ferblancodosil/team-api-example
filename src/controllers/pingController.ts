import { Request, Response } from 'express';
import * as pingService from '../services/pingService';

export const ping = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await pingService.getPingResponse();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};