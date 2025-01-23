"use client";
import { MouseEventHandler, useRef } from "react";
import { MdOutlinePayment } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiArrowDownWideFill } from "react-icons/ri";
interface IProps {
  drop: boolean;
  setDrop: MouseEventHandler<HTMLButtonElement>;
  payMethod: string;
  paymentVA: MouseEventHandler<HTMLButtonElement>;
  paymentTF: MouseEventHandler<HTMLButtonElement>;
}
export default function DropdownPay({
  drop,
  setDrop,
  payMethod,
  paymentVA,
  paymentTF,
}: IProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative">
      <h1 className="pb-4 text-lg font-semibold">Metode Pembayaran</h1>
      <button
        onClick={setDrop}
        className="flex w-full items-center justify-between rounded-lg border-2 px-5 py-2.5 text-center text-lg font-medium text-gray-500 shadow-sm duration-300 hover:bg-gray-200/30 hover:text-black"
        type="button"
      >
        {payMethod == "Virtual Account" ? "Otomatis" : "Manual"}
        <RiArrowDownWideFill
          className={`${!drop ? "" : "-rotate-180"} duration-300`}
        />
      </button>

      <div
        ref={dropdownRef} 
        className={`absolute z-10 w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out ${
          drop ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="rounded-lg bg-white text-sm shadow-md duration-300">
          <button
            className="flex w-full items-center gap-5  px-4 py-2 text-lg duration-150 hover:bg-gray-200/30 hover:text-black text-gray-500 "
            onClick={paymentVA}
          >
            <MdOutlinePayment />
            <p>Otomatis</p>
          </button>
          <hr />

          <button
            className="flex w-full items-center gap-5  px-4 py-2 text-lg duration-150 hover:bg-gray-200/30 hover:text-black text-gray-500 "
            onClick={paymentTF}
          >
            <FaMoneyBillTransfer />
            <p>Manual</p>
          </button>
        </ul>
      </div>
    </div>
  );
}
