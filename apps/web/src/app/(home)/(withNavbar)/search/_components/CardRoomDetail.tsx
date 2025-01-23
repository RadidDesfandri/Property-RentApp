"use client";

import GridCardRooms from "@/app/(home)/(dashboardPage)/dashboard/(createProperty)/create-property/_components/roomsComp/GridCardRooms";
import { CalendarComp } from "@/components/Calendar";
import { getRoomsById } from "@/libs/fetch/rooms";
import { getCookie } from "@/libs/server";
import { DataProperty, RoomData } from "@/types/property";
import { formatRupiah } from "@/utils/formataRupiah";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { FaWifi } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineBedroomChild,
  MdOutlineBedroomParent,
  MdOutlineFreeBreakfast,
  MdOutlineShower,
} from "react-icons/md";
import LoadingDetailRooms from "./LoadingDetailRooms";

const CardRoomDetail = ({ id }: { id: string }) => {
  const [data, setData] = useState<RoomData | null>(null);
  const [properti, setProperti] = useState<DataProperty | null>(null);
  const [tenant, setTenant] = useState<any>(null);
  const [date, setDate] = useState<DateRange | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const checkParams = useSearchParams();

  const checkInParams = checkParams.get("checkIn") || "";
  const checkOutParams = checkParams.get("checkOut") || "";

  const [checkIn, setCheckIn] = useState<string>(checkInParams);
  const [checkOut, setCheckOut] = useState<string>(checkOutParams);

  const updateQueryParams = useCallback(() => {
    const query = new URLSearchParams({
      checkIn,
      checkOut,
    }).toString();
    router.push(`?${query}`);
  }, [checkIn, checkOut, router]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const params = { checkIn, checkOut };
        const res = await getRoomsById(id, params);
        const roomData = res.data.room;
        setData(roomData);
        setProperti(roomData.property);
        setTenant(roomData.tenant);
      } catch (error) {
        console.error("Error fetching room data", error);
      }
    };

    fetchRoomData();
  }, [id, checkIn, checkOut]);

  useEffect(() => {
    updateQueryParams();
  }, [checkIn, checkOut, updateQueryParams]);

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate.to) {
      setCheckIn(newDate.from.toISOString());
      setCheckOut(newDate.to.toISOString());
    }
  };

  const calculateTotalPrice = () => {
    if (!date?.from || !date?.to || !data) return 0;
    const oneDay = 1000 * 60 * 60 * 24;
    const nights = Math.round(
      (date.to.getTime() - date.from.getTime()) / oneDay,
    );
    return data.price * nights;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie("token");
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, []);

  const unavailableDates =
    data?.RoomAvailability?.filter(
      (availability) => !availability.isAvailable,
    ) ?? [];

  const handleReservasi = () => {
    if (!isLoggedIn) {
      router.push("/account/register");
      return;
    }

    router.push(
      `/reservation/${id}?checkin=${date?.from}&checkout=${date?.to}`,
    );
  };

  if (!data || !properti || !tenant) {
    return <LoadingDetailRooms />;
  }

  return (
    <div>
      <section className="w-full rounded-md border bg-slate-50 px-5 py-10 md:px-14 lg:px-20">
        <GridCardRooms data={data} />
        <main className="mt-7 flex flex-col justify-between gap-3 lg:flex-row">
          <div className="lg:w-[800px]">
            <div className="border-b pb-5">
              <h1 className="flex items-center gap-1 text-gray-600">
                <IoLocationOutline />
                <p>{properti.location}</p>
              </h1>
              <h2 className="text-3xl font-semibold text-hitam">
                {properti.category} {properti.name} in{" "}
                {properti.location.split(",")[0]}
              </h2>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-btn/20 px-3 text-hitam">
                  {properti.category == "Villa" ? "Villa" : "Hotel"}
                </div>
                <p>by</p>
                <p className="font-medium text-hitam">{tenant.username}</p>
              </div>
            </div>
            <div className="pt-5">
              <h1 className="text-xl font-semibold text-hitam">Deskripsi</h1>
              <div className="min-h-32 border-b text-sm text-gray-600">
                <p>{data.description}</p>
              </div>
              <div className="pt-5">
                <h1 className="text-xl font-semibold text-hitam">Fasilitas</h1>
                <div className="flex gap-3 text-sm text-gray-600">
                  {data.facility.map((item) => {
                    if (item.name === "Wifi") {
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-1"
                        >
                          <FaWifi />
                          <p>Wifi</p>
                        </div>
                      );
                    } else if (item.name === "Single bed") {
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-1"
                        >
                          <MdOutlineBedroomChild />
                          <p>Single bed</p>
                        </div>
                      );
                    } else if (item.name === "Double bed") {
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-1"
                        >
                          <MdOutlineBedroomParent />
                          <p>Double bed</p>
                        </div>
                      );
                    } else if (item.name === "Breakfast") {
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-1"
                        >
                          <MdOutlineFreeBreakfast />
                          <p>Breakfast</p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-1"
                        >
                          <MdOutlineShower />
                          <p>Shower</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 lg:mt-0 lg:w-1/3">
            <div className="sticky top-[100px] rounded-xl border bg-white p-7 shadow-md">
              <p className="text-2xl font-semibold text-hitam">
                {formatRupiah(data.price)}{" "}
                <span className="text-base">/malam</span>
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <CalendarComp
                  date={date}
                  setDate={setDate}
                  onDateChange={handleDateChange}
                  unavailableDates={unavailableDates}
                />
                {date?.from && date?.to && (
                  <div className="py-3 text-gray-600">
                    <h3 className="mb-2 text-xl font-semibold text-hitam">
                      Detail Harga
                    </h3>
                    <div className="flex items-center justify-between">
                      <p>Rooms</p>
                      {formatRupiah(calculateTotalPrice())}
                    </div>
                    <div className="flex items-center justify-between">
                      <p>
                        {Math.round(
                          (date.to.getTime() - date.from.getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        Malam
                      </p>
                      <p>
                        {Math.round(
                          (date.to.getTime() - date.from.getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        x {formatRupiah(data.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p>Biaya Total</p>
                      <p>{formatRupiah(calculateTotalPrice())}</p>
                    </div>
                  </div>
                )}
                <button
                  disabled={date?.from === undefined || date.to === undefined}
                  onClick={handleReservasi}
                  className="rounded-full bg-btn p-3 font-medium text-white transition-all duration-150 hover:bg-btnhover hover:shadow-md disabled:bg-slate-300 disabled:text-gray-100 disabled:shadow-none"
                >
                  Buat reservasi
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default CardRoomDetail;
