import { UserRole } from '@prisma/client';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface Club {
    id: number;
    name: string;
    city: string;
}

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    birthYear: number;
    clubId?: number; // Relación opcional con Club
}

export interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    clubId?: number; // Relación opcional con Club
}