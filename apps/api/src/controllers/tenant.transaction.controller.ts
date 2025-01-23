import { responseError } from '@/helper/ResponseError';
import { Request, Response } from 'express';
import prisma from '@/prisma';
import { tenantTransactionInfoServices } from '@/services/tenanTransaction.service';
import path from 'path';
import fs from 'fs';
import handlebars, { log } from 'handlebars';
import { transporter } from '@/helper/nodemailer';
import { formatDateReservation } from '@/libs/formatDate';
export class TenantTransactionController {
  async confirmPayment(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      const reservation = await prisma.reservation.findFirst({
        where: { id: reservation_id },
        include: { user: true, room: { include: { property: true } } },
      });
      const data =
        await tenantTransactionInfoServices.confirmReservation(reservation_id);
      if (typeof data === 'string') {
        return res.status(400).json({ error: data });
      }

      const templatePath = path.join(
        __dirname,
        '../templates',
        'confirmation.hbs',
      );
      const checkin = new Date(reservation?.startDate!);
      const startDate = formatDateReservation(checkin);
      const checkout = new Date(reservation?.endDate!);
      const endDate = formatDateReservation(checkout);
      const dataEmail = {
        username: reservation?.user.username,
        property: reservation?.room.property.name,
        checkin: startDate,
        checkout: endDate,
        price: reservation?.price,
        guest: reservation?.guest,
      };
      const templateSource = await fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate(dataEmail);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: reservation?.user.email,
        subject: 'Konfirmasi Reservasi',
        html,
      });
      await res.status(200).send({ status: 'OK', msg: 'Transaction Accepted' });
    } catch (error) {
      console.log(error);

      responseError(res, error);
    }
  }
  async rejectPayment(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      const data =
        await tenantTransactionInfoServices.rejectPayment(reservation_id);
      if (typeof data === 'string') {
        return res.status(400).json({ error: data });
      }
      res
        .status(200)
        .send({ status: 'OK', msg: 'Transaksi Kembali ke Proses Pembayaran' });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getReservationbyStatus(req: Request, res: Response) {
    try {
      const data = await prisma.reservation.findMany({});
      res.status(200).send(data);
    } catch (error) {
      responseError(res, error);
    }
  }

  async cancelUserOrder(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      console.log(reservation_id);

      const data =
        await tenantTransactionInfoServices.cancelOrder(reservation_id);
      if (typeof data === 'string') {
        return res.status(400).json({ error: data });
      }
      res.status(200).send({
        status: 'OKE',
        msg: 'Order Canceled',
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async getNotification(req: Request, res: Response) {
    try {
      const data = await tenantTransactionInfoServices.getNotification(
        req.user?.id!,
      );
      res.status(200).send(data);
    } catch (error) {
      responseError(res, error);
    }
  }
}
