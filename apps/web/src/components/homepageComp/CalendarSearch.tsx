"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface CalendarCompProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function CalendarSearch({
  className,
  date,
  setDate
}: CalendarCompProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isActiveModal, setIsActiveModal] = React.useState(false);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsActiveModal(false);
      }
    }

    if (isActiveModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActiveModal]);

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="relative w-full text-sm text-gray-500">
        <button
          id="date"
          onClick={() => setIsActiveModal(!isActiveModal)}
          className={cn(
            "flex w-full items-center justify-start p-2 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </button>

        {isActiveModal && (
          <div
            ref={modalRef}
            className="absolute left-[-150px] z-10 mt-2 w-auto rounded border border-gray-300 bg-white shadow-lg"
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={new Date()}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
            />
          </div>
        )}
      </div>
    </div>
  );
}
