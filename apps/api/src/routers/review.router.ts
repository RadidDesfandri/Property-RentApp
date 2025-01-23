import { Router } from 'express';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { ReviewController } from '@/controllers/review.controller';

export class ReviewRouter {
  private router: Router;
  private reviewController: ReviewController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.reviewController = new ReviewController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/tenant/',
      this.authMiddleware.verifyTokenOtp,
      this.reviewController.getReviewbyTenant,
    );
    this.router.get(
      '/reservation/:reservation_id',
      this.reviewController.getReviewByReservation,
    );
    this.router.get(
      '/reservation/:property_id',
      this.reviewController.getReviewByProperty,
    );
    this.router.get(
      '/user',
      this.authMiddleware.verifyTokenOtp,
      this.reviewController.getReviewByUser,
    );
    this.router.patch(
      '/feedback',
      this.authMiddleware.verifyTokenOtp,
      this.reviewController.feedBackReview,
    );
    this.router.post(
      '/create/:reservation_id',
      this.authMiddleware.verifyTokenOtp,
      this.reviewController.createReview,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
