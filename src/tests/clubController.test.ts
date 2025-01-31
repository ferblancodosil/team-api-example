import request from 'supertest';
import app from '../server'; // Asegúrate de exportar tu aplicación Express
import prisma from '../db/prisma'; // Importa tu cliente Prisma

// Mock de la función de notificación
jest.mock('../services/notificationService', () => ({
    notifyEmployer: jest.fn(),
    NotificationChannel: {
        EMAIL: 'email',
    },
}));

describe('Club API', () => {
    beforeAll(async () => {
        // Aquí puedes hacer la configuración inicial, como limpiar la base de datos
        await prisma.$executeRaw`TRUNCATE TABLE "Club" CASCADE;`;
        await prisma.$executeRaw`TRUNCATE TABLE "Player" CASCADE;`;
        await prisma.$executeRaw`TRUNCATE TABLE "Coach" CASCADE;`;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should create a club with a budget', async () => {
        const response = await request(app)
            .post('/clubs')
            .send({
                name: 'Test Club',
                city: 'Test City',
                budget: 100000,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.budget).toBe(100000);
    });

    it('should add a player to a club and deduct salary from budget', async () => {
        const clubResponse = await request(app)
            .post('/clubs')
            .send({
                name: 'Test Club',
                city: 'Test City',
                budget: 100000,
            });

        const playerResponse = await request(app)
            .post('/players')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                birthYear: 1990,
                salary: 50000,
            });

        const addPlayerResponse = await request(app)
            .post('/clubs/players')
            .send({
                clubId: clubResponse.body.id,
                playerId: playerResponse.body.id,
            });

        expect(addPlayerResponse.status).toBe(200);

        const updatedClub = await prisma.club.findUnique({
            where: { id: clubResponse.body.id },
        });

        expect(updatedClub?.budget).toBe(50000); // 100000 - 50000
    });

   
    it('should not allow a player to be added if budget is insufficient', async () => {
        const clubResponse = await request(app)
            .post('/clubs')
            .send({
                name: 'Test Club',
                city: 'Test City',
                budget: 30000,
            });

        const playerResponse = await request(app)
            .post('/players')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                birthYear: 1992,
                salary: 50000,
            });

        const addPlayerResponse = await request(app)
            .post('/clubs/players')
            .send({
                clubId: clubResponse.body.id,
                playerId: playerResponse.body.id,
            });

        expect(addPlayerResponse.status).toBe(400); // Expecting a validation error
    });

    it('should add a coach to a club', async () => {
        const clubResponse = await request(app)
            .post('/clubs')
            .send({
                name: 'Test Club',
                city: 'Test City',
                budget: 100000,
            });

        const coachResponse = await request(app)
            .post('/coaches')
            .send({
                firstName: 'Alice',
                lastName: 'Johnson',
                salary: 40000,
            });

        const addCoachResponse = await request(app)
            .post('/clubs/coaches')
            .send({
                clubId: clubResponse.body.id,
                coachId: coachResponse.body.id,
            });

        expect(addCoachResponse.status).toBe(200);
    });

    it('should remove a coach from a club', async () => {
        const clubResponse = await request(app)
            .post('/clubs')
            .send({
                name: 'Test Club',
                city: 'Test City',
                budget: 100000,
            });

        const coachResponse = await request(app)
            .post('/coaches')
            .send({
                firstName: 'Bob',
                lastName: 'Brown',
                salary: 50000,
            });

        await request(app)
            .post('/clubs/coaches')
            .send({
                clubId: clubResponse.body.id,
                coachId: coachResponse.body.id,
            });

        const removeCoachResponse = await request(app)
            .delete(`/clubs/coaches/${coachResponse.body.id}`);

        expect(removeCoachResponse.status).toBe(200);
    });
});