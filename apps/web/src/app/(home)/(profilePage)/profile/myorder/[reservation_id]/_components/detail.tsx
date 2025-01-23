import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { formatDateReservation } from "@/utils/formatDate";
interface IProps {
  start: string;
  end: string;
  username: string;
  category: string;
  type: string;
  method: string;
  id: string;
  created: string;
  prop: string;
  location: string;
  status: string;
}
export default function ReservationDetailBody({
  start,
  end,
  username,
  category,
  type,
  method,
  id,
  created,
  location,
  prop,
  status,
}: IProps) {
  const components = [
    { keywords: "Check in", text: formatDateReservation(new Date(start)) },
    { keywords: "Check out", text: formatDateReservation(new Date(end)) },
    { keywords: "Pemesan", text: username },
    { keywords: "Type", text: category },
    { keywords: "Tamu", text: "2 orang" },
    { keywords: "Kamar", text: type },
    {
      keywords: "Pembayaran",
      text: method == "TF" ? "Transfer Manual" : "Otomatis",
    },
  ];
  return (
    <div className={`flex flex-col gap-2 lg:w-[40%]`}>
      <div className="w-fulll flex flex-col">
        <div className="flex flex-col gap-2 text-sm text-orange-500 lg:flex-row lg:items-center">
          <div className="flex">
            <FaCalendarAlt />
            <p>Dipesan tanggal - </p>
          </div>
          <p>{formatDateReservation(new Date(created))}</p>
        </div>

        <div className="">
          <div className="flex items-center gap-1">
            <p className="text-2xl">
              {category} {prop}
            </p>
          </div>
          <div className="flex items-center gap-1 font-bold text-btn">
            <FaLocationDot />
            <p className="">{location}</p>
          </div>
          <p className="mb-4 text-xs font-semibold text-gray-500">
            Booking ID : {id}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {components.map((item, idx) => {
          return (
            <div key={idx} className={`text-base`}>
              <p className="font-semibold">{item.keywords}</p>
              <p>{item.text}</p>
            </div>
          );
        })}
        <div>
          <p className="font-semibold">Status Pembayaran</p>
          <p
            className={`text-wrap text-xs lg:w-max -translate-x-1 rounded-full px-2 py-1 text-center lg:text-sm font-bold ${status == "PAID" ? "bg-green-400/20 text-green-600" : status == "CANCEL" ? "bg-red-300/20 text-red-500" : "bg-slate-300/30 text-gray-600"} `}
          >
            {status == "PAID"
              ? "berhasil"
              : status == "CANCEL"
                ? "dibatalkan"
                : status == "PENDING"
                  ? "Menunggu Pembayaran"
                  : "Menunggu Konfirmasi"}
          </p>
        </div>
      </div>
    </div>
  );
}
