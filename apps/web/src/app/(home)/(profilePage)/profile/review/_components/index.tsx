"use client";
import Image from "next/image";
import { getReviewByUser } from "@/libs/fetch/review";
import { IGetReviewsUser } from "@/types/review";
import { useEffect, useState } from "react";
import { formatDateReservation } from "@/utils/formatDate";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import EmptyComp from "@/components/EmptyComp";
export default function ReviewProfil() {
  const [reviews, setReviews] = useState<IGetReviewsUser[]>([]);
  useEffect(() => {
    const getReviews = async () => {
      const res = await getReviewByUser();
      setReviews(res.data);
    };
    getReviews();
  }, []);
  return (
    <div className="">
      <h1 className="mb-6 text-3xl font-semibold">Ulasan Anda</h1>
      <div className="flex flex-col gap-2">
        {reviews ? (
          reviews.length == 0 ? (
            <EmptyComp
              text="Anda belum memberikan ulasan"
              sizetext="text-2xl"
              width="500px"
              height="500px"
            />
          ) : (
            reviews?.map((item, idx) => {
              return (
                <div key={idx} className="border-b-2 py-4">
                  <div className="flex flex-col justify-between gap-2 py-4 lg:flex-row">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2 lg:flex-row">
                        <Image
                          src={
                            item.room.property.thumbnail || "/dummy/kamar.jpg"
                          }
                          alt="property img"
                          width={200}
                          height={200}
                          className="rounded-xl object-cover lg:w-[150px]"
                        />
                        <div>
                          <p className="font-semibold">
                            {item.room.property.name}
                          </p>
                          <p className="text-sm font-semibold">
                            {item.room.type}
                          </p>
                          <div className="flex items-center text-btn">
                            <FaLocationDot />
                            <p className="text-sm font-semibold">
                              {item.room.property.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-orange-500">
                        <FaCalendarAlt />
                        <p className="">
                          {formatDateReservation(
                            new Date(item.reservation.startDate),
                          )}{" "}
                          -{" "}
                          {formatDateReservation(
                            new Date(item.reservation.endDate),
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-xl border p-4 lg:w-[65%]">
                      <div className="flex items-center gap-2 font-sans text-lg">
                        <FaStar className="text-yellow-400" />
                        <p>{item.ratings}/5</p>
                      </div>
                      <p>{item.content}</p>
                    </div>
                  </div>
                  <div
                    className={`${item.feedBack ? "block" : "hidden"} flex flex-col gap-2 rounded-xl bg-latar p-4 lg:w-[60%]`}
                  >
                    <div className="flex gap-2">
                      <Image
                        src={
                          item.room.property.tenant.avatar ||
                          "/dummy/profilDummy.jpg"
                        }
                        alt="property img"
                        width={200}
                        height={200}
                        className="h-[50px] w-[50px] rounded-full object-cover"
                      />
                      <div>
                        <p>Dari :</p>
                        <p className="font-semibold">
                          {item.room.property.tenant.username}
                        </p>
                      </div>
                    </div>
                    <p className="">{item.feedBack}</p>
                  </div>
                </div>
              );
            })
          )
        ) : (
          <EmptyComp
            text="Anda belum memberikan ulasan"
            sizetext="text-2xl"
            width="500px"
            height="500px"
          />
        )}
      </div>
    </div>
  );
}
