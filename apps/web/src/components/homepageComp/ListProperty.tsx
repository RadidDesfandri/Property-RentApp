"use client";

import React, { useEffect, useState } from "react";
import SearchLocation from "./SearchLocation";
import CardPropertyHome from "./CardPropertyHome";
import { getAllProperty } from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";

export const revalidate = 0;

const ListProperty = () => {
  const [data, setData] = useState<DataProperty[]>([]);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await getAllProperty();
        const data: DataProperty[] = res.data.property;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  },[]);

  return (
    <div className="w-full bg-latar/40 py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SearchLocation />
        <section className="mt-14">
          <div className="mb-2 text-2xl font-semibold text-hitam md:text-4xl">
            List Properti
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => {
              return <CardPropertyHome key={item.id} data={item} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListProperty;
