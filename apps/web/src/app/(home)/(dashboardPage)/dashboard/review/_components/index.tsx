"use client";
import { FaStar } from "react-icons/fa";
import ReviewList from "./reviewList";
import { useEffect, useState } from "react";
import { getReviewByTenant } from "@/libs/fetch/review";

import { IReviewList } from "@/types/review";
export default function MainReview() {
  const [dataReview, setDataReview] = useState<IReviewList[]>();
  const users = dataReview?.map((item) => item.user.username);
  const uniqueUsers = new Set(users);
  const totalUniqueUsers = uniqueUsers.size;
  console.log(users);
  
  useEffect(() => {
    try {
      const getReview = async () => {
        const res = await getReviewByTenant();
        setDataReview(res.data);
      };
      getReview();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const dataRating = dataReview?.map((item) => {
    let x: number = 0;
    return (x += +item.ratings);
  });
  let average = 0;
  dataRating?.length != 0
    ? (average = dataRating?.reduce((a, b) => a + b)! / dataRating?.length!)
    : (average = 0);

  return (
    <div className="">
      <h1 className="text-3xl font-semibold">Ulasan Customers</h1>
      <div className="grid grid-cols-2 border-b-2 py-4 lg:grid-cols-3">
        <div className="mt-4 flex flex-col gap-2 pr-4 lg:w-[250px]">
          <h3 className="mb-2 text-xl">Jumlah Ulasan</h3>
          <p className="text-4xl font-medium">{dataReview?.length}</p>
          <p className="text-sm font-medium text-gray-500/70">
            Penilaian yang diterima pada tahun ini
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 px-6 lg:border-x-2">
          <h3 className="mb-2 text-xl">Rata-rata Rating</h3>
          <div className="flex items-center gap-2 text-4xl">
            <FaStar className="text-3xl text-yellow-400" />
            <p className="font-medium">{average}/5</p>
          </div>
          <p className="text-sm font-medium text-gray-500/70">
            Rata-rata rating tahun ini
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 lg:w-[250px] lg:px-6">
          <h3 className="mb-2 text-xl">Pemberi Ulasan</h3>

          <p className="text-4xl font-medium">{totalUniqueUsers}</p>
          <p className="text-sm font-medium text-gray-500/70">
            Jumlah user yang memberikan ulasan
          </p>
        </div>
      </div>
      {dataReview?.map((item, idx) => {
        return (
          <div key={idx}>
            <ReviewList
              username={item.user.username}
              propName={item.room.property.name}
              content={item.content}
              rating={item.ratings}
              avatar={item.user.avatar}
              id={item.id}
              feedback={item.feedBack || null}
            />
          </div>
        );
      })}
    </div>
  );
}
