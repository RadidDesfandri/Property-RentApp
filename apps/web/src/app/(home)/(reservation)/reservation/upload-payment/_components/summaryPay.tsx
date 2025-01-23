"use client";
import { getReservation } from "@/libs/fetch/reservation";
import { formatRupiah } from "@/utils/formataRupiah";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";

export default function SummaryPay() {
  const [total, setTotal] = useState<number>();
  const params = useParams();
  const reservation_id = params.reservation_id;
  useEffect(() => {
    const getRes = async () => {
      const res = await getReservation(reservation_id as string);
      setTotal(res.data[0].price);
    };
    getRes();
  });
  
  
  return (
    <div className="flex flex-col rounded-lg border-2 px-4 lg:min-w-[500px]">
      <div className="flex items-center justify-between">
        <p className="font-bold">Manual Transfer</p>
        <Image
          src={"/logoBca.png"}
          width={100}
          height={100}
          alt="logo BCA"
          className="w-[80px]"
        />
      </div>
      <hr className="py-4" />

      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <p className="text-gray-500">Nomor Rekening</p>
          <p className="font-bold">372 173 72138</p>
        </div>
        <p className="h-max rounded-full bg-abu px-4 py-2">
          <FaRegCopy />
        </p>
      </div>
      <div className="flex flex-col py-4">
        <p className="text-gray-500">Atas Nama</p>
        <p className="font-bold"> PT. Nezztar Indonesia</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-500">Total yang harus dibayarkan</p>
        <p className="font-bold">{formatRupiah(total!)}</p>
      </div>
    </div>
  );
}
