import { Request, Response } from 'express';
import * as coachService from '../services/coachService';

export const registerCoach = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, salary } = req.body;

    try {
        const newCoach = await coachService.createCoach(firstName, lastName, salary);
        res.status(201).json(newCoach);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};