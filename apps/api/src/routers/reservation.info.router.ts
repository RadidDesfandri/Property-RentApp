import { ReservationInfoController } from '@/controllers/reservation.info.controller';

import { AuthMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';
export class ReservationInfoRouter {
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private reservationInfoController: ReservationInfoController;

  constructor() {
    this.router = Router();
    this.reservationInfoController = new ReservationInfoController();
    this.authMiddleware = new AuthMiddleware();
    this.initalizeRoutes();
  }

  private initalizeRoutes(): void {
    this.router.get(
      '/',
      this.authMiddleware.verifyTokenOtp,
      this.reservationInfoController.getReservationUser,
    );
    this.router.get(
      '/dates/:room_id',
      this.reservationInfoController.getAllReservationDate,
    );
    this.router.get(
      '/past',
      this.authMiddleware.verifyTokenOtp,
      this.reservationInfoController.getPastReservation,
    );
    this.router.get(
      '/list',
      this.authMiddleware.verifyTokenOtp,
      this.reservationInfoController.getReservationByTenant,
    );
    this.router.get(
      '/:reservation_id',
      this.reservationInfoController.getReservationById,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
