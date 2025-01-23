"use client";
import * as React from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import { getReportSalesProperty } from "@/libs/fetch/report";
export default function SalesProperty() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getReportSalesProperty();
      setData(res);
    };
    getData();
  }, []);
  data.map((item, idx) => (item.id = idx + 1));
  const rows: GridRowsProp = data;
  const columns: any[] = [
    { field: "id", hidden: true, width: 100 },
    { field: "propertyId", headerName: "Property ID", width: 300 },
    { field: "propertyName", headerName: "Property", width: 400 },
    { field: "totalReservation", headerName: "Reservasi", width: 100 },
    { field: "totalAmount", headerName: "Pendapatan (IDR)", width: 300 },
  ];
  return (
    <div className="">
      <h1 className="my-4 font-semibold text-2xl">Laporan Penjualan Berdasarkan Property</h1>
      <div className="flex flex-col gap-4 bg-white">
        <div className="h-max w-full">
          <DataGrid autoHeight rows={rows} columns={columns} />
        </div>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: data.map((item) => item.propertyName),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: data.map((item) => item.totalAmount),
            },
          ]}         
          width={600}
          height={400}
          margin={{ left: 100, top: 10, right: 0 }} />
      </div>
    </div>
  );
}
