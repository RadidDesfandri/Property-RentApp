import Image from "next/image";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { ButtonComp } from "../ButtonComp";

const data = [
  {
    src: "/manage.svg",
    judul: "Kelola dengan mudah",
    text: "Atur harga, pesanan, dan buat promo lewat platform khusus untukmu.",
  },
  {
    src: "/marketmanager.svg",
    judul: "Market Manager",
    text: "Layanan Personal Market Manager akan membantumu mengelola usaha.",
  },
  {
    src: "/marketing-amico.svg",
    judul: "Kelola dengan mudah",
    text: "Usahamu akan dipasarkan ke jutaan pengguna Nezztarr.",
  },
];

const ModalPartnert = ({ onCloseModal }: { onCloseModal: () => void }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative flex w-[370px] flex-col items-center justify-center rounded-lg bg-white px-6 py-6 text-hitam shadow-lg lg:w-[800px]"
    >
      <IoCloseOutline
        onClick={onCloseModal}
        className="absolute right-3 top-3 h-7 w-7 cursor-pointer"
      />
      <h1 className="my-4 w-full text-start text-2xl font-medium">
        Yuk jadi partner Nezztarr!
      </h1>
      <p className="text-xs">
        Gabung dan dapetin peluang menyambut lebih banyak tamu untuk usahamu.
        Daftarkan hotel, villa, sampai ke aktivitas dan eventmu untuk nikmati
        keuntungannya.
      </p>

      {/* Card benefit start */}
      <main className="my-6 grid w-full grid-cols-3 gap-4">
        {data.map((item, idx) => {
          return (
            <div key={idx} className="flex w-full items-start justify-between gap-2 rounded-lg border px-2 py-2">
              <Image src={`${item.src}`} alt="vector" width={50} height={50} />
              <div className="w-full">
                <h1 className="text-sm font-medium">{item.judul}</h1>
                <p className="text-xs">{item.text}</p>
              </div>
            </div>
          );
        })}
      </main>
      {/* Card benefit end */}

      <p className="w-full text-start text-xs">
        Mulai sekarang dengan proses registrasi yang mudah dan cepat!{" "}
      </p>
      <div className="mt-2 flex w-full items-start">
        <Link href={"/account/registertenant"} className="w-fit">
          <ButtonComp text="Gabung sekarang" />
        </Link>
      </div>
    </div>
  );
};

export default ModalPartnert;
