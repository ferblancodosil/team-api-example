import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPlayer = async (firstName: string, lastName: string, birthYear: number) => {
    return await prisma.player.create({
        data: {
            firstName,
            lastName,
            birthYear,
            clubId: null, // No se relaciona con ningún club
        },
    });
};