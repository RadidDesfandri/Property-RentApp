"use client";

import React, { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";

const categories = ["Hotel", "Villa"];
interface Categories {
  onSelectCategory: (category: string) => void;
}

const CategoryDropdown: React.FC<Categories> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between rounded-full border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCategory}
          <IoChevronDownOutline
            className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-slate-50 shadow-lg">
          <ul
            className="py-1 text-sm text-gray-700"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {categories.map((category) => (
              <li
                key={category}
                className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 ${
                  selectedCategory === category ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSelect(category)}
                role="menuitem"
              >
                {selectedCategory === category ? (
                  <IoIosCheckmark className="h-6 w-6" />
                ) : (
                  <div className="h-6 w-6"></div>
                )}{" "}
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
