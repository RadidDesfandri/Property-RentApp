"use client";
import { useState } from "react";
import BookingDate from "./bookingDate";
import DropdownPay from "./dropdownPay";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { createPaymentTF, createPaymentVA } from "@/libs/fetch/reservation";
import { FaMinus } from "react-icons/fa6";
import Modal from "./modal";
import { FaPlus } from "react-icons/fa6";
import { ICreateReservation } from "@/types/reservation";
export default function ReservationDetail({
  price,
  capacity,
}: {
  price: number;
  capacity: number;
}) {
  const [drop, setDrop] = useState<boolean>(false);
  const [payMethod, setPayMethod] = useState<string>("Virtual Account");
  const [guest, setGuest] = useState<number>(1);
  const [guestNumber, setGuestNumber] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const startDate: any = new Date(searchParams.get("checkin")!);
  const endDate: any = new Date(searchParams.get("checkout")!);
  const room_id: string = params.id as string;
  const millisecondsPerNight = 24 * 60 * 60 * 1000;
  const nights = Math.round((endDate - startDate) / millisecondsPerNight);
  const priceNight = (price as number) * nights;
  const total = (priceNight as number) + (priceNight as number) * 0.15;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleGuest = () => {
    setGuest(guestNumber);
    closeModal();
  };
  const handleDropdownVA = () => {
    setPayMethod("Virtual Account");
    setDrop(false);
  };
  const handleDropdownTF = () => {
    setPayMethod("Transfer Bank");
    setDrop(false);
  };
  const handleDrop = () => {
    setDrop(!drop);
  };
  const payload: ICreateReservation = {
    room_id,
    startDate,
    endDate,
    total,
    guest,
  };
  const handlePaymentVa = async () => {
    await createPaymentVA(payload);
  };
  const handlePaymentTf = async () => {
    await createPaymentTF(payload);
  };
  return (
    <div className="lg:w-[40%]">
      <div className="flex items-center gap-2 pb-2">
        <h1 className="text-2xl font-bold">RESERVASI</h1>
      </div>
      <h2 className="mb-2 text-xl font-bold text-hitam">Pemesanan Anda</h2>
      <div className="flex flex-col justify-between gap-x-6 gap-y-2 pb-2 pt-2">
        <BookingDate />
      </div>
      <div className="my-2 flex items-center justify-between">
        <div className="">
          <h1 className="text-lg font-semibold">Tamu</h1>
          <p>{guest} Tamu</p>
        </div>
        <button
          onClick={openModal}
          className="h-max w-max items-center rounded-lg text-end text-lg font-medium text-gray-500 underline duration-300 hover:text-black"
        >
          Edit
        </button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <h2 className="mt-2 text-xl font-semibold">Tamu</h2>
          <p className="mb-5 text-sm">Max {capacity}</p>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Dewasa</p>
              <p className="">Usia 13+</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  guestNumber > 1 ? setGuestNumber(guestNumber - 1) : null
                }
                className="h-max w-max rounded-full px-2 py-2 text-sm hover:bg-black/10"
              >
                <FaMinus />
              </button>
              <p className="text-xl font-medium">{guestNumber}</p>
              <button
                onClick={() =>
                  guestNumber < capacity
                    ? setGuestNumber(guestNumber + 1)
                    : null
                }
                className="h-max w-max rounded-full px-2 py-2 text-sm hover:bg-black/10"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={closeModal}
              className="text-gray-600 duration-150 hover:text-black"
            >
              Batalkan
            </button>
            <button
              onClick={handleGuest}
              className="rounded-lg bg-btn px-4 py-2 font-medium text-white duration-150 hover:bg-btnhover"
            >
              Simpan
            </button>
          </div>
        </Modal>
      </div>
      <div className="py-4">
        <DropdownPay
          drop={drop}
          setDrop={handleDrop}
          payMethod={payMethod}
          paymentVA={handleDropdownVA}
          paymentTF={handleDropdownTF}
        />

        <h1 className="my-2 py-1 text-lg font-semibold">
          Kebijakan pembatalan
        </h1>
        <p className="">
          Pembatalan gratis dua hari sebelum waktu Check-in. Jika dibatalkan
          setelah itu maka Anda akan mendapatkan pengembalian uang sebagian.
        </p>
      </div>

      <div className="flex flex-col">
        <h1 className="pb-2 text-lg font-semibold">Aturan dasar</h1>
        <p className="">
          Kami meminta setiap tamu untuk mengingat beberapa hal sederhana
          mengenai apa saja yang perlu dilakukan untuk menjadi tamu yang luar
          biasa.
        </p>
        <div className="py-2 pl-4">
          <ul className="list-disc">
            <li className="m mb-2">Patuhi peraturan rumah</li>
            <li>
              Perlakukan rumah milik Tuan Rumah Anda seperti rumah Anda sendiri
            </li>
          </ul>
        </div>
      </div>
      <div className="my-2">
        <h1 className="my-2 py-1 text-lg font-semibold">Proses pembayaran</h1>
        <p className="">
          Jika melalui pembayaran otomatis anda akan diarahkan ke link payment
          gateway untuk langsung membayar, jika melalui transfer manual maka
          anda akan diminta mengupload bukti pembayaran. Batas waktu pembayaran
          adalah 1 jam setelah membuat reservasi
        </p>
      </div>
      <hr />
      <p className="pt-2 text-[13px] leading-snug">
        Dengan memilih tombol di bawah ini, saya menyetujui
        <span className="font-semibold underline">
          {" "}
          Peraturan Tuan Rumah{" "}
        </span>{" "}
        ,
        <span className="font-semibold underline">Aturan dasar untuk tamu</span>
        ,
        <span className="font-semibold underline">
          Kebijakan Pemesanan Ulang dan Pengembalian Uang Nezztar
        </span>
        , dan bahwa Nezztar{" "}
        <span className="font-semibold underline">
          bisa membebankan biaya ke metode pembayaran saya jika saya
        </span>{" "}
        bertanggung jawab atas kerusakan.
      </p>
      <button
        onClick={
          payMethod == "Virtual Account" ? handlePaymentVa : handlePaymentTf
        }
        className="mt-4 w-full rounded-xl bg-btn px-6 py-4 text-lg font-semibold text-white duration-300 hover:bg-btnhover lg:w-max"
      >
        Lanjutkan dan Bayar
      </button>
    </div>
  );
}
