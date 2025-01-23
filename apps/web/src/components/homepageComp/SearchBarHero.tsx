"use client";

import React, { useState } from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { GoPerson } from "react-icons/go";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { CalendarSearch } from "./CalendarSearch";
import { DateRange } from "react-day-picker";

const SearchBarHero = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState<number>(0);
  const [isGuestModalOpen, setGuestModalOpen] = useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<DateRange | undefined>();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setGuestModalOpen(false);
      }
    }

    if (isGuestModalOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isGuestModalOpen]);

  const handleResetCount = () => {
    setGuests(0);
    setGuestModalOpen(false);
  };
  const router = useRouter();
  const handleSearch = () => {
    router.push(
      `/search?location=${location}&startDate=${date?.from?.toISOString()}&endDate=${date?.to?.toISOString()}`,
    );
  };
  return (
    <main className="absolute left-1/2 top-[40%] hidden w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-center md:flex">
      <p className="text-3xl font-semibold text-white">
        CARI TEMPAT ISTIRAHAT TERNYAMANMU
      </p>

      <div className="flex items-center gap-2 md:w-[800px] md:px-14 lg:w-[1000px]">
        <div className="flex w-full justify-between rounded-full border-[1.5px] bg-white py-2">
          <div className="w-1/3 border-r-[1.5px] py-2 pl-5">
            <input
              type="text"
              placeholder="Cari tempat"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-base text-gray-500 placeholder:text-base focus:outline-none"
            />
          </div>

          <div className="flex w-1/3 items-center gap-1 border-r-[1.5px] pl-5">
            <CalendarSearch date={date} setDate={setDate} />
          </div>

          <div className="relative flex w-1/3 items-center px-5">
            <button
              onClick={() => setGuestModalOpen(!isGuestModalOpen)}
              className="h-full w-full text-start text-sm text-gray-500"
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
            {isGuestModalOpen && (
              <div
                ref={modalRef}
                className="absolute bottom-[-75px] left-0 rounded-md border bg-white p-3 shadow-md"
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
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={
            location == "" ||
            guests == 0 ||
            date?.from == undefined ||
            date.to == undefined
          }
          className="flex items-center gap-1 rounded-full bg-btn p-4 text-white disabled:bg-slate-300 disabled:text-gray-100 disabled:shadow-none"
        >
          <IoSearch className="h-6 w-6" />
        </button>
      </div>
    </main>
  );
};

export default SearchBarHero;
