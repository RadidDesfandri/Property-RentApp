import React from "react";
import { Logo } from "../../../../components/Logo";

const DesainFormData = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-latar">
      <div className="flex w-[380px] flex-col items-center rounded-md bg-white px-4 py-4 shadow-lg">
        <Logo colorBird="btn" colorText="hitam" size="scale-125" />
        <h1 className="mt-3 text-xl font-medium text-hitam">
          Lengkapi data mu
        </h1>
        <p className="text-[10px] text-hitam">Lengkapi data untuk pendaftaran</p>
        {children}
      </div>
    </section>
  );
};

export default DesainFormData;
