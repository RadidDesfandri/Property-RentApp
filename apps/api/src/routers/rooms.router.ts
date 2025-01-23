import { RoomController } from '@/controllers/rooms.controller';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { uploader } from '@/services/uploader';
import { Router } from 'express';

export class RoomRouter {
  private router: Router;
  private roomController: RoomController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.roomController = new RoomController();
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get-roombyid/:id', this.roomController.getRoomById);
    this.router.get('/get-room/:id', this.roomController.getRoom);
    this.router.get('/getall', this.roomController.getAllRooms);
    this.router.delete('/delete/:id', this.roomController.deleteRoom);
    this.router.post(
      '/create-room/:id',
      this.authMiddleware.verifyTokenOtp,
      uploader('rooms', '/rooms').array('roompic', 5),
      this.roomController.createRoomController,
    );
    this.router.post(
      '/peak-season/:id',
      this.roomController.RoomAvailabilityController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
