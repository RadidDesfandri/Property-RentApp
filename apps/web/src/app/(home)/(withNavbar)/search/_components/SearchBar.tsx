"use client";

import { CalendarSearch } from "@/components/homepageComp/CalendarSearch";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  onSearch: (location: string, startDate: string, endDate: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [guests, setGuests] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [isGuestModalOpen, setGuestModalOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleResetCount = () => {
    setGuests(0);
    setGuestModalOpen(false);
  };

  const handleSearch = () => {
    const startDate = date?.from ? date.from.toISOString() : "";
    const endDate = date?.to ? date.to.toISOString() : "";
    onSearch(location, startDate, endDate);
  };

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
  
  return (
    <div className="flex w-full items-center gap-2 md:px-14">
      <div className="flex w-full justify-between rounded-full border-[1.5px]">
        <div className="w-1/3 border-r-[1.5px] py-2 pl-3 md:pl-5">
          <input
            type="text"
            placeholder="Cari tempat"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs text-gray-500 placeholder:text-xs focus:outline-none md:text-base md:placeholder:text-base"
          />
        </div>

        <div className="flex w-1/3 items-center gap-1 border-r-[1.5px] pl-3 md:pl-5">
          <CalendarSearch date={date} setDate={setDate} />
        </div>

        <div className="relative flex w-1/3 items-center px-5">
          <button
            onClick={() => setGuestModalOpen(!isGuestModalOpen)}
            className="h-full w-full text-start text-[9px] text-gray-500 md:text-sm"
          >
            {guests > 0 ? `${guests} Tamu` : "Jumlah tamu"}
          </button>
          {guests > 0 && (
            <button
              onClick={handleResetCount}
              className="rounded-full border hover:bg-gray-100 md:p-1"
            >
              <IoIosClose className="h-2 w-2 md:h-5 md:w-5" />
            </button>
          )}
          {isGuestModalOpen && (
            <div
              ref={modalRef}
              className="absolute bottom-[-60px] left-0 rounded-md border bg-white p-2 shadow-md md:bottom-[-70px] md:w-[280px] md:p-3"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm md:text-base">
                  <GoPerson /> Tamu
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => setGuests(guests > 0 ? guests - 1 : 0)}
                    className="rounded-full border p-1 text-lg text-gray-500 hover:bg-gray-100"
                  >
                    <FiMinus className="h-4 w-4 md:h-7 md:w-7" />
                  </button>
                  <span className="mx-2 md:mx-4">{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="rounded-full border p-1 text-lg text-gray-500 hover:bg-gray-100"
                  >
                    <FiPlus className="h-4 w-4 md:h-7 md:w-7" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search button */}
      <button
        disabled={
          location == "" ||
          date?.from == undefined ||
          date.to == undefined ||
          guests == 0
        }
        onClick={handleSearch}
        className="disabled:text-g ray-100 flex items-center gap-1 rounded-full bg-btn px-2 py-2 text-white hover:shadow-md disabled:bg-slate-300 disabled:shadow-none md:px-4"
      >
        <IoSearch /> Search
      </button>
    </div>
  );
};

export default SearchBar;
