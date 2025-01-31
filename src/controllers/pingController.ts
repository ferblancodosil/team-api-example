import { Request, Response } from 'express';
import * as pingService from '../services/pingService';

export const ping = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await pingService.getPingResponse();
        res.json(response);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};