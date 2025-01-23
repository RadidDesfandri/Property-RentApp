import React from "react";
import CardRoomDetail from "../../_components/CardRoomDetail";

const DetailRooms = ({ params }: { params: { id: string } }) => {
  return (
    <div className="bg-btnhover pt-20">
      <CardRoomDetail id={params.id} />
    </div>
  );
};

export default DetailRooms;
