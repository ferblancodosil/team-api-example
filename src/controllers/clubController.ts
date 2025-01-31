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

export const modifyClubBudget = async (req: Request, res: Response): Promise<void> => {
    const { clubId, newBudget } = req.body;

    try {
        const updatedClub = await clubService.updateClubBudget(clubId, newBudget);
        res.status(200).json(updatedClub);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addPlayer = async (req: Request, res: Response): Promise<void> => {
    const { clubId, playerId } = req.body;

    try {
        await clubService.addPlayerToClub(clubId, playerId);
        res.status(200).json({ message: 'Player added to club successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removePlayer = async (req: Request, res: Response): Promise<void> => {
    const { playerId } = req.params;

    try {
        await clubService.removePlayerFromClub(Number(playerId));
        res.status(200).json({ message: 'Player removed from club successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addCoach = async (req: Request, res: Response): Promise<void> => {
    const { clubId, coachId } = req.body;

    try {
        await clubService.addCoachToClub(clubId, coachId);
        res.status(200).json({ message: 'Coach added to club successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeCoach = async (req: Request, res: Response): Promise<void> => {
    const { coachId } = req.params;

    try {
        await clubService.removeCoachFromClub(Number(coachId));
        res.status(200).json({ message: 'Coach removed from club successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getPlayersInClub = async (req: Request, res: Response): Promise<void> => {
    const { clubId } = req.params;
    const { filter, page, pageSize } = req.query;

    try {
        const players = await clubService.listPlayersInClub(
            Number(clubId),
            String(filter),
            Number(page) || 1,
            Number(pageSize) || 10
        );
        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};