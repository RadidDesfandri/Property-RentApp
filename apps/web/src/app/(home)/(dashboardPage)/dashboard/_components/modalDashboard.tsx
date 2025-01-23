"use client"

import Image from "next/image";
import React, { FC } from "react";

interface ModalProps {
  ketmodal: string;
  nameProperty: string;
  image: string;
  buttontext: string;
  onClose: () => void;
  handleSubmit: () => void;
  loading: boolean;
  showModal: boolean;
}

const ModalDashboard: FC<ModalProps> = ({
  ketmodal,
  handleSubmit,
  loading,
  buttontext,
  nameProperty,
  image,
  onClose,
  showModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`flex w-[350px] transform flex-col items-center rounded-md bg-white p-6 shadow-md transition-all duration-300 ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <Image
          src={image}
          alt="Hapus"
          width={250}
          height={250}
          className="h-32 w-32"
        />
        <p className="text-center text-lg font-medium">{ketmodal}</p>
        <p className="text-center font-light text-gray-500">&quot;{nameProperty}&quot;</p>
        <div className="flex w-full items-center justify-between gap-2 pt-3">
          <button
            onClick={onClose}
            type="submit"
            className="w-full rounded-md border border-btn px-3 py-2 text-sm font-semibold text-btn transition-all duration-150 hover:shadow-md disabled:bg-slate-300 disabled:text-gray-100 disabled:shadow-none md:text-base lg:px-5"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className={`w-full rounded-md bg-btn px-3 py-2 text-sm font-semibold text-white transition-all duration-150 hover:shadow-md disabled:bg-slate-300 disabled:text-gray-100 disabled:shadow-none md:text-base lg:px-5 ${image == "/hapus.svg" || image == "unpublish.svg" ? "hover:bg-red-500" : "hover:bg-green-400"}`}
          >
            {loading ? "Loading..." : `${buttontext}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDashboard;
