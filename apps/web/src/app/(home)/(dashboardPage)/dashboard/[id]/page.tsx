"use client"

import React, { useEffect, useState } from "react";
import FormikPropertyEdit from "./_components/FormikProperty";
import FormikEditRoom from "./_components/FormikEditRoom";
import { DataProperty } from "@/types/property";
import { getPropertyByid } from "@/libs/fetch/property";
import ListCardEditRooms from "./_components/ListCardEditRooms";

const PropertyEdit = ({ params }: { params: { id: string } }) => {

  
  return (
    <div>
      <h1 className="text-xl font-semibold text-hitam lg:text-2xl">
        Data Property
      </h1>
      <h4 className="text-sm font-light text-gray-500">
        Edit informasi dan aktivitas tentang properti anda
      </h4>
      <FormikPropertyEdit id={params.id} />
      <h1 className="text-xl font-semibold text-hitam lg:text-2xl">
        Data Rooms
      </h1>
      <h4 className="text-sm font-light text-gray-500">
        Edit informasi dan aktivitas tentang room anda
      </h4>
      <ListCardEditRooms id={params.id}/>
    </div>
  );
};

export default PropertyEdit;
