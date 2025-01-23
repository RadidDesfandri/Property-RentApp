"use client";
import { Rating } from "@smastrom/react-rating";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useParams } from "next/navigation";
import { postReview } from "@/libs/fetch/review";
import * as Yup from "yup";
import toast from "react-hot-toast";
export default function PostReview() {
  const [rating, setRating] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ratingString = String(rating);
  const params = useParams();
  const reservation_id = params.reservation_id as string;
  const validationSchema = Yup.object().shape({
    review: Yup.string()
      .min(10, "Ulasan harus terdiri dari setidaknya 10 karakter.")
      .required("Ulasan tidak boleh kosong."),
  });
  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const review = values.review;
        const payload = { content: review, ratings: ratingString };
        const data: any = await postReview(reservation_id, payload);
        if (data?.response?.data?.status == "ERROR")
          throw data?.response?.data?.message;

        setIsSubmitted(true);
        formik.setValues({ review: "" });
        setRating(1);
      } catch (error) {
        typeof error == "string" ? toast.error(error) : toast.error("error");
      }
    },
  });
  useEffect(() => {
    if (isSubmitted) {
      setModalOpen(false);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setModalOpen(true)}
        className="flex w-max items-center gap-2 rounded-lg border-2 px-4 py-1 text-end text-lg duration-300 hover:shadow-md"
      >
        <FaStar className="text-xl text-yellow-500" />
        Berikan Ulasan
      </button>

      <div
        className={`${isModalOpen ? "block" : "hidden"} relative z-10`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="flex flex-col items-center p-4">
                <div className="flex w-full items-center justify-between border-b-2 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-800 px-2 py-2 text-center text-white">
                      <TbMessageChatbot />
                    </div>
                    <p className="font-semibold">Feedback</p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded-xl px-2 py-2 text-2xl hover:bg-gray-500/20"
                  >
                    <IoClose />
                  </button>
                </div>
                <h1 className="mt-6 px-4 text-center text-2xl font-semibold">
                  Bagaimana Perjalanan Anda ?
                </h1>
                <p className="px-4 py-4 text-center">
                  Ulasan Anda sangat berarti bagi kami! Berikan feedback tentang
                  pengalaman Anda dan bantu kami untuk terus memperbaiki layanan
                  kami.
                </p>
                <div className="flex-flex-col items-center">
                  <Rating
                    value={rating}
                    onChange={setRating}
                    className="max-w-[230px] text-violet-400"
                  />
                </div>
                <div className="mt-4 w-full px-4">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex w-full flex-col gap-2 py-2"
                  >
                    <div className="flex w-full flex-col gap-2">
                      <textarea
                        name="review"
                        onChange={formik.handleChange}
                        value={formik.values.review}
                        placeholder="Berikan ulasan anda . . ."
                        className={`min-h-[150px] w-full rounded-xl border-2 bg-slate-200/30 px-2 pt-2 text-sm ${
                          formik.touched.review && formik.errors.review
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.review && formik.errors.review && (
                        <div className="text-sm text-red-500">
                          {formik.errors.review}
                        </div>
                      )}
                      <button
                        type="submit"
                        onClick={() => setModalOpen(false)}
                        className="mt-2 h-max rounded-lg bg-btn px-6 text-white shadow-md duration-150 hover:bg-btnhover lg:py-3"
                      >
                        Kirim Ulasan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
