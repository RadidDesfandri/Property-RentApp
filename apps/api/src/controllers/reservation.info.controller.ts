import { responseError } from '@/helper/ResponseError';
import { reservationInfoServices } from '@/services/reservationInfo.services';
import { IReservationUser, IStatus } from '@/types/reservationInfo';
import { Request, Response } from 'express';
const base_url = process.env.BASE_API_URL;
export class ReservationInfoController {
  async getReservationUser(req: Request, res: Response) {
    try {
      const { booking_id } = req.query as { booking_id?: string };
      const user_id = req.user?.id!;
      const payload: IReservationUser = { booking_id, user_id };
      const data = await reservationInfoServices.getReservationUser(payload);
      res.status(200).send({
        status: 'OK',
        data,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getReservationByTenant(req: Request, res: Response) {
    try {
      const { status } = req.query as IStatus;
      const tenant_id = req.user?.id;
      const statusString = typeof status === 'string' ? status : undefined;
      const payload = { statusString, tenant_id };
      const data =
        await reservationInfoServices.getReservationByTenant(payload);
      res.status(200).send({
        status: 'OK',
        data,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getReservationById(req: Request, res: Response) {
    try {
      const { reservation_id } = req.params;
      const data =
        await reservationInfoServices.getReservationById(reservation_id);
      res.status(200).send({
        msg: 'ok',
        data,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getPastReservation(req: Request, res: Response) {
    try {
      const user_id = req.user?.id!;
      const data = await reservationInfoServices.getPastReservation(user_id);
      res.status(200).send({
        msg: 'ok',
        data,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getAllReservationDate(req: Request, res: Response) {
    try {
      const { room_id } = req.params;
      const data = await reservationInfoServices.getAllReservationDates(room_id);
      res.status(200).send({
        msg: 'ok',
        data,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
