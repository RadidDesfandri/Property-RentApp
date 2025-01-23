import { verifyOtpTenant } from "@/libs/fetch/tenant";
import { navigate } from "@/libs/server";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DesainOtp from "../../_components/DesainOtp";

const InputOtpRegisterTenant = ({ nav }: { nav: string }) => {
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const [time, setTime] = useState<number>(300);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  const resendCode = () => {
    setOtp(new Array(5).fill(""));
    setTime(300);
    // Fetch resend dan logika
  };

  const minutes = Math.floor(time / 60);
  const second = time % 60;

  const handleChangeOtp = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let value = e.target.value.toUpperCase();
    if (/^[a-zA-Z0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 4) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  const onSubmitOtp = async () => {
    setLoading(true);
    try {
      const otpCode = otp.join("");
      const payload = { otp: otpCode };
      const res = await verifyOtpTenant(payload);
      toast.success(res.data.msg);
      navigate(`/account/${nav}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <section>
      <DesainOtp
        resendCode={resendCode}
        isOtpComplete={isOtpComplete}
        onSubmitOtp={onSubmitOtp}
        loading={loading}
      >
        {time > 0 ? (
          <p className="text-sm font-bold text-hitam">
            Waktu Verifikasi {minutes}:{second < 10 ? `0${second}` : second}
          </p>
        ) : (
          <p className="text-sm font-bold text-hitam">
            Waktu Verifikasi <span className="text-red-700">Habis</span>
          </p>
        )}
        <div className="mb-1 mt-4 flex space-x-5">
          {otp.map((it, index) => {
            return (
              <input
                key={index}
                id={`otp-${index}`}
                maxLength={1}
                value={otp[index]}
                type="text"
                onChange={(e) => handleChangeOtp(e, index)}
                className="h-12 w-12 rounded-md border-2 border-btn text-center text-lg focus:outline-none"
              />
            );
          })}
        </div>
      </DesainOtp>
    </section>
  );
};

export default InputOtpRegisterTenant;
