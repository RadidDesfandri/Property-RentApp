"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoScroll } from "./Logo";
import { useAppSelector } from "@/Redux/Hooks";
import { IoPerson } from "react-icons/io5";
import { RiServiceFill } from "react-icons/ri";
import Image from "next/image";
import ModalPartnert from "./homepageComp/ModalPartnert";
import MenuMobile from "./MenuMobile";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [modalPartner, setModalPartnert] = useState(false);
  const { username, token, avatar } = useAppSelector((state) => state.user);
  const onCloseModal = () => {
    setModalPartnert(!modalPartner);
  };

  useEffect(() => {
    const handleScroll = () => {
      const ifScroll = window.scrollY;
      setScrolled(ifScroll > 3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed z-20 w-full rounded-b-3xl py-2 transition-all duration-300 ${scrolled ? "border-b-2 bg-white" : "bg-transparant"}`}
    >
      <main className="mx-auto max-w-7xl px-2 py-2 md:px-16 lg:px-20">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <LogoScroll scrolled={scrolled} size="scale-80 md:scale-100" />
          </Link>

          <div
            className={`hidden items-center gap-5 font-medium md:flex ${scrolled ? "text-hitam" : "text-gray-100"} `}
          >
            <button
              onClick={onCloseModal}
              type="submit"
              className="flex items-center gap-1 rounded-md px-1 py-2 transition-all duration-200 hover:bg-black/50"
            >
              <RiServiceFill className="h-5 w-5" />
              <p>Jadi Partner Nezztar</p>
            </button>
            <Link
              href={"/profile/myorder"}
              className="rounded-md px-1 py-2 transition-all duration-200 hover:bg-black/50"
            >
              Cek Pesanan
            </Link>

            {token ? (
              <Link
                href={"/profile"}
                className="flex cursor-pointer items-center justify-center rounded-full border-2 border-btn px-1 transition-all duration-200 hover:bg-black/50"
              >
                {avatar !== null ? (
                  <div className="flex items-center gap-2 px-1 py-1">
                    <Image
                      src={avatar}
                      alt="profile"
                      width={40}
                      height={40}
                      className="h-7 w-7 rounded-full bg-btn object-cover"
                    />
                    <p>{username}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-1 py-1">
                    <IoPerson
                      className={`h-7 w-7 rounded-full border-2 bg-btn text-white`}
                    />
                    <p>{username}</p>
                  </div>
                )}
              </Link>
            ) : (
              <div
                className={`flex gap-3 border-2 ${scrolled ? "border-hitam text-hitam" : "border-btn text-white"} rounded-full px-2 py-2 font-semibold`}
              >
                <Link
                  href={"/account/register"}
                  className="transition-colors duration-150"
                >
                  Daftar
                </Link>

                {/* Style line start */}
                <div
                  className={`w-[2px] rounded-full ${scrolled ? "bg-hitam" : "bg-btn"} `}
                ></div>
                {/* Style line end */}

                <Link
                  href={"/account/login"}
                  className="transition-colors duration-150"
                >
                  Masuk
                </Link>
              </div>
            )}

            {modalPartner && (
              <section
                onClick={onCloseModal}
                className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/30"
              >
                <ModalPartnert onCloseModal={onCloseModal} />
              </section>
            )}
          </div>
          <MenuMobile scrolled={scrolled} />
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
