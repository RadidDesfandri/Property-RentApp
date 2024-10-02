import prisma from '../prisma';

export class tenantTransactionInfoService {
  constructor() {}
  async confirmReservation(id: string) {
    try {
      const reservation = await prisma.reservation.findFirst({
        where: { id: id },
        include: { user: true, room: { include: { property: true } } },
      });
      const statusPaid = await prisma.reservation.findFirst({
        where: { id: id, statusRes: 'PAID' },
      });
      const statusCancel = await prisma.reservation.findFirst({
        where: { id: id, statusRes: 'CANCEL' },
      });
      if (statusPaid) throw 'Reservasi Sudah Diterima';
      if (statusCancel) throw 'Reservasi dibatalkan oleh user';
      await prisma.reservation.update({
        data: { statusRes: 'PAID' },
        where: { id: id },
      });
    } catch (error: any) {
      return error;
    }
  }
  async rejectPayment(id: string) {
    try {
      const statusAcc = await prisma.reservation.findFirst({
        where: { id: id, statusRes: 'PAID' },
      });
      const statusCancel = await prisma.reservation.findFirst({
        where: { id: id, statusRes: 'CANCEL' },
      });

      if (statusAcc) throw 'Transaksi Sudah di Diterima! ';
      if (statusCancel) throw 'Transaksi Sudah di Dibatalkan! ';
      await prisma.reservation.update({
        data: { statusRes: 'PENDING' },
        where: { id: id },
      });
    } catch (error) {
      return error;
    }
  }
  async cancelOrder(id: string) {
    try {
      const reservation = await prisma.reservation.findFirst({
        where: { id: id },
      });

      if (reservation?.statusRes == 'CONFIRMATION' && reservation?.paymentProof)
        throw 'Error, user sudah mengupload bukti pembayaran !';
      if (reservation?.statusRes == 'PAID')
        throw 'Error,Transaksi sudah dibayar!';
      await prisma.reservation.update({
        where: { id: id },
        data: { statusRes: 'CANCEL' },
      });
    } catch (error) {
      return error;
    }
  }
}

export const tenantTransactionInfoServices = new tenantTransactionInfoService();
