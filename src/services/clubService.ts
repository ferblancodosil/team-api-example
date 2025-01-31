import prisma from '../db/prisma';
import { ClubModel } from '../models';
import { PlayerModel } from '../models';

export const checkClubBudget = async (clubId: number, salary: number): Promise<ClubModel | undefined> => {
    if (!clubId) {
        return undefined;
    }
    const club = await prisma.club.findUnique({
        where: { id: clubId },
    });
    if (!club) {
        throw new Error('Club not found');
    }
    if (club.budget < salary) {
        throw new Error('Insufficient budget for this salary');
    }
    return club;
}

export const updateClubBudget = async (club: ClubModel, player: PlayerModel) => {
    if (club && player) {
        await prisma.club.update({
            where: { id: club.id },
            data: {
                budget: club.budget - player.salary,
            },
        });
    }
}