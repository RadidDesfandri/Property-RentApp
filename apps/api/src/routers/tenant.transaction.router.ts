import { Router } from 'express';
import { TenantTransactionController } from '@/controllers/tenant.transaction.controller';
import { AuthMiddleware } from '@/middleware/auth.middleware';

export class TenantTransactionRouter {
  private router: Router;
  private tenantTransactionController: TenantTransactionController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.tenantTransactionController = new TenantTransactionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.patch(
      '/confirm/:reservation_id',
      this.authMiddleware.verifyTokenOtp,
      this.tenantTransactionController.confirmPayment,
    );
    this.router.patch(
      '/reject/:reservation_id',
      this.authMiddleware.verifyTokenOtp,
      this.tenantTransactionController.rejectPayment,
    );
    this.router.patch(
      '/cancel/:reservation_id',
      this.authMiddleware.verifyTokenOtp,
      this.tenantTransactionController.cancelUserOrder,
    );
    this.router.get(
      '/notif',
      this.authMiddleware.verifyTokenOtp,
      this.tenantTransactionController.getNotification,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
