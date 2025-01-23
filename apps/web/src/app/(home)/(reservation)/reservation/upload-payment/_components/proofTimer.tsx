"use client";
import {
  cancelResersvationUser,
  getReservation,
} from "@/libs/fetch/reservation";
import { navigate } from "@/libs/server";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function TimerComp() {
  const [time, setTime] = useState<number>(3600);
  const [start, setStart] = useState<string>();
  const params = useParams();
  const reservation_id = params.reservation_id;
  useEffect(() => {
    const getRes = async () => {
      const res = await getReservation(reservation_id as string);
      setStart(res.data[0].createdAt);
    };
    getRes();
    const reservation = new Date(start!);
    const now = new Date();
    const endTime = new Date(reservation.getTime() + 60 * 60 * 1000); // 1 hour after reservation
    const initialTime = Math.max(
      0,
      Math.floor((endTime.getTime() - now.getTime()) / 1000),
    );
    setTime(initialTime);
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          cancelResersvationUser(reservation_id as string);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [start,reservation_id]);
  const hour = Math.floor(time / 3600);
  const second = time % 60;
  const minutes: number = Math.floor(time / 60 / (hour + 1));
  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-semibold text-btn">Batas waktu pembayaran :</p>
      {time > 0 ? (
        <p className="mb-5 py-2 text-4xl font-bold text-hitam">
          00: {minutes} :{second < 10 ? ` 0${second}` : ` ${second}`}
        </p>
      ) : (
        <p className="my-2 text-sm font-bold text-hitam">
          Waktu pembayaran <span className="text-red-700">Habis</span>{" "}
          rerservasi anda dibatalkan
        </p>
      )}
      <button onClick={() => navigate("/")} className={`${time>0? "hidden" : "blocl"} border-b-2 border-black`}> Kembali ke Home</button>
    </div>
  );
}
