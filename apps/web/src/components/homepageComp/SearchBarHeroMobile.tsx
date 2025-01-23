"use client";

import React, { useState } from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CalendarSearchMobile } from "./CalendarSearchMobile";
import { DateRange } from "react-day-picker";

const SearchBarHeroMobile = () => {
  const [guests, setGuests] = useState<number>(0);
  const [activeModal, setActiveModal] = useState(false);
  const [location, setLocation] = useState("");
  const router = useRouter();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<DateRange | undefined>();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActiveModal(false);
      }
    }

    if (activeModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeModal]);

  const handleSearch = () => {
    router.push(
      `/search?location=${location}&startDate=${date?.from?.toISOString()}&endDate=${date?.to?.toISOString()}`,
    );
  };

  const handleResetCount = () => {
    setGuests(0);
    setActiveModal(false);
  };

  return (
    <main className="absolute left-1/2 top-[40%] flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-center md:hidden">
      <p className="text-3xl font-semibold text-white">
        CARI TEMPAT ISTIRAHAT TERNYAMANMU
      </p>

      <div className="mt-7 flex w-full flex-col gap-5 px-10">
        <div>
          <p className="text-start font-semibold text-white">Lokasi</p>
          <div className="w-full rounded-full bg-white px-2 py-4 pl-6">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Pilih lokasi yang ingin anda tuju"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <p className="text-start font-semibold text-white">Durasi</p>
          <div className="w-full rounded-full bg-white px-2 py-4">
            <CalendarSearchMobile date={date} setDate={setDate} />
          </div>
        </div>

        <div className="relative">
          <p className="text-start font-semibold text-white">Tamu</p>
          <div className="flex w-full items-center justify-between rounded-full bg-white px-6 py-4 text-start text-gray-500">
            <button
              type="button"
              onClick={() => setActiveModal(!activeModal)}
              className="h-full w-full text-start"
            >
              {guests > 0 ? `${guests} Tamu` : "Jumlah tamu"}
            </button>
            {guests > 0 && (
              <button
                onClick={handleResetCount}
                className="rounded-full border p-1 hover:bg-gray-100"
              >
                <IoIosClose className="h-5 w-5" />
              </button>
            )}
          </div>

          {activeModal && (
            <div
              ref={modalRef}
              className="absolute -bottom-[58px] left-1/2 w-[250px] -translate-x-1/2 transform rounded-lg bg-white px-3 py-2 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-base">
                  <GoPerson /> Tamu
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => setGuests(guests > 0 ? guests - 1 : 0)}
                    className="rounded-full border p-1 text-lg text-gray-500 hover:bg-gray-100"
                  >
                    <FiMinus className="h-7 w-7" />
                  </button>
                  <span className="mx-4">{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="rounded-full border p-1 text-lg text-gray-500 hover:bg-gray-100"
                  >
                    <FiPlus className="h-7 w-7" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={
              location == "" ||
              guests == 0 ||
              date?.from == undefined ||
              date.to == undefined
            }
            onClick={handleSearch}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-btn px-2 py-4 text-white disabled:bg-slate-300 disabled:text-gray-100 disabled:shadow-none"
          >
            <IoIosSearch className="h-7 w-7" />
            <p className="text-lg">Cari</p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SearchBarHeroMobile;
