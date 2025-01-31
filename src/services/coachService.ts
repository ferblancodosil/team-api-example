import prisma from '../db/prisma';
import { CoachModel } from '../models';

export const createCoach = async (firstName: string, lastName: string, salary: number): Promise<CoachModel> => {
    const coach = await prisma.coach.create({
        data: {
            firstName,
            lastName,
            salary,
            clubId: null, // No se relaciona con ningún club
        },
    });
    if (!coach) {
        throw new Error('Coach not created');
    }
    return coach as CoachModel;
};