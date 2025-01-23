"use client";

import { RoomData } from "@/types/property";
import { FaRestroom } from "react-icons/fa6";
import {
  MdAttachMoney,
  MdMergeType,
  MdOutlineDescription,
  MdOutlineDiscount,
} from "react-icons/md";
import GridCardRooms from "./roomsComp/GridCardRooms";
import FacilityCard from "./roomsComp/FacilityCard";
import { useState } from "react";
import { formatRupiah } from "@/utils/formataRupiah";

const CardCreateRoom = ({ data }: { data: RoomData }) => {
  const [isActiveDes, setIsActiveDes] = useState(false);
  return (
    <section className="w-full rounded-md border p-5">
      <GridCardRooms data={data} />
      <main className="mt-7">
        <div className="flex items-center justify-between gap-12">
          <div>
            <h1 className="flex items-center font-medium">
              <MdMergeType className="h-5 w-5" /> Tipe Kamar
            </h1>
            <p className="text-sm text-gray-500">{data.type}</p>
          </div>
          <div>
            <h1 className="flex items-center gap-1 font-medium">
              <MdAttachMoney /> Harga normal
            </h1>
            <p className="text-sm text-gray-500">{formatRupiah(data.price)}</p>
          </div>
          <div>
            <h1 className="flex items-center gap-1 font-medium">
              <MdOutlineDiscount /> Harga diskon
            </h1>
            <p className="text-sm text-gray-500">
              {formatRupiah(data.pricediscount)}
            </p>
          </div>
          <div>
            <h1 className="flex items-center gap-1 text-lg font-medium">
              <FaRestroom /> Kapasitas kamar
            </h1>
            <p className="text-sm text-gray-500">{data.capacity} Orang</p>
          </div>
        </div>
        <div className="mt-6">
          <FacilityCard data={data} />
        </div>
        <div className="mt-6">
          <h1 className="flex items-center gap-1 text-lg font-medium">
            <MdOutlineDescription /> Deskripsi kamar
          </h1>
          <div className="min-h-44 rounded-md border p-4 text-sm text-gray-500">
            <p
              onClick={() => setIsActiveDes(!isActiveDes)}
              className={`${isActiveDes ? "line-clamp-none" : "line-clamp-[7]"} `}
            >
              {data.description}
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default CardCreateRoom;
