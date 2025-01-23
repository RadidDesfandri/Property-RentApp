"use client";

import { sendVerificationChangeMail } from "@/libs/fetch/user";
import { useAppSelector } from "@/Redux/Hooks";
import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidShieldX } from "react-icons/bi";
import { HiShieldCheck } from "react-icons/hi";

const ChangeEmailUser = () => {
  const { email, isVerify } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await sendVerificationChangeMail();
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="mt-4 w-full rounded-md border bg-slate-50 shadow-lg">
      <main className="border-b px-6 py-2 md:py-3">
        <p className="font-semibold text-hitam">Email Anda</p>
      </main>
      <main className="px-4 py-2 md:px-6 md:py-3">
        <div className="flex gap-2 border-b pb-3 text-sm text-gray-600 md:text-base">
          <p>{email}</p>
          <div
            className={`flex items-center gap-1 ${isVerify == true ? "text-green-500" : "text-red-500"} `}
          >
            <p>{isVerify == true ? "Verifikasi" : "Belum Verifikasi"}</p>
            {isVerify == true ? (
              <HiShieldCheck className="h-5 w-5" />
            ) : (
              <BiSolidShieldX className="h-5 w-5" />
            )}
          </div>
        </div>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="mt-2 font-medium text-btn transition-all duration-200 hover:font-semibold hover:text-btnhover disabled:text-gray-300 disabled:shadow-none"
        >
          {loading ? "Loading..." : "Ganti email anda"}
        </button>
      </main>
    </section>
  );
};

export default ChangeEmailUser;
