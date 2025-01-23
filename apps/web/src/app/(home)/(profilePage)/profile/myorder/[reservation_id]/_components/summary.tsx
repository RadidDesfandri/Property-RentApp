import { formatRupiah } from "@/utils/formataRupiah";

interface IProps {
  price: number;
  total: number;
  night: number;
}
export default function SummaryPayment({ price, total, night }: IProps) {
  const pajak = price * night * 0.15;
  return (
    <div className="flex w-full flex-col justify-around rounded-lg bg-slate-200/20 p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Rincian Pembayaran</h2>
      <table className="min-h-[200px] w-full text-lg">
        <tbody>
          <tr className="py-2">
            <td className="mr-5">Harga Kamar</td>
            <td className="text-end">{formatRupiah(price)}</td>
          </tr>
          <tr className="text-[13px] text-gray-500">
            <td>{night} malam</td>
            <td className="text-end">
              {night}x {formatRupiah(price)}
            </td>
          </tr>
          <tr className="border-b">
            <td>Pajak 15%</td>
            <td className="text-end"> {formatRupiah(pajak)}</td>
          </tr>

          <tr>
            <td className="font-semibold">Total</td>
            <td className="text-end font-semibold">{formatRupiah(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
