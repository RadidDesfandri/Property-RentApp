import prisma from '../prisma';
export interface IPropsReport {
  tenant_id: string;
}
export class reportSalesService {
  constructor() {}
  async getReportByProperty({ tenant_id }: IPropsReport) {
    try {
      const properties = await prisma.property.findMany({
        where: { tenant_Id: tenant_id },
        select: {
          id: true,
          name: true,
          Room: {
            select: {
              id: true,
              Reservation: {
                where: { statusRes: 'PAID' },
                select: {
                  id: true,
                  price: true,
                },
              },
            },
          },
        },
      });
      const data = properties.map((prop) => {
        const totalReservation = prop.Room.reduce(
          (acc, room) => acc + room.Reservation.length,
          0,
        );
        const totalAmount = prop.Room.reduce((acc, room) => {
          return (
            acc +
            room.Reservation.reduce(
              (acc, reservation) => acc + reservation.price,
              0,
            )
          );
        }, 0);
        return {
          propertyId: prop.id,
          propertyName: prop.name,
          totalReservation,
          totalAmount,
        };
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getReportByUser(tenant_id: string) {
    try {
      const users = await prisma.user.findMany({
        include: {
          Reservation: {
            where: { room: { tenant_Id: tenant_id }, statusRes: 'PAID' },
            select: {
              room: {
                select: { property: { select: { tenant: true, name: true } } },
              },
              price: true,
              createdAt: true,
            },
          },
        },
      });
      const data = users
        .filter((user) => user.Reservation.length > 0)
        .map((user) => {
          const totalAmount = user.Reservation.reduce(
            (acc, reservation) => acc + reservation.price,
            0,
          );
          const totalReservation = user.Reservation.length;
          return {
            userId: user.id,
            username: user.username,
            totalAmount,
            totalReservation,
          };
        });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getReportByReservation(tenant_id: string) {
    try {
      const reservations = await prisma.reservation.findMany({
        where: { room: { tenant_Id: tenant_id }, statusRes: 'PAID' },
        include: {
          room: { select: { property: { select: { name: true } } } },
          user: { select: { username: true } },
        },
      });
      const data = reservations.map((reservation) => {
        return {
          reservationId: reservation.id,
          reservationDate: reservation.createdAt,
          user: reservation.user.username,
          property: reservation.room.property.name,
          amount: reservation.price,
        };
      });
      return data;
    } catch (error) {}
  }
  async getPropertyReportCalendar(tenant_id: string) {
    try {
      const reservations = await prisma.reservation.findMany({
        where: { statusRes: { not: 'CANCEL' }, room: { tenant_Id: tenant_id } },
        select: {
          startDate: true,
          endDate: true,
          room: {
            select: { type: true, property: { select: { name: true } } },
          },
        },
      });
      const data = reservations.map((item, idx) => {
        const id = idx + 1;
        item.startDate.setDate(item.startDate.getDate() + 1);
        item.endDate.setDate(item.endDate.getDate() + 1);
        return {
          id: id,
          color: '#5BA5A5',
          from: item.startDate,
          to: item.endDate,
          title: `${item.room.property.name}, kamar: ${item.room.type}`,
        };
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export const reportSalesServices = new reportSalesService();
