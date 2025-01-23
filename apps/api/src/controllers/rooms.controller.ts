import { responseError } from '@/helper/ResponseError';
import {
  createRoomServices,
  deleteRoomServices,
  getAllRoomsServices,
  getRoomsByIdServices,
  getRoomServices,
  setRoomAvailabilityServices,
} from '@/services/rooms.services';
import { NextFunction, Request, Response } from 'express';
export class RoomController {
  async getRoom(req: Request, res: Response) {
    try {
      const room = await getRoomServices(req.params.id);
      return res.status(200).send({
        status: 'OK',
        room,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async createRoomController(req: Request, res: Response, next: NextFunction) {
    try {
      const { price, pricediscount, capacity, description, type, facility } =
        req.body;
      const files = req.files as Express.Multer.File[];
      const roomData = {
        id: '',
        price: parseFloat(price),
        pricediscount: parseFloat(pricediscount),
        capacity: parseInt(capacity),
        description,
        type,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        property_Id: req.params.id,
        tenant_Id: req.user?.id!,
      };
      const result = await createRoomServices(
        roomData.property_Id,
        roomData.tenant_Id,
        roomData,
        facility ? facility.split(',') : [],
        files,  
      );
      res.status(200).send({
        status: 'ok',
        msg: 'Room created',
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteRoom(req: Request, res: Response) {
    try {
      await deleteRoomServices(req.params.id);
      return res.status(200).send({
        status: 'OK',
        msg: 'Room deleted',
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getRoomById(req: Request, res: Response) {
    try {
      const { checkIn, checkOut} = req.query
      const checkInQuery = checkIn ? new Date(checkIn as string) : undefined
      const checkOutQuery = checkOut ? new Date(checkOut as string) : undefined
      const room = await getRoomsByIdServices(req.params.id, checkInQuery!, checkOutQuery!);
      return res.status(200).send({
        status: 'OK',
        room,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  async getAllRooms(req: Request, res: Response) {
    try {
      const { sortBy, sortOrder, propertyName, category, page, take, location, minPrice, maxPrice, startDate, endDate } = req.query;
      const room = await getAllRoomsServices({
        sortBy: (sortBy as string) as 'name' | 'price',
        sortOrder: sortOrder as 'asc' | 'desc',
        propertyName: propertyName as string,
        category: category as string, 
        location: location as string,
        page: Number(page as string) || 1,
        take: Number(take as string) || 10,
        minPrice: Number(minPrice as string) || 0,
        maxPrice: Number(maxPrice as string) || 5000000,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined
      });
      return res.status(200).send(room);
    } catch (error) {
      responseError(res, error);
    }
  }
  async RoomAvailabilityController(req: Request, res:Response, next: NextFunction){
    try {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(req.body.endDate);
      const { priceIncrease, unavailable } = req.body;
      await setRoomAvailabilityServices(req.params.id, startDate, endDate, priceIncrease, unavailable)
      return res.status(200).send({msg: 'Room availability and price updated successfully.'})
    } catch (error) {
      next(error)
    }
  }
}
