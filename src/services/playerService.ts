import prisma from '../db/prisma';
import { PlayerModel } from '../models';

export const createPlayer = async (firstName: string, lastName: string, birthYear: number, salary: number): Promise<PlayerModel> => {
    const newPlayer = await prisma.player.create({
        data: {
            firstName,
            lastName,
            birthYear,
            salary,
            clubId: null,
        },
    });
    if (!newPlayer) {
        throw new Error('Player not created');
    }
    return newPlayer as PlayerModel;
};