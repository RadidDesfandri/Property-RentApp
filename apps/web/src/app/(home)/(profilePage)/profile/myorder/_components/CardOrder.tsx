"use client";
import { navigate } from "@/libs/server";
import Link from "next/link";
import { formatRupiah } from "@/utils/formataRupiah";
import { formatDateReservation } from "@/utils/formatDate";

import Image from "next/image";
export type ReservationStatus = "PENDING" | "CONFIRMATION" | "PAID" | "CANCEL";
interface IOrderlist {
  location: String;
  name: String;
  price: number;
  reservation_id: string;
  status: ReservationStatus;
  start: String;
  end: String;
  property: String;
  propType: String;
  create: String;
  image: string;
}

const CardOrder = ({
  location,
  name,
  price,
  reservation_id,
  status,
  start,
  property,
  propType,
  end,
  create,
  image,
}: IOrderlist) => {
  const reservasi = {
    PENDING: "Menunggu Pembayaran",
    CONFIRMATION: "Menunggu Konfirmasi",
    PAID: "Berhasil",
    CANCEL: "Dibatalkan",
  };
  const total = formatRupiah(price);
  const statusMessage = reservasi[status] || "status tidak diketahui";
  const startDate = formatDateReservation(new Date(start as string));
  const endDate = formatDateReservation(new Date(end as string));
  const createdAt = formatDateReservation(new Date(create as string));

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg px-2 py-2 text-xs lg:px-4 lg:py-4">
      <div className="flex flex-col items-start justify-between gap-2 text-[12px] text-gray-500 lg:flex-row lg:items-center">
        <div className="flex flex-col justify-start gap-2 lg:flex-row">
          <p>ID : {reservation_id}</p>
          <p className="hidden lg:block">/</p>
          <p>{createdAt}</p>
        </div>
        <p
          className={`w-max rounded-full border-b-2 text-center font-medium text-black ${status == "CANCEL" ? "bg-red-300/70 text-red-600" : status == "PAID" ? "bg-green-500/30 text-green-700" : "bg-gray-300/30"} px-2 py-1`}
        >
          {statusMessage}
        </p>
      </div>
      <hr className="mb-2 mt-1 border-slate-300" />
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <Image
          src={image ? `${image}` : "/dummy/kamar.jpg"}
          alt="Order image"
          width={500}
          height={100}
          className="hidden h-[150px] w-[370px] rounded-lg object-cover lg:block"
        />
        <div className="flex flex-col items-start justify-between gap-3 pl-2 text-xs">
          <div>
            <p className="text-lg font-semibold">
              {propType} {property}{" "}
            </p>

            <p className="text-sm font-semibold text-btn">{location}</p>
            <div className="flex gap-2 text-gray-600">
              <p className="text-gray-600">{startDate}</p>
              <p>-</p>
              <p className="text-gray-600">{endDate}</p>
            </div>
          </div>

          <p className="justify-self-end text-lg font-semibold">{total}</p>
        </div>
        <div className="flex flex-col items-end justify-end">
          <Link href={`/profile/myorder/${reservation_id}`}>
            <button className="mr-2 text-sm underline underline-offset-4">
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
{
  /* */
}

{
  /* <p className="pt-2 font-bold">Booking Id: </p>
<p className="pb-2 text-sm font-bold text-btn">{reservation_id}</p>
<section className="h-full px-3 py-2 flex flex-col justify-between">
  <main className="flex items-center justify-between gap-6 text-sm md:text-base">
    <div className="flex items-center gap-1">
      <FaLocationDot className="text-btn" />
      <p className="font-medium text-hitam">{location}</p>
    <div className="flex items-center gap-1">
      <IoStar className="text-yellow-500" />
      <p className="font-medium text-hitam">4.5</p>
    </div>
    </div>
    <p
      className={`self-end border-b-2  ${status == "PENDING" ? "border-yellow-500/70" : status == "PAID" ? "border-green-500/70" : status == "CONFIRMATION" ? "border-yellow-400/70":  "rounded-md bg-red-600/70"} px-2 text-end text-[12px] font-semibold`}
    >
      {statusMessage}
    </p>
  </main>
  <main className="my-4 h-[60px] text-sm md:text-base">
    <p className="line-clamp-2 font-semibold text-hitam">{name}</p>
    <h3 className="text-xs text-gray-500 md:text-sm">1 Kamar</h3>
  </main>

  <div className="flex items-center justify-between text-sm md:text-base justify-self-end">
    <h3 className="font-medium text-hitam">Rp {price}</h3>
    <div>
      <button
        onClick={() => navigate(`/reservation-detail/${reservation_id}`)}
        className="rounded-md bg-btn px-2 py-2 text-white duration-300 hover:bg-btnhover"
      >
        Booking Details
      </button>
    </div>
  </div>
</section> */
}
