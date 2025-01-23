import { DataProperty } from "@/types/property";
import { formatRupiah } from "@/utils/formataRupiah";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

const CardPropertyHome = ({ data }: { data: DataProperty }) => {
  return (
    <Link
      href={`/detailproperty/${data.id}`}
      className="relative w-full overflow-hidden rounded-md bg-slate-50 shadow-md"
    >
      <Image
        src={data.thumbnail}
        alt={`Thumbnail-${data.name}`}
        width={300}
        height={300}
        className="h-[200px] w-full object-cover"
      />
      <div className="p-3">
        <div className="mb-3 flex w-full items-center gap-1 text-gray-500">
          <FaLocationDot />
          <p className="truncate">{data.location}</p>
        </div>
        <div>
          <h1 className="line-clamp-2 h-[50px]">{data.name}</h1>
          <p className="text-sm font-medium text-gray-500">
            Mulai dari {data.Room.length === 0 ? "Rp 0" : formatRupiah(data.Room[0].price)}
          </p>
        </div>
      </div>
      <div className="absolute right-1 top-1 flex items-center gap-1 rounded-md bg-yellow-400/20 px-1 text-yellow-500">
        <IoStar />
        <p className="font-medium">4.5</p>
      </div>
    </Link>
  );
};

export default CardPropertyHome;
