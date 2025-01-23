"use client";
import { navigate } from "@/libs/server";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
export default function DropDownStatus() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const category = [
    { status: "PENDING", text: "Pending" },
    { status: "CONFIRMATION", text: "Menunggu Konfirmasi" },
    { status: "PAID", text: "Dibayar" },
    { status: "CANCEL", text: "Dibatalkan" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center gap-2 rounded-md bg-white px-3 py-2 font-bold text-btn duration-200 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        Status
        <IoIosArrowDown />
      </button>
      {/* MENU */}
      <div
        className={`${isOpen ? "block" : "hidden"} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-sm`}
      >
        {category.map((item, idx) => {
          const handleStatus = () => {
            setIsOpen(false);
            navigate(`/dashboard/transaction/?status=${item.status}`);
          };
          return (
            <button
              key={idx}
              onClick={() => handleStatus()}
              className="block w-full px-4 py-2 text-sm text-gray-700 duration-200 hover:bg-btn/30"
            >
              {item.text}
            </button>
          );
        })}
      </div>
      {/* MENU */}
    </div>
  );
}
