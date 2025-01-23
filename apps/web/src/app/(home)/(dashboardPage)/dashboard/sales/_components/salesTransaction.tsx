"use client";
import * as React from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { getReportTransaction } from "@/libs/fetch/report";
export default function SalesTransaction() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getReportTransaction();
      setData(res);
    };
    getData();
  }, []);

  data.map((item, idx) => (item.id = idx + 1));
  console.log(data);
  const rows: GridRowsProp = data;
  const columns: any[] = [
    { field: "id", hidden: true, width: 100 },
    { field: "reservationId", headerName: "Booking ID", width: 100 },
    { field: "reservationDate", headerName: "Tanggal Pemesanan", width: 250 },
    { field: "user", headerName: "User", width: 100 },
    { field: "amount", headerName: "Pendapatan (IDR)", width: 300 },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Data Penjualan Berdasarkan Transaksi
      </h1>
      <div className="flex flex-col gap-4 bg-white">
        <div className="h-max w-max">
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
}
