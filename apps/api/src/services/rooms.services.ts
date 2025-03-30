import prisma from '@/prisma';
import { GetRoomsParams } from '@/types/room';
import { Room } from '@prisma/client';

const base_url =
  process.env.BASE_URL_BACKEND ||
  'https://property-rent-app-one.vercel.app/api';

export const getRoomServices = async (propertyId: string) => {
  try {
    const room = await prisma.room.findMany({
      where: { property_Id: propertyId },
      include: {
        RoomPic: {
          select: {
            url: true,
          },
        },
        facility: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return room;
  } catch (error) {
    throw error;
  }
};

export const createRoomServices = async (
  propertyId: string,
  tenantId: string,
  body: Room,
  facility: string[],
  files: Express.Multer.File[],
) => {
  try {
    const { price, pricediscount, capacity, description, type } = body;
    const images = files.map(
      (file) => `${base_url}/public/rooms/${file.filename}`,
    );
    const rooms = await prisma.room.create({
      data: {
        price,
        pricediscount,
        capacity,
        description,
        type,
        property_Id: propertyId,
        tenant_Id: tenantId,
        facility: {
          create: facility.map((name) => ({
            name,
          })),
        },
        RoomPic: {
          create: images.map((url) => ({
            url,
          })),
        },
      },
      include: {
        facility: true,
        RoomPic: true,
      },
    });

    return rooms;
  } catch (error) {
    throw error;
  }
};

export const deleteRoomServices = async (id: string) => {
  try {
    await prisma.review.deleteMany({
      where: { room_Id: id },
    });
    await prisma.reservation.deleteMany({
      where: { room_Id: id },
    });
    await prisma.roomPic.deleteMany({
      where: { room_Id: id },
    });
    await prisma.facility.deleteMany({
      where: { roomId: id },
    });
    await prisma.roomAvailability.deleteMany({
      where: { room_Id: id },
    });
    const rooms = await prisma.room.delete({
      where: { id },
    });
    return rooms;
  } catch (error) {
    console.log('thwd', error);
    throw error;
  }
};

export const getRoomsByIdServices = async (
  room_Id: string,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id: room_Id },
      include: {
        RoomPic: {
          select: {
            url: true,
          },
        },
        facility: {
          select: {
            name: true,
          },
        },
        property: true,
        tenant: { select: { username: true } },
        RoomAvailability: {
          select: {
            startDate: true,
            endDate: true,
            isAvailable: true,
            priceAdjustment: true,
          },
        },
      },
    });

    let isAvailable = true;
    room!.RoomAvailability.forEach((availability) => {
      if (
        availability.isAvailable === false &&
        new Date(availability.startDate) <= checkOut &&
        new Date(availability.endDate) >= checkIn
      ) {
        isAvailable = false;
      }
    });

    if (!isAvailable) {
      return { room, msg: 'nn' };
    }

    let totalPrice = room!.price; // Harga default room
    room!.RoomAvailability.forEach((availability) => {
      if (
        availability.isAvailable &&
        new Date(availability.startDate) <= checkOut &&
        new Date(availability.endDate) >= checkIn &&
        availability.priceAdjustment
      ) {
        const adjustment = (totalPrice * availability.priceAdjustment!) / 100;
        totalPrice += adjustment; // Tambahkan penyesuaian harga
      }
    });

    return {
      ...room,
      price: totalPrice, // Harga setelah disesuaikan
    };
  } catch (error) {
    throw error;
  }
};

export const getAllRoomsServices = async (params: GetRoomsParams) => {
  try {
    const {
      sortBy = 'price',
      sortOrder = 'asc',
      propertyName,
      location,
      category,
      page = 1,
      take = 10,
      minPrice,
      maxPrice,
      startDate,
      endDate,
    } = params;
    const skip = (page - 1) * take;
    const where: any = {
      price: {
        gte: minPrice || 0,
        lte: maxPrice || Infinity,
      },
    };
    if (propertyName) {
      where.property = {
        ...where.property,
        name: { contains: propertyName },
      };
    }
    if (category) {
      where.property = { ...where.property, category };
    }
    if (location) {
      where.property = { ...where.property, location: { contains: location } };
    }
    const orderBy: any = {};
    if (sortBy === 'name') {
      orderBy.property = { name: sortOrder };
    } else {
      orderBy.price = sortOrder;
    }
    const rooms = await prisma.room.findMany({
      where,
      orderBy,
      include: {
        RoomPic: { select: { url: true } },
        facility: { select: { name: true } },
        property: { select: { name: true, location: true, category: true } },
        RoomAvailability: {
          select: {
            startDate: true,
            endDate: true,
            isAvailable: true,
            priceAdjustment: true,
          },
        },
      },
      skip,
      take,
    });
    const totalRooms = await prisma.room.count({ where });
    let adjustedRooms = rooms;
    if (startDate && endDate) {
      adjustedRooms = rooms.filter((room) => {
        const isUnavailable = room.RoomAvailability.some(
          (availability) =>
            availability.isAvailable === false &&
            availability.startDate <= new Date(endDate) &&
            availability.endDate >= new Date(startDate),
        );
        return !isUnavailable;
      });
    }
    adjustedRooms = adjustedRooms.map((room) => {
      let totalPrice = room.price;
      room.RoomAvailability.forEach((availability) => {
        if (
          availability.isAvailable &&
          new Date(availability.startDate) <= new Date(endDate!) &&
          new Date(availability.endDate) >= new Date(startDate!)
        ) {
          const adjustment = (totalPrice * availability.priceAdjustment!) / 100;
          totalPrice += adjustment;
        }
      });

      return {
        ...room,
        price: totalPrice,
      };
    });

    const total = adjustedRooms.length;

    return {
      totalPage: Math.ceil(totalRooms / take),
      total,
      room: adjustedRooms,
    };
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const setRoomAvailabilityServices = async (
  room_Id: string,
  startDate: Date,
  endDate: Date,
  priceIncrease?: number,
  unavailable?: boolean,
) => {
  try {
    const existingAvailability = await prisma.roomAvailability.findFirst({
      where: {
        room_Id: room_Id,
        startDate: { lte: endDate },
        endDate: { gte: startDate },
      },
    });

    if (existingAvailability) {
      await prisma.roomAvailability.update({
        where: { id: existingAvailability.id },
        data: {
          startDate: startDate,
          endDate: endDate,
          isAvailable:
            unavailable !== undefined
              ? !unavailable
              : existingAvailability.isAvailable,
          priceAdjustment: priceIncrease
            ? (existingAvailability.priceAdjustment ?? 0) + priceIncrease
            : existingAvailability.priceAdjustment,
        },
      });
    } else {
      await prisma.roomAvailability.create({
        data: {
          room_Id: room_Id,
          startDate: startDate,
          endDate: endDate,
          isAvailable: unavailable !== undefined ? !unavailable : true,
          priceAdjustment: priceIncrease || 0,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
