"use client";
import { useEffect, useState } from "react";
import Confrimation from "./confirmation";
import SummaryTransaction from "./summaryTransaction";
import { getTransactionById } from "@/libs/fetch/transaction";
import { useParams } from "next/navigation";
import { IReservationById } from "@/types/getReservationId";
import { formatDateReservation } from "@/utils/formatDate";

export default function TransactionDetailIndex() {
  const [data, setData] = useState<IReservationById>();

  const params = useParams();
  const reservation_id: string = params.reservation_id as string;

  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getTransactionById(reservation_id);
        setData(data.data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [reservation_id]);

  const date = new Date(data?.createdAt ? data?.createdAt : Date.now());
  const tanggal = formatDateReservation(date);
  return (
    <div>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold">Booking ID : {data?.id}</h1>
        <p
          className={`mt-2 rounded-lg px-2 py-1 text-sm font-semibold ${data?.statusRes == "PAID" ? "bg-green-300/40 text-green-700" : "bg-gray-400/40 text-gray-600"}`}
        >
          {data?.statusRes == "PAID"
            ? "Berhasil Dipesan"
            : data?.statusRes == "CANCEL"
              ? "Dibatalkan"
              : data?.statusRes == "CONFIRMATION"
                ? "Menunggu Konfirmasi"
                : "Menunggu Pembayaran"}
        </p>
      </div>
      <p className="my-2 text-lg text-gray-700">
        Tanggal Pemesanan : {tanggal}
      </p>

      <SummaryTransaction
        booking_id={data?.id as string}
        property={data?.room.property.name as string}
        room={data?.room.type as string}
        location={data?.room.property.location as string}
        checkin={data?.startDate as string}
        checkout={data?.endDate as string}
        username={data?.user.username as string}
        phone={data?.user.phone as string}
        email={data?.user.email as string}
      />
      <Confrimation
        method={data?.method as string}
        payLink={(data?.paymentLink as string) || ""}
        proofLink={(data?.paymentProof as string) || ""}
        price={data?.room.price as number}
        total={data?.price as number}
        status={data?.statusRes as string}
      />
    </div>
  );
}
