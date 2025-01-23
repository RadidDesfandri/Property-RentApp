import Image from "next/image";
import React from "react";

const DesainOtp = ({
  children,
  resendCode,
  isOtpComplete,
  onSubmitOtp,
  loading,
}: {
  children: React.ReactNode;
  resendCode: any;
  isOtpComplete: boolean;
  onSubmitOtp: () => void;
  loading: boolean;
}) => {
  return (
    <section className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/70 px-2">
      <div className="flex w-full flex-col items-center rounded-md bg-white px-8 py-6 text-center shadow-lg md:w-[450px]">
        <Image src={"/uiotp.svg"} alt="Otp karakter" width={180} height={180} />
        <h1 className="mb-2 mt-5 text-4xl font-medium text-btn">OTP</h1>
        <h1 className="text-sm text-hitam">
          Mohon check email kamu untuk mendapatkan code OTP
        </h1>
        {children}
        <p className="px-5 text-xs text-hitam">
          Belum menerima code otp?{" "}
          <button
            onClick={resendCode}
            className="text-btn hover:text-btnhover hover:underline"
          >
            Kirim ulang
          </button>
        </p>
        <div className="mt-8 w-full">
          <button
            onClick={onSubmitOtp}
            disabled={!isOtpComplete && !loading}
            type="submit"
            className={`w-full rounded-md bg-btn px-5 py-2 font-semibold text-white transition-all duration-150 hover:bg-btnhover hover:shadow-md disabled:bg-slate-300 disabled:text-gray-100 ${!isOtpComplete ? "cursor-not-allowed" : ""}`}
          >
            {loading ? "Loading..." : "Verifikasi"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesainOtp;
