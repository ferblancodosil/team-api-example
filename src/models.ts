import { UserRole } from '@prisma/client';

export interface UserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface ClubModel {
    id: number;
    name: string;
    city: string;
    budget: number; // Presupuesto del club
}

export interface PlayerModel {
    id: number;
    firstName: string;
    lastName: string;
    birthYear: number;
    salary: number; // Salario del jugador
    clubId?: number; // Relación opcional con Club
}

export interface CoachModel {
    id: number;
    firstName: string;
    lastName: string;
    salary: number; // Salario del entrenador
    clubId?: number; // Relación opcional con Club
}
