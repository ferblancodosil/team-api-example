import prisma from '../db/prisma';
import { PlayerModel } from '../models';
import { checkClubBudget, updateClubBudget } from './clubService';

export const createPlayer = async (firstName: string, lastName: string, birthYear: number, salary: number, clubId: number): Promise<PlayerModel> => {
    // Verificar el presupuesto del club
    const club = await checkClubBudget(clubId, salary);

    // Crear el jugador
    const newPlayer = await prisma.player.create({
        data: {
            firstName,
            lastName,
            birthYear,
            salary,
            clubId,
        },
    });
    if (!newPlayer) {
        throw new Error('Player not created');
    }
    const playerModel:PlayerModel = { ...newPlayer, clubId: newPlayer.clubId ?? undefined };
    if (club) {
        updateClubBudget(club, playerModel);
    }

    return playerModel;
};