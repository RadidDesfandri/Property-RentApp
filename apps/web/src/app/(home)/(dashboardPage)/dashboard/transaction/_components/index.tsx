"use client";
import { useFormik } from "formik";
import TableTransaction from "./tableTransaction";
import DropDownStatus from "./dropDown";
import { useEffect, useState } from "react";
import { getListTransaction } from "@/libs/fetch/transaction";
import { IReservationList } from "@/types/transaksiTenant";
import { MdRefresh } from "react-icons/md";
import { navigate } from "@/libs/server";
import { useSearchParams } from "next/navigation";
import EmptyComp from "@/components/EmptyComp";

export default function TransactionList() {
  const [transaction, setTransaction] = useState<IReservationList[]>([]);
  const params = useSearchParams();
  const query = params.get("status");
  useEffect(() => {
    const listData = async () => {
      try {
        const res = await getListTransaction(query as string);
        setTransaction(res.data);
      } catch (error) {
        return error;
      }
    };
    listData();
  }, [query]);
  return (
    <div className="rounded-xl bg-white p-4 shadow-md lg:min-h-[600px]">
      <div className="flex flex-col justify-between border-b-[3px] bg-white pb-2 lg:flex-row lg:pb-6">
        <div className="flex w-full justify-between pb-4">
          <h1 className="text-2xl font-bold">Transaksi</h1>
          <button
            onClick={() => navigate(`/dashboard/transaction`)}
            className="flex items-center gap-4 rounded-md bg-btn px-2 py-1 font-normal text-white hover:bg-btnhover"
          >
            <p className="hidden lg:block">refresh</p>
            <MdRefresh className="text-white" />
          </button>
        </div>
        <div></div>
      </div>
      <table className="mt-4 lg:w-full">
        <thead className="pb-5">
          <tr className="border-b-[3px] text-start text-btn">
            <th className="pb-3 text-start">Booking Id</th>
            <th className="hidden pb-3 text-start lg:table-cell">Pemesan</th>
            <th className="hidden pb-3 text-start lg:table-cell">Property</th>
            <th className="hidden pb-3 text-start lg:table-cell">Room</th>
            <th className="pb-3 text-center lg:text-start">
              <DropDownStatus />
            </th>
            <th className="hidden pb-3 text-start lg:table-cell">
              Tanggal Reservasi
            </th>
          </tr>
        </thead>
        <tbody className="h-max">
          {transaction.length == 0 ? (
            <div className="flex w-full justify-center">
              <EmptyComp
                text="Tidak ada list transaksi"
                sizetext="text-2xl"
                width="500px"
                height="500px"
              />
            </div>
          ) : (
            transaction.map((item, idx) => {
              return (
                <TableTransaction
                  name={item.user.username}
                  status={item.statusRes}
                  property={item.room.property.name}
                  room={item.room.type}
                  id={item.id}
                  createdAt={item.createdAt}
                  key={idx}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
