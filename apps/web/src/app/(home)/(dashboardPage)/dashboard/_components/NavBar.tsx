"use client";

import { getNotification } from "@/libs/fetch/transaction";
import { useAppSelector } from "@/Redux/Hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCreateOutline, IoPerson } from "react-icons/io5";
import { MdOutlineTextsms } from "react-icons/md";

const NavBar = () => {
  const { username, avatar, createdAt } = useAppSelector((state) => state.user);
  const [dataNotif, setDataNotif] = useState([]);
  useEffect(() => {
    const getNotif = async () => {
      const data = await getNotification();
      setDataNotif(data);
    };
    getNotif();
  }, []);
  const totalNotif = dataNotif.length;

  // const createAccount = formatDateCreateAccount(createdAt);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const menuNav = [
    {
      href: "/dashboard/create-property",
      text: "Buat Properti",
      icon: IoCreateOutline,
    },
  ];
  return (
    <nav className="py-8">
      <section className="flex items-center justify-between border-b pb-3">
        <main className="hidden text-xl font-bold text-hitam md:block">
          <h1>Dashboard</h1>
          {/* <p className="text-xs font-normal text-gray-500">{createAccount}</p> */}
        </main>
        <main className="flex items-center gap-4">
          {menuNav.map((item, idx) => {
            const isActive = pathname == item.href;
            return (
              <Link
                key={idx}
                href={`${item.href}`}
                className={`flex items-center gap-2 rounded-full p-2 text-xs font-medium md:text-sm ${isActive ? "bg-btn text-white" : "bg-btn/10 text-hitam transition-all duration-300 hover:bg-btn/30"} `}
              >
                <item.icon className="h-3 w-3 md:h-4 md:w-4" />
                <p>{item.text}</p>
              </Link>
            );
          })}
          <div className="relative">
            <div
              className={`${totalNotif == 0 ? "hidden" : "absolute"} -right-2 -top-2 rounded-full bg-red-500/90 p-1 px-2 text-xs text-white`}
            >
              {totalNotif}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => {
                if (totalNotif === 0) {
                  setIsOpen(false);
                }
              }}
              className="flex items-center gap-2 rounded-full bg-btn bg-btn/10 p-2 text-xs font-medium text-hitam transition-all duration-300 hover:bg-btn/30 md:text-sm"
            >
              <MdOutlineTextsms />
              <p>Notifikasi</p>
            </button>
            {isOpen && (
              <div
                // onMouseEnter={() => setIsOpen(true)}
                // onMouseLeave={() => setIsOpen(false)}
                className="absolute right-0 z-10 mt-2 w-max rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {totalNotif == 0 ? (
                    <>
                      <p className="block px-4 py-2 text-xs text-gray-700">
                        Tidak ada reservasi yang harus dikonfirmasi
                      </p>
                    </>
                  ) : (
                    <a
                      href="/dashboard/transaction"
                      className="block px-4 py-2 text-xs font-medium text-black hover:bg-gray-100"
                      role="menuitem"
                    >
                      {totalNotif} reservasi menunggu konfirmasi !
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            {avatar !== null ? (
              <div className="overflow-hidden rounded-full bg-slate-50 shadow-lg">
                <Image
                  src={avatar}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="h-9 w-9 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 shadow-lg">
                <IoPerson className="h-4 w-4" />
              </div>
            )}
            <p className="font-medium text-hitam">{username}</p>
          </div>
        </main>
      </section>
    </nav>
  );
};

export default NavBar;
