"use client";

import { deleteCookie, navigate } from "@/libs/server";
import { useAppSelector } from "@/Redux/Hooks";
import { logoutAction } from "@/Redux/slices/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoPerson, IoSettingsSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { RiDashboardFill, RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { BsClipboard2Data } from "react-icons/bs";

interface MenuDashboard {
  href: string;
  text: string;
  icon: IconType;
}

const SideBarDashboard = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    deleteCookie("token");
    dispatch(logoutAction());
    localStorage.clear();
    navigate("/");
  };
  const pathname = usePathname();
  const { username, avatar } = useAppSelector((state) => state.user);

  const menuBar: MenuDashboard[] = [
    { href: "/dashboard", text: "Dashboard", icon: RiDashboardFill },
    {
      href: "/dashboard/transaction",
      text: "Transaksi",
      icon: FaMoneyBillTransfer,
    },
    { href: "/dashboard/review", text: "Review", icon: MdOutlineRateReview },
    { href: "/dashboard/sales", text: "Sales Report", icon: BsClipboard2Data },
  ];
  const menuAcc = [
    { href: "/dashboard/profile", text: "Akun anda", icon: IoSettingsSharp },
  ];

  return (
    <div className="sticky top-0 h-screen lg:w-[250px]">
      <main className="px-2 py-5 lg:px-5 lg:py-8">
        {/* Profile start */}
        <Link href={"/"} className="flex gap-3 border-b pb-3">
          {avatar !== null ? (
            <div className="overflow-hidden rounded-full bg-slate-50 shadow-lg">
              <Image
                src={avatar}
                alt="Profile"
                width={50}
                height={50}
                className="h-11 w-11 rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 shadow-lg">
              <IoPerson className="h-6 w-6" />
            </div>
          )}

          <div className="hidden text-xs text-gray-500 lg:block">
            <h1 className="text-base font-semibold text-hitam">{username}</h1>
            <h1>Tenant</h1>
          </div>
        </Link>
        {/* Profile end */}

        {/* Menu sec start */}
        <section className="mt-4 flex flex-col gap-3 border-b pb-4">
          {menuBar.map((item, idx) => {
            const isActive = pathname == item.href;
            return (
              <Link
                key={idx}
                href={`${item.href}`}
                className={`flex items-center gap-2 rounded-md ${isActive ? "bg-btn text-white" : "text-gray-500 hover:bg-btn/10"} px-3 py-3 font-medium`}
              >
                <item.icon className="h-5 w-5" />
                <p className="hidden lg:flex">{item.text}</p>
              </Link>
            );
          })}
        </section>
        {/* Menu sec end */}

        {/* Menu logout and account start */}
        <section className="mt-4 flex flex-col gap-3">
          {menuAcc.map((item, idx) => {
            const isActive = pathname == item.href;
            return (
              <Link
                key={idx}
                href={`${item.href}`}
                className={`flex items-center gap-2 rounded-md ${isActive ? "bg-btn text-white" : "text-gray-500 hover:bg-btn/10"} px-3 py-3 font-medium`}
              >
                <item.icon className="h-5 w-5" />
                <p className="hidden lg:flex">{item.text}</p>
              </Link>
            );
          })}
          <main
            onClick={onLogout}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-3 font-medium text-gray-500 hover:bg-btn/10`}
          >
            <RiLogoutCircleLine className="h-5 w-5" />
            <p className="hidden lg:flex">Log Out</p>
          </main>
        </section>
        {/* Menu logout and account end */}
      </main>
    </div>
  );
};

export default SideBarDashboard;
