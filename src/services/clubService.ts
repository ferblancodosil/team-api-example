import prisma from '../db/prisma';
import { ClubEmployerModel, ClubModel, CoachModel, PlayerModel } from '../models';
import { NotificationChannel, notifyEmployer } from './notificationService';

export const createClub = async (name: string, city: string, budget: number): Promise<ClubModel> => {
    const club = await prisma.club.create({
        data: {
            name,
            city,
            budget,
        },
    });
    if (!club) {
        throw new Error('Club not created');
    }
    return club as ClubModel;
};

export const checkClubBudget = async (clubId: number | undefined, salary: number): Promise<ClubModel | undefined> => {
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

export const buyEmployer = async (clubId: number | undefined | null, employer: ClubEmployerModel) => {
    if (clubId && employer) {
        await prisma.club.update({
            where: { id: clubId },
            data: {
                budget: {
                    decrement: employer.salary,
                },
            },
        });
    }
}

export const sellEmployer = async (clubId: number | undefined | null, employer: ClubEmployerModel) => {
    if (clubId && employer) {
        await prisma.club.update({
            where: { id: clubId },
            data: {
                budget: {
                    increment: employer.salary,
                },
            },
        });
    }
}

// Nuevo tipo genérico para manejar empleados del club
type EmployerType = 'player' | 'coach';

// Función auxiliar para manejar las operaciones de empleados
const handleEmployerClubOperation = async (
    employerId: number,
    clubId: number | null,
    type: EmployerType,
    operation: 'add' | 'remove'
) => {
    const models: Record<string, any> = {
        player: prisma.player,
        coach: prisma.coach,
      };
    const employer = await models[type].findFirst({ where: { id: employerId } });
    
    if (!employer) {
        throw new Error(`${type} not found`);
    }

    const previousClub = employer.clubId;

    // Si es una operación de agregar, verificar el presupuesto
    if (operation === 'add' && clubId) {
        await checkClubBudget(clubId, employer.salary);
    }

    // Actualizar el club del empleado
    const newValue = await models[type].update({
        where: { id: employer.id },
        data: { clubId },
    });

    // Manejar las operaciones de presupuesto
    if (operation === 'add') {
        buyEmployer(clubId, employer as ClubEmployerModel);
    }
    if (previousClub) {
        sellEmployer(previousClub, employer as ClubEmployerModel);
    }

    // Notificar al empleado
    const message = operation === 'add' 
        ? 'You have been added to a club'
        : 'You have been removed from the club';
    notifyEmployer(employer as ClubEmployerModel, message, NotificationChannel.EMAIL);
}

export const addPlayerToClub = async (clubId: number, playerId: number) => {
    await handleEmployerClubOperation(playerId, clubId, 'player', 'add');
}

export const removePlayerFromClub = async (playerId: number) => {
    await handleEmployerClubOperation(playerId, null, 'player', 'remove');
}

export const addCoachToClub = async (clubId: number, coachId: number) => {
    await handleEmployerClubOperation(coachId, clubId, 'coach', 'add');
}

export const removeCoachFromClub = async (coachId: number) => {
    await handleEmployerClubOperation(coachId, null, 'coach', 'remove');
}

export const updateClubBudget = async (clubId: number, newBudget: number): Promise<ClubModel> => {
    const club = await prisma.club.findUnique({
        where: { id: clubId },
    });

    if (!club) {
        throw new Error('Club not found');
    }
    const updatedClub = await prisma.club.update({
        where: { id: clubId },
        data: {
            budget: newBudget,
        },
    });

    return updatedClub as ClubModel;
};

export const listPlayersInClub = async (
    clubId: number,
    filter?: string,
    page: number = 1,
    pageSize: number = 10
): Promise<PlayerModel[]> => {
    const players = await prisma.player.findMany({
        where: {
            clubId: clubId,
            ...(filter !== "undefined" ? {
                OR: [
                    { firstName: { contains: filter, mode: 'insensitive' } },
                    { lastName: { contains: filter, mode: 'insensitive' } },
                ],
            } : {}),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    return players as PlayerModel[];
};