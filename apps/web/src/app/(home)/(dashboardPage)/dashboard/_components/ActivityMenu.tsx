"use client";

import {
  getPropertyByTenantId,
  getPropertyDraft,
  getPropertyPublish,
} from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";
import React, { useEffect, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdPublishedWithChanges } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";

const ActivityMenu = ({
  cardId,
  setCardId,
}: {
  cardId: number;
  setCardId: (id: number) => void;
}) => {
  const [totalAll, setData] = useState<DataProperty[]>();
  const [totalDraft, setDataDraft] = useState<DataProperty[]>();
  const [totalPublish, setDataPublish] = useState<DataProperty[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPropertyByTenantId();
        setData(res.data.property);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataPublish = async () => {
      try {
        const res = await getPropertyPublish();
        setDataPublish(res.data.property);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataPublish();
  }, []);

  useEffect(() => {
    const fetchDataDraft = async () => {
      const res = await getPropertyDraft();
      setDataDraft(res.data.property);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataDraft();
  }, []);

  const card = [
    {
      id: 1,
      name: "Total Properti",
      icon: RiHotelLine,
      total: totalAll?.length,
    },
    {
      id: 2,
      name: "Total Publish",
      icon: MdPublishedWithChanges,
      total: totalPublish?.length,
    },
    {
      id: 3,
      name: "Total Draft",
      icon: IoCloudDownloadOutline,
      total: totalDraft?.length,
    },
  ];

  return (
    <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {card.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => setCardId(item.id)}
            className={`flex h-[120px] w-full cursor-pointer flex-col justify-between rounded-lg p-4 transition-all duration-300 ease-in-out ${cardId === item.id ? "scale-105 border bg-slate-50 shadow-md" : "border bg-slate-50/50 shadow-sm"} `}
          >
            <div
              className={`flex items-center gap-2 ${cardId === item.id ? "text-gray-800" : "text-gray-500"}`}
            >
              <item.icon className="h-8 w-8 rounded-full bg-btn/60 p-1" />
              <p className="font-medium">{item.name}</p>
            </div>
            <div
              className={`flex items-end justify-between ${cardId === item.id ? "text-gray-800" : "text-gray-500"} `}
            >
              <p className="text-3xl">{item.total}</p>
              <p className="text-xs">Akhir bulan total {item.total}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ActivityMenu;
