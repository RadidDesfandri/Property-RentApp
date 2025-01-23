import { DecodeTokenController } from '@/controllers/decode.controller';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class DecodeTokenRouter {
  private router: Router;
  private decodeController: DecodeTokenController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.decodeController = new DecodeTokenController();
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/token',
      this.authMiddleware.verifyTokenOtp,
      this.decodeController.DecodeToken,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
