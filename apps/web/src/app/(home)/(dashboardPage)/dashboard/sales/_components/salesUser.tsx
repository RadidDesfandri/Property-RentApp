"use client";
import * as React from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { getReportSalesUser } from "@/libs/fetch/report";
export default function SalesUser() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getReportSalesUser();
      setData(res);
    };
    getData();
  }, []);
  data.map((item, idx) => (item.id = idx + 1));
  const rows: GridRowsProp = data;
  const columns: any[] = [
    { field: "id", hidden: true, width: 100 },
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "username", headerName: "User", width: 250 },
    { field: "totalReservation", headerName: "Reservasi", width: 100 },
    { field: "totalAmount", headerName: "Pendapatan (IDR)", width: 300 },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Data Penjualan Berdasarkan User
      </h1>
      <div className="flex flex-col gap-4 bg-white">
        <div className="h-max w-max">
          <DataGrid rows={rows} columns={columns} />
        </div>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: data.map((item) => item.username),
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
          margin={{ left: 100, top: 10, right: 0 }}
        />
      </div>
    </div>
  );
}
