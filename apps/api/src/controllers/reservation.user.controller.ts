import { responseError } from '@/helper/ResponseError';
import prisma from '@/prisma';
import { createPaymentLink } from '@/services/reservation.service';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
const base_url = process.env.BASE_API_URL;
export class ReservationController {
  async createReservationVA(req: Request, res: Response) {
    try {
      const returnUrl = process.env.BASE_URL_FRONTEND;
      const { price, guest } = req.body;
      const { room_id } = req.params;
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(req.body.endDate);
      const now = new Date();
      if (startDate >= endDate)
        throw 'The check-in date cannot be greater than or equal to the check-out date.';
      const room = await prisma.room.findFirst({ where: { id: room_id } });
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      const roomReserved = await prisma.reservation.findFirst({
        where: {
          room_Id: room_id,
          statusRes: { not: 'CANCEL' },
          OR: [
            {
              startDate: { lt: endDate },
              endDate: { gt: startDate },
            },
            {
              startDate: { gte: startDate },
              endDate: { lte: endDate },
            },
          ],
        },
      });
      if (roomReserved) throw 'Room has ben reserved';
      await prisma.$transaction(async (tx) => {
        const id = uuidv4();
        const reservation = await tx.reservation.create({
          data: {
            id,
            price,
            guest,
            startDate,
            endDate,
            paymentLink: '',
            user_Id: req.user?.id!,
            room_Id: room_id,
          },
        });
        //MIDTRANS
        const paymentLinkURL = await createPaymentLink(
          reservation.id.toString(),
          price,
          returnUrl!,
        );
        const URL = paymentLinkURL.redirect_url;
        //UPDATE LINK URL
        await tx.reservation.update({
          data: {
            paymentLink: URL,
          },
          where: {
            id: reservation.id,
          },
        });
        res.status(201).send({
          msg: 'Success',
          reservation,
          URL,
        });
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  //MENGUPDATE STATUS TRANS MENJADI PAID
  async updateStatusTrans(req: Request, res: Response) {
    try {
      const { transaction_status } = req.body;
      const order_id = req.body.order_id.replace('ORDERID-', '');
      if (transaction_status == 'settlement')
        await prisma.reservation.update({
          data: { statusRes: 'PAID' },
          where: { id: order_id },
        });
      if (transaction_status == 'expired')
        await prisma.reservation.update({
          data: { statusRes: 'CANCEL' },
          where: { id: order_id },
        });
      return res.status(200).send({
        msg: 'success update status reservation',
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async createReservationTF(req: Request, res: Response) {
    try {
      const { price, guest } = req.body;
      const { room_id } = req.params;
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(req.body.endDate);
      const now = Date.now();
      if (startDate >= endDate)
        throw 'The check-in date cannot be greater than or equal to the check-out date.';
      const room = await prisma.room.findUnique({ where: { id: room_id } });
      if (!room) {
        throw 'Room not found !';
      }
      const roomReserved = await prisma.reservation.findFirst({
        where: {
          room_Id: room_id,
          statusRes: { not: 'CANCEL' },
          OR: [
            {
              startDate: { lt: endDate },
              endDate: { gt: startDate },
            },
            {
              startDate: { gte: startDate },
              endDate: { lte: endDate },
            },
          ],
        },
      });
      if (roomReserved) throw 'Room has ben reserved';
      const reservation = await prisma.reservation.create({
        data: {
          id: uuidv4(),
          price,
          guest,
          startDate,
          endDate,
          method: 'TF',
          statusRes: 'PENDING',
          user_Id: req.user?.id!,
          room_Id: room_id,
        },
      });
      res.status(200).send(reservation);
    } catch (error) {
      responseError(res, error);
    }
  }
  async uploadPaymentProof(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      let media = null;
      if (req.file) {
        media = `${base_url}/public/proof/${req.file?.filename}`;
      }
      await prisma.reservation.update({
        data: { paymentProof: media, statusRes: 'CONFIRMATION' },
        where: { id: reservation_id },
      });
      res.status(200).send('OKE');
    } catch (error) {
      responseError(res, error);
      console.log(error);
    }
  }
  async cancelOrder(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      await prisma.reservation.update({
        where: { id: reservation_id },
        data: { statusRes: 'CANCEL' },
      });
      res.status(200).send('Transaction Canceled');
    } catch (error) {
      responseError(res, error);
    }
  }
}
