import { navigate } from "@/libs/server";

import { formatDateReservation } from "@/utils/formatDate";

import { FaLocationDot } from "react-icons/fa6";
import React from "react";
interface IProps {
  id: string;
  startDate: string;
  endDate: string;
  property: string;
  location: string;
  status: string;
}
const CardPembelian = ({
  id,
  startDate,
  endDate,
  location,
  property,
  status,
}: IProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-slate-50 lg:shadow-md">
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <h1 className="text-xs text-gray-500 lg:text-sm">ID: {id} </h1>
            <p className="hidden text-xs lg:block">/</p>
            <h1 className="text-xs text-hitam">
              {formatDateReservation(new Date(startDate))} -{" "}
              {formatDateReservation(new Date(endDate))}
            </h1>
          </div>
          <p
            className={`w-max -translate-x-1 rounded-full px-2 py-1 text-xs font-bold ${status == "PAID" ? "bg-green-400/20 text-green-600" : status == "CANCEL" ? "bg-red-300/20 text-red-500" : "bg-slate-300/30 text-gray-600"} `}
          >
            {status == "PAID"
              ? "berhasil"
              : status == "CANCEL"
                ? "dibatalkan"
                : status == "PENDING"
                  ? "Menunggu Pembayaran"
                  : "Menunggu Konfirmasi"}
          </p>
        </div>
        <main className="w-full">
          <div className="flex w-full justify-between">
            <h1 className="truncate text-wrap font-medium text-hitam">
              {property}
            </h1>
          </div>
          <div className="flex flex-col justify-between gap-2 lg:flex-row">
            <div className="flex items-center gap-1  text-gray-500">
              <FaLocationDot />
              <h1 className="">{location}</h1>
            </div>
            <button
              onClick={() => {
                navigate(`/profile/myorder/${id}`);
              }}
              className="w-max self-end border-b duration-150 hover:border-b-black lg:self-auto"
            >
              Detail
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CardPembelian;
