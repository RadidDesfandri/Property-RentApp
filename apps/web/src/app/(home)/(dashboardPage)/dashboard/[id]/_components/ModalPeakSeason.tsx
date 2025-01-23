import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { IoClose } from "react-icons/io5";
import { CalendarPeakSeason } from "./CalendarPeakSeasons";
import { peakSeasons } from "@/libs/fetch/rooms";
import toast from "react-hot-toast";

interface ModalProps {
  isPeakSeasons: boolean;
  setIsPeakSeasons: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const ModalPeakSeason: React.FC<ModalProps> = ({
  isPeakSeasons,
  setIsPeakSeasons,
  id,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<DateRange | undefined>();
  const [persen, setPersen] = useState<number>();
  const [sewa, setSewa] = useState(false);

  const handleSewa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSewa(e.target.checked);
  };

  const handleSubmit = async () => {
    if (!date?.from || !date?.to) {
      toast.error("Pastikan semua input valid");
      return;
    }
    try {
      const payload = {
        startDate: date?.from?.toISOString(),
        endDate: date?.to?.toISOString(),
        priceIncrease: persen,
        unavailable: sewa,
      };
      await peakSeasons(id, payload);
      if (sewa == false) {
        toast.success("Berhasil menaikkan harga");
      } else {
        toast.success("Berhasil mengatur tanggal tidak disewakan");
      }
      setIsPeakSeasons(false);
    } catch (error) {
      console.log("Gagal menyimpan", error);
    }
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsPeakSeasons(false);
      }
    }

    if (isPeakSeasons) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPeakSeasons, setIsPeakSeasons]);

  return (
    <div className="fixed inset-0 z-50 flex h-full items-center justify-center bg-black/20">
      <div
        ref={modalRef}
        className="relative rounded-lg border bg-slate-50 p-5 shadow-md"
      >
        <IoClose
          onClick={() => setIsPeakSeasons(false)}
          className="absolute right-2 top-2 h-6 w-6 cursor-pointer"
        />
        <div className="mt-4">
          <h1 className="w-[400px] text-wrap text-center text-lg font-semibold text-hitam">
            Anda dapat menaikkan harga room/mengatur kapan room tidak disewa
            pada tanggal tertentu
          </h1>
          <div className="mt-5 flex flex-col gap-4">
            <CalendarPeakSeason date={date} setDate={setDate} />
            <label className="flex flex-col text-xs">
              <p className="text-[10px]"><span className="text-red-500">*</span>Hanya dapat pilih salah satu (naik/tidak disewa)</p>
              Kenaikan harga dalam bentuk persen(%)
              <input
                type="number"
                placeholder="%"
                value={persen}
                disabled={sewa == true}
                onChange={(e) => setPersen(Number(e.target.value))}
                className="relative rounded-xl border border-gray-500 bg-transparent px-3 py-3 [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              {persen !== undefined && (
                <p className="absolute bottom-[167px] right-9">%</p>
              )}
            </label>

            <div>
              <p className="text-xs text-wrap w-[380px]">Ketika mencentang ini room tidak akan disewakan pada tanggal yang anda input</p>
              <label className="inline-flex cursor-pointer items-center">
                <input
                  checked={sewa}
                  type="checkbox"
                  onChange={handleSewa}
                  className="peer sr-only"
                  disabled={persen! > 0}
                />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] disabled:cursor-default peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>

            <button
              disabled={date?.from == undefined || date.to == undefined}
              type="submit"
              onClick={handleSubmit}
              className="rounded-xl bg-btn py-2 text-white transition-all duration-200 hover:bg-btn disabled:bg-slate-300 disabled:text-gray-100 disabled:shadow-none"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPeakSeason;
