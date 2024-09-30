import Image from "next/image";
import React from "react";

const WhyNezztar = () => {
  const data = [
    {
      img: "/welcome.svg",
      judul: "Terasa Seperti Rumah",
      desc: "Di Nezztar, kami percaya dalam menciptakan pengalaman yang dipersonalisasi. Penyewa kami melakukan yang terbaik untuk membuat setiap masa menginap terasa seperti di rumah sendiri.",
    },
    {
      img: "/discount.svg",
      judul: "Diskon Eksklusif",
      desc: "Nikmati penginapan mewah dengan harga tiada duanya, dan manfaatkan penawaran khusus dan promosi musiman untuk menambah anggaran perjalanan Anda.",
    },
    {
      img: "/verivied.svg",
      judul: "Penyewa Terverifikasi",
      desc: "Kepercayaan dan keamanan adalah prioritas utama kami. Kami mewajibkan semua penyewa untuk menjalani proses verifikasi.",
    },
    {
      img: "/contactus.svg",
      judul: "Dukungan Pelanggan 24/7",
      desc: "Apakah Anda memerlukan bantuan dengan pemesanan Anda atau memerlukan bantuan selama Anda menginap, Nezztar selalu hanya dengan menelepon atau mengklik saja.",
    },
  ];
  return (
    <section className="w-full bg-latar/40">
      <div className="mx-auto max-w-7xl px-10 py-10">
        <h1 className="text-3xl font-semibold">
          Kenapa booking melalui Nezztar?
        </h1>
        <div className="mt-3 grid gap-3 grid-cols-1 md:grid-cols-2">
          {data.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-md border p-5"
              >
                <Image
                  src={item.img}
                  alt="WhyNezztar"
                  width={200}
                  height={200}
                  className="h-32 w-32"
                />
                <div>
                  <h1 className="text-2xl font-semibold text-black">
                    {item.judul}
                  </h1>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyNezztar;
