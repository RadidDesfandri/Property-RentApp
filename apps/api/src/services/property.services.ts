import prisma from '@/prisma';
import { Property, Room } from '@prisma/client';

const base_url = process.env.BASE_URL_BACKEND || 'http://localhost:8000/api';

export const createPropertyServices = async (
  TenantId: string,
  body: Property,
  file: string,
) => {
  try {
    const { name, category, description, location } = body;
    const exisProperty = await prisma.property.findFirst({
      where: { name },
    });

    if (exisProperty)
      throw new Error(
        'Property already exist, please change your property name',
      );
    const image = `${base_url}/public/property/${file}`;
    const property = await prisma.property.create({
      data: {
        name,
        category,
        description,
        location,
        thumbnail: image,
        tenant_Id: TenantId,
      },
    });

    return property;
  } catch (error) {
    throw error;
  }
};
export const publishPropertyServices = async (propertyId: string) => {
  try {
    const updateProperti = await prisma.property.update({
      where: { id: propertyId },
      data: {
        isActive: true,
      },
    });

    return updateProperti;
  } catch (error) {
    throw error;
  }
};
export const getPropertyActiveServices = async () => {
  try {
    const property = await prisma.property.findMany({
      where: { isActive: true },
      include: {
        tenant: {
          select: { email: true, username: true, avatar: true, id: true },
        },
        Room: {
          select: {
            id: true,
            capacity: true,
            description: true,
            availability: true,
            price: true,
            pricediscount: true,
            type: true,
            facility: { select: { name: true } },
            RoomPic: { select: { url: true } },
          },
          orderBy: { price: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });

    return property;
  } catch (error) {
    throw error;
  }
};
export const getPropertyByidServices = async (propertyId: string) => {
  try {
    const property = await prisma.property.findFirst({
      where: { id: propertyId },
      include: {
        Room: {
          select: {
            id: true,
            capacity: true,
            description: true,
            availability: true,
            price: true,
            pricediscount: true,
            type: true,
            facility: { select: { name: true } },
            RoomPic: { select: { url: true } },
          },
        },
      },
    });

    return property;
  } catch (error) {
    throw error;
  }
};
export const getPropertyByTenantIdServices = async (tenantId: string) => {
  try {
    const property = await prisma.property.findMany({
      where: { tenant_Id: tenantId },
      include: { Room: true },
      orderBy: { createdAt: 'desc' },
    });

    return property;
  } catch (error) {
    throw error;
  }
};
export const getPropertyPublishServices = async (tenantId: string) => {
  try {
    const property = await prisma.property.findMany({
      where: { tenant_Id: tenantId, isActive: true },
      include: { Room: true },
      orderBy: { createdAt: 'desc' },
    });

    return property;
  } catch (error) {
    throw error;
  }
};
export const getPropertyDraftServices = async (tenantId: string) => {
  try {
    const property = await prisma.property.findMany({
      where: { tenant_Id: tenantId, isActive: false },
      include: { Room: true },
      orderBy: { createdAt: 'desc' },
    });

    return property;
  } catch (error) {
    throw error;
  }
};
export const deletePropertyServices = async (property_Id: string) => {
  try {
    await prisma.review.deleteMany({
      where: { room: { property_Id } },
    });
    await prisma.reservation.deleteMany({
      where: { room: { property_Id } },
    });
    await prisma.facility.deleteMany({
      where: { Room: { property_Id } },
    });
    await prisma.roomPic.deleteMany({
      where: { room: { property_Id } },
    });
    await prisma.room.deleteMany({
      where: { property_Id: property_Id },
    });

    const property = await prisma.property.delete({
      where: { id: property_Id },
    });
    return property;
  } catch (error) {
    throw error;
  }
};
export const unpublishServices = async (propertyId: string) => {
  try {
    const unpublish = await prisma.property.update({
      where: { id: propertyId },
      data: {
        isActive: false,
      },
    });
    return unpublish;
  } catch (error) {
    throw error;
  }
};
export const editPropertyServices = async (
  propertyId: string,
  tenant_Id: string,
  body: Property,
  file?: string,
) => {
  try {
    const { name, location, description, category } = body;
    const existingProperty = await prisma.property.findUnique({
      where: { id: propertyId, tenant_Id },
    });
    if (!existingProperty) {
      throw new Error('Property not found');
    }
    const image = file
      ? `${base_url}/public/property/${file}`
      : existingProperty.thumbnail;

    const property = await prisma.property.update({
      where: { id: propertyId, tenant_Id },
      data: {
        name,
        location,
        description,
        category,
        thumbnail: image,
      },
    });
    return property;
  } catch (error) {
    throw error;
  }
};
