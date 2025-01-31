import { ClubEmployerModel } from "../models";

export enum NotificationChannel {
    EMAIL = 'email',
    SMS = 'sms',
    PUSH = 'push',
}

export const notifyEmployer = (employer: ClubEmployerModel, message: string, channel: NotificationChannel) => {
    // Lógica para enviar notificaciones
    if (channel === NotificationChannel.EMAIL) {
        console.log(`Sending email to ${employer.id}: ${message}`);
    } else if (channel === NotificationChannel.SMS) {
        console.log(`Sending SMS to ${employer.id}: ${message}`);
    } else if (channel === NotificationChannel.PUSH) {
        console.log(`Sending push notification to ${employer.id}: ${message}`);
    }
};