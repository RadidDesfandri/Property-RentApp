"use client";
import PriceDetail from "../_components/priceDetail";
import ReservationDetail from "../_components";
import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRoomsById } from "@/libs/fetch/rooms";
import LoadingDetailRooms from "@/app/(home)/(withNavbar)/search/_components/LoadingDetailRooms";
export default function Reservation({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>();
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkin");
  const checkOut = searchParams.get("checkout");
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const query = { checkIn, checkOut };
        const res = await getRoomsById(params.id, query);
        const roomData = res.data.room;
        setData(roomData);
      } catch (error) {
        console.error("Error fetching room data", error);
      }
    };
    fetchRoomData();
  }, [params.id, checkIn, checkOut]);

  const price = data?.price;
  const tenant = data?.tenant.username;
  if (!data || !tenant) {
    return <LoadingDetailRooms />;
  }
  return (
    <div className="mb-4 flex flex-col items-center lg:pt-10">
      <div className="flex flex-col gap-5 px-3 pt-2 lg:flex-row-reverse lg:justify-center lg:gap-20 lg:pb-14 lg:pt-10">
        <PriceDetail
          roomType={data.type}
          location={data.property.location}
          price={price}
          propertyName={data.property.name}
          tenantName={tenant}
          image={data.property.thumbnail}
        />
        <ReservationDetail price={price} capacity={data.capacity} />
        <Link href={`/search/room/${data.id}`}>
          <IoChevronBackOutline className="hidden size-10 rounded-full p-2 hover:bg-abu lg:block" />
        </Link>
      </div>
    </div>
  );
}
