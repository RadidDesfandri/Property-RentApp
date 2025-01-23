import { RoomData } from "@/types/property";
import { formatRupiah } from "@/utils/formataRupiah";
import Image from "next/image";
import { FaRestroom, FaWifi } from "react-icons/fa6";
import {
  MdAttachMoney,
  MdMergeType,
  MdOutlineBedroomChild,
  MdOutlineBedroomParent,
  MdOutlineDescription,
  MdOutlineDiscount,
  MdOutlineFreeBreakfast,
  MdOutlineShower,
} from "react-icons/md";

const CardRoomReview = ({ data }: { data: RoomData }) => {
  return (
    <div className="flex h-[213px] w-full gap-2 overflow-hidden rounded-lg bg-slate-50/50 shadow-lg">
      <Image
        src={"/dummy/kamar.jpg"}
        alt="Image room"
        width={300}
        height={300}
        className="h-[213px] object-cover"
      />

      <main className="flex w-full px-3 py-2">
        <section className="flex w-1/2 flex-col gap-3">
          <div>
            <h1 className="flex items-center text-lg font-medium">
              <MdMergeType className="h-5 w-5" /> Tipe Kamar
            </h1>
            <p className="text-sm text-gray-500">{data.type}</p>
          </div>
          <div>
            <h1 className="flex items-center gap-1 text-lg font-medium">
              <FaRestroom /> Kapasitas kamar
            </h1>
            <p className="text-sm text-gray-500">{data.capacity} Orang</p>
          </div>
          <div>
            <h1 className="flex items-center gap-1 text-lg font-medium">
              <MdOutlineBedroomChild /> Fasilitas kamar
            </h1>
            <main className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MdOutlineBedroomChild />
                <p>Single bed</p>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineBedroomParent />
                <p>Double bed</p>
              </div>
              <div className="flex items-center gap-1">
                <FaWifi />
                <p>Wifi</p>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineFreeBreakfast />
                <p>Breakfast</p>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineShower />
                <p>Shower</p>
              </div>
            </main>
          </div>
        </section>

        <section className="flex w-1/2 flex-col gap-3">
          <div>
            <h1 className="flex items-center gap-1 text-lg font-medium">
              <MdAttachMoney /> Harga normal
            </h1>
            <p className="text-sm text-gray-500">{formatRupiah(data.price)}</p>
          </div>
          <div>
            <h1 className="flex items-center gap-1 text-lg font-medium">
              <MdOutlineDiscount /> Harga diskon
            </h1>
            <p className="text-sm text-gray-500">
              {formatRupiah(data.pricediscount)}
            </p>
          </div>
          <div>
            <h1 className="flex items-center gap-1 text-lg font-medium">
              <MdOutlineDescription /> Deskripsi kamar
            </h1>
            <p className="line-clamp-2 text-sm text-gray-500">
              {data.description}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CardRoomReview;
