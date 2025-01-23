"use client";

import { getRoomById } from "@/libs/fetch/property";
import CardCreateRoom from "./CardCreateRoom";
import { useEffect, useState } from "react";
import { RoomData } from "@/types/property";
import NotFoundComp from "@/components/NotFoundComp";
import { navigate } from "@/libs/server";
import { useDispatch } from "react-redux";
import { nextStep } from "@/Redux/slices/stepSlice";
import { ButtonComp } from "@/components/ButtonComp";

const ListCardRoom = ({ id }: { id: string }) => {
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const res = await getRoomById(id);
        setRoomData(res.data.room);
      } catch (err) {
        console.log("Fetch gagal", err);
      }
    };

    fetchRoomData();
  }, [id]);
  
  const handleNext = () => {
    setLoading(true);
    try {
      navigate(`/dashboard/create-property/review/${id}`);
      dispatch(nextStep());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-5 grid grid-cols-1 place-items-center gap-3 px-2 py-2">
      {roomData.map((item) => {
        return <CardCreateRoom key={item.id} data={item} />;
      })}
      {roomData.length === 0 && (
        <div>
          <NotFoundComp text1="BELUM ADA ROOM YANG DIBUAT" sizetext1="lg" />
        </div>
      )}
      <div className="mt-5 flex w-full justify-end">
        <div onClick={handleNext} className="w-fit">
          <ButtonComp
            disable={roomData.length === 0 || loading}
            text={loading ? "Loading..." : "Selanjutnya"}
          />
        </div>
      </div>
    </div>
  );
};

export default ListCardRoom;
