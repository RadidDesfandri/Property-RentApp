"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../../../../components/Logo";
import LoginGithubUser from "../login/_components/LoginGithub";
import LoginGoogleUser from "../login/_components/LoginGoogle";
import LoginTwitterUser from "../login/_components/LoginTwitter";

interface IPropsDesainLogin {
  text1: string;
  text2: string;
  href: string;
  hrefTenant: string;
  ket: string;
  ketTenant: string;
  ketPembeli: string;
  children: React.ReactNode;
}

const DesainLoginRegis = ({
  children,
  text1,
  text2,
  href,
  ket,
  hrefTenant,
  ketTenant,
  ketPembeli,
}: IPropsDesainLogin) => {
  return (
    <section className="mx-auto flex h-screen w-screen max-w-7xl items-center justify-between md:px-5 lg:px-14">
      <main className="w-full rounded-xl bg-white px-5 py-5 shadow-lg md:w-1/2">
        {/* Logo ucapan selamat start */}
        <div className="flex flex-col items-center">
          <Logo colorBird="btn" colorText="gray-900" size="scale-150" />
          <div className="mt-9 flex flex-col items-center">
            <h1 className="text-lg font-medium text-black">Selamat datang</h1>
            <h2 className="text-[10px] text-hitam">{`Mohon masukkan data anda untuk ${text1} account ${ketPembeli}`}</h2>
          </div>
          <div className="my-3 w-full">{children}</div>
          <div className="mb-3 flex w-full items-center justify-center gap-2 text-xs text-hitam">
            <p>
              {`${ket} punya account Nezztar? `}
              <Link href={`${href}`} className="font-semibold text-btn">
                {text2}
              </Link>
            </p>
            <span className="h-1 w-1 rounded-full bg-hitam"></span>
            <Link
              href={`${hrefTenant}`}
              className="font-semibold text-btn"
            >{`Buat account ${ketTenant}`}</Link>
          </div>
        </div>
        {/* Logo ucapan selamat end */}

        {/* Hiasan --atau-- start */}
        <div className="my-3 flex items-center gap-3">
          <span className="h-[0.1px] w-full bg-gray-300"></span>
          <p className="text-xs text-hitam">atau</p>
          <span className="h-[0.1px] w-full bg-gray-300"></span>
        </div>
        {/* Hiasan --atau-- end */}

        {/* Login dengan sosmed start */}
        <div className="flex gap-6">
          <div className="w-full">
            <LoginGoogleUser />
          </div>
          <div className="w-full">
            <LoginTwitterUser />
          </div>
          <div className="w-full">
            <LoginGithubUser />
          </div>
        </div>
        {/* Login dengan sosmed end */}

        {/* Syarat ketentuan dan kebijakan privasi start */}
        <div className="mt-4 flex items-center justify-center text-center text-[10px] text-hitam md:text-xs">
          <p>
            Dengan masuk atau membuat account, Anda setuju dengan kami{" "}
            <span className="text-btn">Syarat & Ketentuan</span> Dan{" "}
            <span className="text-btn">Kebijkan privasi</span>
          </p>
        </div>
        {/* Syarat ketentuan dan kebijakan privasi end */}
      </main>

      {/* Image start */}
      <main className="hidden md:block">
        <Image src={"/Realtor-bro.svg"} alt="Vector" width={400} height={400} />
      </main>
      {/* Image end */}
    </section>
  );
};

export default DesainLoginRegis;
