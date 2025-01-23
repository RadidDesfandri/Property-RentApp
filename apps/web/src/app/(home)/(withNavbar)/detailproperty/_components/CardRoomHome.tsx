"use client";

import FacilityCard from "@/app/(home)/(dashboardPage)/dashboard/(createProperty)/create-property/_components/roomsComp/FacilityCard";
import { RoomData } from "@/types/property";
import { formatRupiah } from "@/utils/formataRupiah";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const CardRoomHome = ({ data }: { data: RoomData }) => {
  const [isHover, setIsHover] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full">
      <main className="flex w-full flex-col-reverse justify-between gap-2 rounded-md border border-btn p-5 md:flex-row">
        <div className="flex w-full items-center py-5 md:w-1/2">
          <div className="flex w-1/2 flex-col gap-2 border-r border-btn">
            <div className="text-gray-500">
              <FacilityCard data={data} />
            </div>
            <div className="text-gray-500">
              <p className="text-lg text-hitam">Kapasitas Room</p>
              <p>{data.capacity} Orang</p>
            </div>
            <h2 className="text-lg font-medium">
              {formatRupiah(data.price)}/Malam
            </h2>
          </div>

          <div className="flex w-1/2 flex-col items-center justify-center">
            <Link
              href={`/search/room/${data.id}`}
              className="rounded-md bg-btn px-9 py-1 font-semibold text-white transition-colors duration-300 hover:bg-btn"
            >
              Pilih
            </Link>
            <p className="font-medium text-btnhover">1 room(s) left!</p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg font-medium text-hitam">
            Tipe room {data.type}
          </p>
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="embla relative w-full"
            ref={emblaRef}
          >
            <div className="embla__container h-[200px]">
              {data.RoomPic.map((item, idx) => {
                return (
                  <div key={idx} className="embla__slide flex items-center justify-center">
                    <Image
                      src={item.url}
                      alt="Room"
                      width={800}
                      height={800}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                );
              })}
            </div>
            {isHover && (
              <div
                className={`${isHover ? "opacity-50" : "opacity-100"} transition-opacity duration-300`}
              >
                <main
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 z-20 -translate-y-1/2 transform cursor-pointer bg-black py-4 text-white"
                >
                  <GrFormPrevious className="h-7 w-7" />
                </main>
                <main
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 z-20 -translate-y-1/2 transform cursor-pointer bg-black py-4 text-white"
                >
                  <GrFormNext className="h-7 w-7" />
                </main>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default CardRoomHome;
