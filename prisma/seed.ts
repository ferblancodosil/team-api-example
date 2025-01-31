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
    // Crear clubes con presupuesto
    const club1 = await prisma.club.create({
        data: {
            name: 'Club Deportivo Ejemplo 1',
            city: 'Ciudad Ejemplo 1',
            budget: 100000, // Presupuesto inicial
        },
    });

    const club2 = await prisma.club.create({
        data: {
            name: 'Club Deportivo Ejemplo 2',
            city: 'Ciudad Ejemplo 2',
            budget: 150000, // Presupuesto inicial
        },
    });

    // Crear jugadores con salario
    const player1 = await prisma.player.create({
        data: {
            firstName: 'Juan',
            lastName: 'Pérez',
            birthYear: 1995,
            salary: 30000, // Salario del jugador
            clubId: club1.id, // Relacionar con el club 1
        },
    });

    const player2 = await prisma.player.create({
        data: {
            firstName: 'María',
            lastName: 'Gómez',
            birthYear: 1998,
            salary: 25000, // Salario del jugador
            clubId: club2.id, // Relacionar con el club 2
        },
    });

    const player3 = await prisma.player.create({
        data: {
            firstName: 'Carlos',
            lastName: 'López',
            birthYear: 2000,
            salary: 20000, // Salario del jugador
            // No se relaciona con ningún club
        },
    });

    // Crear entrenadores con salario
    const coach1 = await prisma.coach.create({
        data: {
            firstName: 'Luis',
            lastName: 'Martínez',
            salary: 50000, // Salario del entrenador
            clubId: club1.id, // Relacionar con el club 1
        },
    });

    const coach2 = await prisma.coach.create({
        data: {
            firstName: 'Ana',
            lastName: 'Fernández',
            salary: 45000, // Salario del entrenador
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