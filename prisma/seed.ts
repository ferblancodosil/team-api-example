// prisma/seed.ts
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    // Truncar todas las tablas
    await prisma.player.deleteMany({});
    await prisma.coach.deleteMany({});
    await prisma.club.deleteMany({});
    await prisma.user.deleteMany({});
     // Crear usuarios
     const examplePassword = await bcrypt.hash('password', 10);
     await prisma.user.create({
        data: {
            name: 'Club Deportivo Ejemplo 1',
            email: 'club1@example.com',
            password: examplePassword,
            role: UserRole.CLUB,
        },
    });

    await prisma.user.create({
        data: {
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            password: examplePassword,
            role: UserRole.PLAYER,
        },
    });

    await prisma.user.create({
        data: {
            name: 'Luis Martínez',
            email: 'luis.martinez@example.com',
            password: examplePassword,
            role: UserRole.COACH,
        },
    });
    // Crear clubes
    const club1 = await prisma.club.create({
        data: {
            name: 'Club Deportivo Ejemplo 1',
            city: 'Ciudad Ejemplo 1',
        },
    });

    const club2 = await prisma.club.create({
        data: {
            name: 'Club Deportivo Ejemplo 2',
            city: 'Ciudad Ejemplo 2',
        },
    });

    // Crear jugadores
    const player1 = await prisma.player.create({
        data: {
            firstName: 'Juan',
            lastName: 'Pérez',
            birthYear: 1995,
            clubId: club1.id, // Relacionar con el club 1
        },
    });

    const player2 = await prisma.player.create({
        data: {
            firstName: 'María',
            lastName: 'Gómez',
            birthYear: 1998,
            clubId: club2.id, // Relacionar con el club 2
        },
    });

    const player3 = await prisma.player.create({
        data: {
            firstName: 'Carlos',
            lastName: 'López',
            birthYear: 2000,
            // No se relaciona con ningún club
        },
    });

    // Crear entrenadores
    const coach1 = await prisma.coach.create({
        data: {
            firstName: 'Luis',
            lastName: 'Martínez',
            clubId: club1.id, // Relacionar con el club 1
        },
    });

    const coach2 = await prisma.coach.create({
        data: {
            firstName: 'Ana',
            lastName: 'Fernández',
            // No se relaciona con ningún club
        },
    });

    console.log({ club1, club2, player1, player2, player3, coach1, coach2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });