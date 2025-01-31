import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const createUser = async (name: string, email: string, password: string, role: UserRole) => {
    const passwordCrypt = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            name,
            email,
            password: passwordCrypt,
            role,
        },
    });
}

export const loginUser = async (email: string, password: string) => {
    const passwordCrypt = await bcrypt.hash(password, 10);
    const user = await prisma.user.findFirst({ where: { email, password: passwordCrypt } });
    if (!user) {
        throw new Error('User/password not found');
    }
    return user;
}