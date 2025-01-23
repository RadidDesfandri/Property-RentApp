import Image from "next/image";
import React from "react";
import { BsBuildings } from "react-icons/bs";
import { MdLocationOn, MdOutlineVilla } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import CardRoomHome from "../_components/CardRoomHome";
import { getPropertyByid } from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";
import { IoLocationOutline } from "react-icons/io5";

const Detailproperty = async ({ params }: { params: { id: string } }) => {
  const res = await getPropertyByid(params.id);
  const data: DataProperty = res.data.property;

  return (
    <section className="w-full bg-btnhover pt-20">
      <div className="bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl gap-2 px-4 md:px-10">
          <section className="flex flex-col justify-between md:flex-row">
            <Image
              src={data.thumbnail}
              alt={`Property-${data.name}`}
              width={800}
              height={800}
              className="h-[200px] w-full rounded-xl object-cover md:h-[300px] md:w-1/2 lg:h-[350px]"
            />
            <div className="flex w-full flex-col gap-3 py-5 text-hitam md:w-1/2 md:px-8">
              <h1 className="flex items-center gap-1 text-xl font-medium">
                <BsBuildings className="h-6 w-6" />{" "}
                <p className="truncate">{data.name}</p>
              </h1>
              <h2 className="flex items-center justify-start gap-1 text-sm text-gray-500">
                <IoLocationOutline />{" "}
                <p className="line-clamp-2">{data.location}</p>
              </h2>
              {data.category === "Hotel" ? (
                <div className="flex items-center gap-1 text-gray-500">
                  <RiHotelLine />
                  <p>Hotel</p>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-gray-500">
                  <MdOutlineVilla />
                  <p>Villa</p>
                </div>
              )}
              <div>
                <h1 className="text-lg font-medium text-hitam">
                  Deskripsi Properti
                </h1>
                <div className="min-h-32 rounded-md border border-btn p-3 md:min-h-[125px] lg:min-h-44">
                  <p className="text-sm text-gray-500 md:line-clamp-5 lg:line-clamp-7">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-7">
            <h1 className="font-medium text-hitam md:text-2xl">
              Room Yang Tersedia di {data.name}
            </h1>
            <div className="mt-2 flex flex-col gap-7">
              {data.Room.map((item) => {
                return <CardRoomHome key={item.id} data={item} />;
              })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Detailproperty;
