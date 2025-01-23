import { FacilityType, RoomPic } from "@/types/property";
import { formatRupiah } from "@/utils/formataRupiah";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

export interface RoomDataProps {
  id: string;
  capacity: number;
  description: string;
  facility: FacilityType[];
  price: number;
  pricediscount: number;
  type: string;
  availability: boolean;
  RoomPic: RoomPic[];
  property: {
    name: string;
    location: string;
    category: string;
  };
}

const CardAllRooms = ({ data }: { data: RoomDataProps }) => {
  return (
    <Link
      href={`search/room/${data.id}`}
      className="flex items-center gap-5 rounded-md border p-2 md:p-3"
    >
      {/* Image section */}
      <div className="md:w-1/3">
        <Image
          src={data.RoomPic[0].url}
          alt="Image"
          width={300}
          height={300}
          className="h-[110px] w-full rounded-md object-cover"
        />
      </div>

      {/* Name location, price dll */}
      <div className="flex h-[110px] justify-between md:w-10/12">
        <div className="flex flex-col justify-between">
        <div>
            <h1 className="text-sm font-semibold text-hitam md:text-lg">
              {data.property.name} - {data.property.category}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-500 md:text-sm">
              <IoLocationOutline />
              {data.property.location}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 md:text-sm">
              <IoIosStarOutline /> 4.5
            </div>
          </div>
          <div className="flex text-xs font-semibold text-gray-500 md:hidden md:text-lg">
            {formatRupiah(data.price)}
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            {data.facility.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="rounded-full bg-gray-200/20 px-1 text-[10px] md:px-2 md:text-sm"
              >
                {item.name}
              </div>
            ))}
            {data.facility.length > 3 && (
              <div className="rounded-full bg-gray-200/20 px-1 text-[10px] md:px-2 md:text-sm">
                {data.facility.length - 3}+
              </div>
            )}
          </div>
        </div>
        <div className="hidden text-sm font-semibold text-hitam md:block md:text-lg">
          {formatRupiah(data.price)}
        </div>
      </div>
    </Link>
  );
};

export default CardAllRooms;
