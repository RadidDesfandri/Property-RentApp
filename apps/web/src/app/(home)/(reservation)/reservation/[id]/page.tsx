import PriceDetail from "../_components/priceDetail";
import ReservationDetail from "../_components";

import { IoChevronBackOutline } from "react-icons/io5";
import { getRoomById } from "@/libs/fetch/property";
import { getRoomReservation } from "@/libs/fetch/reservation";

export default async function Reservation({ params }: any) {
  const roomType = "Deluxe";
  const location = "Bandung";
  const property = "Hotel Layangan";
  const tenant = "Kurapika";

  const { id } = params;
  const data = await getRoomReservation(id);

  const price: number = data.price;
  const total = price - price * 0.15;
  return (
    <div className="flex flex-col items-center mb-4 lg:pt-10">
      <div className="flex flex-col gap-5 px-3 lg:pb-14 pt-2 lg:flex-row-reverse lg:justify-center lg:gap-20 lg:pt-10">
        <PriceDetail
          roomType={data.type}
          location={data.property.location}
          price={price}
          propertyName={data.property.name}
          tenantName={tenant}
        />
        <ReservationDetail price={total} />
        <IoChevronBackOutline className="hidden size-10 rounded-full p-2 hover:bg-abu lg:block" />
      </div>
    </div>
  );
}
