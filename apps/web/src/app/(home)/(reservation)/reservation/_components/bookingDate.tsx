"use client";
import { formatDateId } from "@/utils/formatDate";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-day-picker";
import { getDateDisable } from "@/libs/fetch/reservation";
interface IDate {
  startDate: string;
  endDate: string;
}
const BookingDate: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const query = useSearchParams();
  const checkin = query.get("checkin");
  const checkout = query.get("checkout");
  const today = new Date();
  const [disableDate, setDisableDate] = useState<IDate[]>();
  useEffect(() => {
    const getDateRes = async () => {
      const res = await getDateDisable(id as string);
      setDisableDate(res.data);
    };
    getDateRes();
  }, [id]);
  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
  };
  const onClick = () => {
    if (date) {
      const query = {
        checkin: date?.from,
        checkout: date?.to,
      };
      router.push(
        `/reservation/${id}?${query.checkin ? `checkin=${query.checkin}` : ``}&${query.checkout ? `checkout=${query.checkout}` : ``}`,
      );
    }
    setOpen(false);
  };

  const disabled = disableDate?.flatMap(({ startDate, endDate }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Menghasilkan array tanggal dari start hingga end
    const dates = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold">Tanggal Check-in</p>
            <p>{formatDateId(checkin)}</p>
          </div>
          <div>
            <p className="font-semibold">Tanggal Check-out</p>
            <p>{formatDateId(checkout)}</p>
          </div>
        </div>
        <div className="relative flex flex-col items-end">
          <button
            onClick={() => setOpen(!open)}
            className={`${open ? "hidden" : "block"} h-max w-max items-center rounded-lg text-end text-lg font-medium text-gray-500 underline duration-300 hover:text-black`}
          >
            Edit
          </button>
          <button
            onClick={onClick}
            className={`${open ? "block" : "hidden"} h-max w-max items-center rounded-lg text-end text-lg font-medium text-gray-500 underline duration-300 hover:text-black`}
          >
            Oke
          </button>
          <div
            className={`${open ? "absolute" : "hidden"} top-10 z-40 rounded-xl bg-white shadow-md transition-all duration-300 ease-in-out`}
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={new Date()}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
              fromDate={today} // Disable past dates
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingDate;
