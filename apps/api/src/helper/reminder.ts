import schedule from 'node-schedule';
import prisma from '@/prisma';
import path from 'path';
import fs from 'fs';
import handlebars, { log } from 'handlebars';
import { transporter } from '@/helper/nodemailer';
export async function scheduleReminders() {
  const now = new Date();
  const reservations = await prisma.reservation.findMany({
    where: {
      startDate: {
        gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
      },
    },
    include: {
      user: true,
      room: { include: { property: { select: { name: true } } } },
    },
  });
  // Schedule reminder untuk semua pemesanan
  reservations.forEach((reservation: any) => {
    sendReminder(reservation);
  });
}
async function sendReminder(reservation: any) {
  const dataEmail = {
    username: reservation?.user?.username,
    property: reservation?.room?.property?.name,
  };
  const templatePath = path.join(__dirname, '../templates', 'reminder.hbs');
  const templateSource = await fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateSource);
  const html = compiledTemplate(dataEmail);
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: reservation?.user.email,
    subject: 'Reminder Reservasi',
    html,
  });
}
