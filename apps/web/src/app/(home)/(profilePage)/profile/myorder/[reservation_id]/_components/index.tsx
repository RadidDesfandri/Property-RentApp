"use client";
import Image from "next/image";
import ReservationDetailBody from "./detail";
import SummaryPayment from "./summary";
import PostReview from "./postReview";
import { useEffect, useState } from "react";
import { getTransactionById } from "@/libs/fetch/transaction";
import { useParams } from "next/navigation";
import { IReservationById } from "@/types/getReservationId";
import { getReviewByReservation } from "@/libs/fetch/review";
import { IGetReviewReservation } from "@/types/review";
import { navigate } from "@/libs/server";
export default function MyReservationDetail() {
  const [data, setData] = useState<IReservationById>();
  const [review, setReview] = useState<IGetReviewReservation>();
  const params = useParams();
  const id = params.reservation_id;
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getTransactionById(id as string);
        setData(data.data);
      };

      getData();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    const getReview = async () => {
      const review = await getReviewByReservation(id as string);
      setReview(review.data);
    };
    getReview();
  }, [id]);
  const startDate: any = new Date(data?.startDate!);
  const endDate: any = new Date(data?.endDate!);
  const millisecondsPerNight = 24 * 60 * 60 * 1000;
  const nights = Math.round((endDate - startDate) / millisecondsPerNight);

  return (
    <div className="rounded-xl bg-white p-4 lg:px-6 lg:py-10">
      <h1 className="mb-4 text-2xl font-semibold">Detail Pemesanan</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="mt-2 flex flex-col gap-4">
          <Image
            src={
              data?.room.property.thumbnail
                ? `${data?.room.property.thumbnail}`
                : "/dummy/kamar.jpg"
            }
            width={300}
            height={300}
            alt="property image"
            className="rounded-lg"
          />
          <button
            onClick={() => {
              navigate(`/detailproperty/${data?.room.property.id}`);
            }}
            className="max-w-[300px] rounded-lg border-2 px-4 py-3 text-sm font-[800] text-black duration-300 hover:bg-white hover:text-btn hover:shadow-md"
          >
            Lihat Detai Property
          </button>
        </div>
        <ReservationDetailBody
          username={data?.user.username as string}
          start={data?.startDate as string}
          end={data?.endDate as string}
          id={data?.id as string}
          category={data?.room.property.category as string}
          type={data?.room.type as string}
          method={data?.method as string}
          created={data?.createdAt as string}
          location={data?.room.property.location as string}
          prop={data?.room.property.name as string}
          status={data?.statusRes as string}
        />
        <div className="flex flex-col items-end gap-2 lg:w-[30%]">
          <div className={`${review ? "hidden" : "block"}`}>
            <PostReview />
          </div>
          <SummaryPayment
            price={data?.room.price as number}
            total={data?.price as number}
            night={nights}
          />
        </div>
      </div>
    </div>
  );
}
