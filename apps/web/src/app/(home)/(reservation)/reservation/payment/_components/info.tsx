"use client";
import { getReservation } from "@/libs/fetch/reservation";
import { Booking } from "@/types/reservation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Info() {
  const [data, setData] = useState<Booking>();
  const params = useParams();
  const booking_id = params.id;
  useEffect(() => {
    const getData = async () => {
      const res = await getReservation(booking_id as string);
      setData(res.data[0]);
    };
    getData();
  }, [booking_id]);
  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center gap-2 justify-self-center rounded-xl px-2 py-2 lg:px-4">
      <p className="text-sm font-semibold text-gray-500">
        Booking ID : {data?.id!}
      </p>
      <h1 className="text-3xl font-bold">Menunggu konfirmasi </h1>
      <p>Reservasi anda sedang di review oleh Tenant</p>
      <div className="mt-2 flex gap-4">
        <Link
          href={"/"}
          className="rounded-full bg-btn px-4 py-1 text-white duration-300 hover:bg-btnhover"
        >
          Home
        </Link>
        <Link
          href={`/profile/myorder/${data?.id}`}
          className="rounded-full border-2 px-4 py-1 duration-300 hover:bg-btn hover:text-white"
        >
          Detail Reservasi
        </Link>
      </div>
    </div>
  );
}
