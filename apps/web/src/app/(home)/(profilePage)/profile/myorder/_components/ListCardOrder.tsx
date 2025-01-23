"use client";
import { getReservation } from "@/libs/fetch/reservation";
import CardOrder, { ReservationStatus } from "./CardOrder";
import { Booking } from "@/types/reservation";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import EmptyComp from "@/components/EmptyComp";

const ListCardOrder = () => {
  const [orderData, setOrderData] = useState<Booking[]>([]);
  useEffect(() => {
    const orderData = async () => {
      try {
        const res = await getReservation();
        setOrderData(res.data);
      } catch (error) {
        return error;
      }
    };
    orderData();
  }, []);
  const formik = useFormik({
    initialValues: {
      booking_id: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await getReservation(values.booking_id);
        setOrderData(res.data);
      } catch (error) {
        toast.error("Reservasi tidak ditemukan");
      }
    },
  });
  return (
    <div className="mt-2 flex w-full flex-col rounded-md">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-2 px-2 pb-2 pt-2 lg:px-6"
      >
        <label htmlFor="booking_id" className="font-semibold">
          Cari Reservasi
        </label>
        <div className="flex flex-col gap-2 lg:flex-row">
          <input
            name="booking_id"
            onChange={formik.handleChange}
            value={formik.values.booking_id}
            type="text"
            placeholder="ID BOOKING"
            className="min-h-[30px] rounded-md border-2 px-2 text-sm font-semibold lg:min-w-[370px]"
          />
          <button
            type="submit"
            className="w-[100px] rounded-lg bg-btn px-6 py-1 text-white shadow-md duration-150 hover:bg-btnhover lg:py-2"
          >
            Cari
          </button>
        </div>
      </form>
      <div className="grid w-full grid-cols-1 gap-2 px-2 py-2 md:gap-3 md:px-3 lg:gap-4 lg:px-5">
        {orderData.length == 0 ? (
          <EmptyComp
            text="Reservasi tidak ditemukan"
            sizetext="text-xl"
            width="500px"
            height="500px"
          />
        ) : (
          orderData.map((item: Booking, idx: number) => (
            <div
              key={idx}
              className={`${idx % 2 === 0 ? "bg-latar/40" : "border bg-white"} rounded-lg shadow-sm`} // Menambahkan kelas latar belakang abu-abu untuk baris genap
            >
              <CardOrder
                location={item.room.property.location}
                name={item.room.type}
                price={item.price}
                reservation_id={item.id}
                status={item.statusRes as ReservationStatus}
                start={item.startDate}
                end={item.endDate}
                property={item.room.property.name}
                propType={item.room.property.category}
                create={item.createdAt}
                image={item.room.property.thumbnail}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListCardOrder;
