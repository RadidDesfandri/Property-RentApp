import React, { useEffect, useState } from "react";
import CardPembelian from "./CardPembelian";
import { ButtonComp } from "@/components/ButtonComp";
import { getPastReservation } from "@/libs/fetch/reservation";
import { IReservationById } from "@/types/getReservationId";
import EmptyComp from "@/components/EmptyComp";

const ListCardPembelian = () => {
  const [data, setData] = useState<IReservationById[]>();
  useEffect(() => {
    const getData = async () => {
      const res = await getPastReservation();
      setData(res.data);
    };
    getData();
  }, []);

  return (
    <div className="mt-5 w-full rounded-md border bg-slate-50 shadow-lg">
      <div className="grid grid-cols-1 place-items-center gap-5 px-1 py-5 md:gap-4 lg:gap-4 lg:px-3">
        {data?.length == 0 ? (
          <EmptyComp
            text="Belum ada reservasi"
            sizetext="text-xl"
            width="500px"
            height="500px"
          />
        ) : (
          data?.map((item, idx) => {
            return (
              <div key={idx} className="w-full">
                <CardPembelian
                  startDate={item.startDate}
                  endDate={item.endDate}
                  id={item.id}
                  property={item.room.property.name}
                  location={item.room.property.location}
                  status={item.statusRes}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListCardPembelian;
