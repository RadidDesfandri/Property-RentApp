"use client";
import { sendFeedback } from "@/libs/fetch/review";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function FeedbackModal({ id }: { id: number }) {
  const [open, setOpen] = useState<boolean>(false);
  const [submit, setIsSubmitted] = useState(false);
  const validationSchema = Yup.object().shape({
    feedback: Yup.string()
      .min(10, "Feedback harus terdiri dari setidaknya 10 karakter.")
      .required("Feedback tidak boleh kosong."),
  });
  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const feedback = values.feedback;
        await sendFeedback(feedback, id);
        setIsSubmitted(true);
        formik.setValues({ feedback: "" });
      } catch (error) {
        typeof error == "string" ? toast.error(error) : toast.error("error");
      }
    },
  });
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-4 rounded-lg border-2 px-4 py-2 text-sm font-semibold duration-300 hover:shadow-md"
      >
        Balas Ulasan
      </button>
      <div
        className={`${open ? "block" : "hidden"} relative z-10`}
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
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="flex justify-between">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      X
                    </div>
                  </div>
                  <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Berikan balasan untuk ulasan ini
                    </h3>
                    <div className="mt-2 w-full">
                      <form
                        onSubmit={formik.handleSubmit}
                        className="flex w-full flex-col gap-2 py-2"
                      >
                        <div className="flex w-full flex-col gap-2">
                          <textarea
                            name="feedback"
                            onChange={formik.handleChange}
                            value={formik.values.feedback}
                            placeholder="Berikan ulasan anda . . ."
                            className={`min-h-[150px] w-full rounded-xl border-2 bg-slate-200/30 px-2 pt-2 text-sm ${
                              formik.touched.feedback && formik.errors.feedback
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                          {formik.touched.feedback &&
                            formik.errors.feedback && (
                              <div className="text-xs text-red-500">
                                {formik.errors.feedback}
                              </div>
                            )}

                          <button
                            type="submit"
                            onClick={() => setOpen(false)}
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
      </div>
    </div>
  );
}
