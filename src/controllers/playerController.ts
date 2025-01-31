import { Request, Response } from 'express';
import * as playerService from '../services/playerService';

export const registerPlayer = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, birthYear, salary } = req.body;

    try {
        const newPlayer = await playerService.createPlayer(firstName, lastName, birthYear, salary);
        res.status(201).json(newPlayer);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
