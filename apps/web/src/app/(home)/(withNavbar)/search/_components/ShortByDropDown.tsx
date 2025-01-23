"use client";

import React, { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";

const shortby = [
  "Name (A-Z)",
  "Name (Z-A)",
  "Harga (Low to High)",
  "Harga (High to Low)",
];
interface ShortbyProps {
  onSelectSortBy: (sort: string) => void;
}

const ShortByDropDown: React.FC<ShortbyProps> = ({ onSelectSortBy }) => {
  const [selected, setSelected] = useState<string>(shortby[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (select: string) => {
    setSelected(select);
    onSelectSortBy(select);
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 rounded-full border px-3 text-sm text-gray-800"
        >
          {selected}
          <IoChevronDownOutline
            className={`-mr-1 ml-2 h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-[190px] rounded-xl border bg-slate-50 p-1 shadow-lg">
          <div>
            {shortby.map((short) => {
              return (
                <div
                  key={short}
                  onClick={() => handleSelect(short)}
                  className={`flex cursor-pointer items-center px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 ${selected === short ? "bg-gray-200" : ""}`}
                >
                  {selected == short ? (
                    <IoIosCheckmark className="h-6 w-6" />
                  ) : (
                    <div className="h-6 w-6"></div>
                  )}
                  {short}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortByDropDown;
