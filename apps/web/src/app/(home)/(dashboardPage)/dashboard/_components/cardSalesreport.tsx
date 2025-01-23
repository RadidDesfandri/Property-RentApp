"use client";

import Calendar from "react-awesome-calendar";
import React, { useEffect, useState } from "react";
import { getReportCalendar } from "@/libs/fetch/report";
import dynamic from "next/dynamic";

interface IData {
  id: number;
  color: string;
  from: string;
  to: string; 
  title: string;
}

interface AwesomeCalendarProps {
  events: IData[];
}
const AwesomeCalendar = dynamic(() =>  import("react-awesome-calendar"), {
ssr: false,
});
export default function CardSalesreport() {
  const [data, setData] = useState<IData[]>([]);
  useEffect(() => {
    const getDataCalendar = async () => {
      const res = await getReportCalendar();
      setData(res);
    };
    getDataCalendar();
  }, []);

  return (
    <div className="my-4 rounded-xl bg-white p-4">
      <AwesomeCalendar events={data}/>
    </div>
  );
}
