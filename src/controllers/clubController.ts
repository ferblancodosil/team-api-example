import { Request, Response } from 'express';
import * as clubService from '../services/clubService';

export const registerClub = async (req: Request, res: Response): Promise<void> => {
    const { name, city, budget } = req.body;

    try {
        const newClub = await clubService.createClub(name, city, budget);
        res.status(201).json(newClub);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};