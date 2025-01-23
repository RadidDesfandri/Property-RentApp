import { PropertyControler } from '@/controllers/property.controller';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { uploader } from '@/services/uploader';
import { Router } from 'express';

export class PropertyRouter {
  private router: Router;
  private propertyController: PropertyControler;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.propertyController = new PropertyControler();
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.propertyController.getProperty);
    this.router.post(
      '/create',
      this.authMiddleware.verifyTokenOtp,
      uploader('property', '/property').single('thumbnail'),
      this.propertyController.createPropertyController,
    );
    this.router.get(
      '/getbytenant',
      this.authMiddleware.verifyTokenOtp,
      this.propertyController.getPropertyByTenantId,
    );
    this.router.get(
      '/get-publish',
      this.authMiddleware.verifyTokenOtp,
      this.propertyController.getPropertyActiveTenant,
    );
    this.router.get(
      '/get-draft',
      this.authMiddleware.verifyTokenOtp,
      this.propertyController.getPropertyDraftTenant,
    );
    this.router.post('/publish/:id', this.propertyController.publishProperty);
    this.router.get('/:id', this.propertyController.getPropertyByid);
    
    this.router.delete(
      '/delete-property/:id',
      this.propertyController.deleteProperty,
    );
    this.router.patch(
      '/unpublish/:id',
      this.propertyController.unPublishProperty,
    );
    this.router.patch(
      '/edit/:id',
      this.authMiddleware.verifyTokenOtp,
      uploader('property', '/property').single('thumbnail'),
      this.propertyController.editProperty,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
