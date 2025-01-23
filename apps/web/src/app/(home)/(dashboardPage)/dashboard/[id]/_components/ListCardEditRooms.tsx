"use client";

import { getPropertyByid } from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";
import React, { useEffect, useState } from "react";
import FormikEditRoom from "./FormikEditRoom";
import EmptyComp from "@/components/EmptyComp";
import FormikRoom from "../../(createProperty)/create-property/_components/FormikRoom";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";

const ListCardEditRooms = ({ id }: { id: string }) => {
  const [dataBe, setDataBe] = useState<DataProperty>();
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRoomClick = () => {
    setIsActive(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPropertyByid(id);
        const property = res.data.property;
        setDataBe(property);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="mb-10 flex w-full flex-col gap-7 pt-3">
      <p
        onClick={() => setIsActive(!isActive)}
        className="w-fit cursor-pointer text-xl font-medium text-hitam"
      >
        {isActive ? (
          <div className="flex items-center gap-1">
            <IoMdArrowBack />
            <p>Kembali</p>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <IoCreateOutline />
            Buat rooms
          </div>
        )}
      </p>
      {isActive ? (
        <FormikRoom onRoomClick={onRoomClick} id={id} />
      ) : (
        <div>
          {dataBe?.Room.map((data) => {
            return (
              <div key={data.id}>
                <FormikEditRoom data={data} />
              </div>
            );
          })}
        </div>
      )}
      {dataBe?.Room.length === 0 && (
        <div>
          {isActive ? null : (
            <EmptyComp
              text="Anda belum memiliki room, buat sekarang"
              width="w-[200px]"
              height="h-[200px]"
              sizetext="text-2xl"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ListCardEditRooms;
