"use client";

import ListCardPembelian from "./ListCardPembelian";

const Purchasepage = () => {
  return (
    <div className="pb-10 lg:px-5 lg:w-[70%]">
      <p className="text-2xl font-semibold">History</p>
      <div className="relative mt-5 border-b-2 px-4 pb-1">
        <p className="font-semibold text-btn">History Reservasi</p>
        <span className="absolute bottom-[-1px] h-[2px] w-[135px] bg-btn"></span>
      </div>
      <ListCardPembelian />
    </div>
  );
};

export default Purchasepage;
