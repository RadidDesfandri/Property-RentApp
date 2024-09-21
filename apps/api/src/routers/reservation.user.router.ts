import { ReservationController } from '@/controllers/reservation.user.controller';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { uploader } from '@/services/uploader';
import { Router } from 'express';

export class ReservationRouter {
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private reservationController: ReservationController;

  constructor() {
    this.router = Router();
    this.reservationController = new ReservationController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/VA',
      this.authMiddleware.verifyTokenOtp,
      this.reservationController.createReservationVA,
    );
    this.router.post(
      '/VA/status',
      this.reservationController.updateStatusTrans,
    );
    this.router.post(
      '/TF',
      this.authMiddleware.verifyTokenOtp,
      this.reservationController.createReservationTF,
    );
    this.router.post(
      '/TF/proof',
      this.authMiddleware.verifyTokenOtp,
      uploader('proof', '/proof').single('media'),
      this.reservationController.uploadPaymentProof,
    );
    this.router.patch(
      '/TF/cancel',
      this.authMiddleware.verifyTokenOtp,
      this.reservationController.cancelOrder,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
