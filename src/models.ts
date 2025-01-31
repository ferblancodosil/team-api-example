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

export interface ClubEmployerModel {
    id: number;
    salary: number; // Salario del jugador o entrenador
    clubId?: number; // Relación opcional con Club
}


export interface PlayerModel extends ClubEmployerModel {
    firstName: string;
    lastName: string;
}

export interface CoachModel extends ClubEmployerModel {
    firstName: string;
    lastName: string;
}
