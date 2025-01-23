import { Logo } from "@/components/Logo";
import React from "react";

const DesainResetPass = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-latar">
      <div className="mx-auto flex w-[380px] max-w-7xl flex-col items-center rounded-md bg-white px-4 py-4 shadow-lg">
        <Logo colorBird="btn" colorText="hitam" size="scale-150" />
        <h1 className="mb-3 mt-10 w-full text-start text-xl font-bold text-hitam">
          Masukkan password baru
        </h1>
        {children}
      </div>
    </section>
  );
};

export default DesainResetPass;
