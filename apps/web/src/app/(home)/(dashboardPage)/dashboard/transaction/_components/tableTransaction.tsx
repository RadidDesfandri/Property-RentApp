import { navigate } from "@/libs/server";
import { ITransaction } from "@/types/transaksiTenant";
import { formatDateReservation } from "@/utils/formatDate";

export default function TableTransaction({
  status,
  property,
  name,
  room,
  createdAt,
  id,
}: ITransaction) {
  const date = new Date(createdAt as string);
  const indoDate = formatDateReservation(date);
  return (
    <tr className="border-b-2 text-sm">
      <td className=" py-4 text-sm w-[40%] lg:w-[30%]">{String(id)}</td>
      <td className="hidden py-4 lg:table-cell">{name}</td>
      <td className="hidden py-4 lg:table-cell max-w-[200px] text-sm px-2">{property}</td>
      <td className="hidden py-4 lg:table-cell">{room}</td>
      <td className="py-4">
        <p
          className={`${status == "CANCEL" ? "bg-red-400/60 text-red-600" : status == "PAID" ? "bg-green-400/60 text-green-600" : "bg-orange-300/60 text-orange-600"} mx-1 rounded-full px-1 py-1 text-center text-[12px] font-semibold lg:w-[100px] lg:px-4`}
        >
          {status == "PENDING"
            ? "Pembayaran"
            : status == "CANCEL"
              ? "Dibatalkan"
              : status == "PAID"
                ? "Dibayar"
                : "Pengesahan"}
        </p>
      </td>
      <td className="hidden py-4 lg:table-cell">{indoDate}</td>
      <td>
        <button
          onClick={() => {
            navigate(`/dashboard/transaction/${id}`);
          }}
          className="rounded-lg border-2 border-btn px-2 py-1 text-center text-btn duration-150 hover:bg-btn hover:text-white"
        >
          Detail
        </button>
      </td>
    </tr>
  );
}
