"use client";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Cookies from "js-cookie";
import { navigate } from "@/libs/server";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/Redux/slices/userSlice";
const ReservationNav = () => {
  const { username, token, avatar } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const deleteCookies = () => Cookies.remove("token");
  const dispatch = useDispatch();
  const handleLogOut = () => {
    deleteCookies();
    dispatch(logoutAction());
    localStorage.clear();
    navigate("/account/login");
  };
  return (
    <nav className={`relative w-full border-b-2 bg-white py-4 lg:py-5`}>
      <main className="flex w-full items-center justify-between px-2 py-2 lg:px-8 lg:pr-20">
        <div className="flex justify-center pl-7 lg:-translate-y-2 lg:justify-start">
          <Link href={"/"}>
            <Logo size="scale-150 " colorBird="btn" colorText="hitam" />
          </Link>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative mt-6 flex items-center justify-between rounded-full bg-btn px-6 py-2 text-white duration-100 hover:bg-btnhover lg:mt-2 lg:min-w-[170px]"
          >
            <div className="flex items-center gap-1">
              <Image
                src={avatar ? `${avatar}` : "/dummy/profilDummy.jpg"}
                alt="avatar"
                width={200}
                height={200}
                className="h-[30px] w-[30px] rounded-full object-cover"
              />
              <p className="hidden font-semibold lg:block">{username}</p>
            </div>
            <IoMdArrowDropdown />
          </button>
          {isOpen && (
            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
                  role="menuitem"
                >
                  Profile
                </a>
                <a
                  href="/profile/myorder"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
                  role="menuitem"
                >
                  Pesanan saya
                </a>
                <a
                  href="/profile/purchase"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
                  role="menuitem"
                >
                  History pemasanan
                </a>
                <a
                  href="/"
                  className="mt-5 block px-4 py-2 text-sm text-white"
                  role="menuitem"
                >
                  <p className="rounded-full bg-btn px-2 py-2 text-center font-medium duration-300 hover:bg-btnhover">
                    Home
                  </p>
                </a>
                <button
                  onClick={handleLogOut}
                  className="mb-2 block w-full px-4 text-sm text-gray-700"
                  role="menuitem"
                >
                  <p className="rounded-full border-2 px-2 py-2 text-center font-medium text-gray-400 duration-300 hover:bg-gray-100 hover:text-hitam">
                    Log Out
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </nav>
  );
};

export default ReservationNav;
