"use client";

import { useAppSelector } from "@/Redux/Hooks";
import { formatDateCreateAccount } from "@/utils/formatDate";
import Image from "next/image";
import React from "react";
import { IoPerson } from "react-icons/io5";

const NavBarProfile = () => {
  const { username, avatar, createdAt } = useAppSelector((state) => state.user);
  // const createAccount = formatDateCreateAccount(createdAt);

  return (
    <nav className="hidden py-8 md:block">
      <section className="flex items-center justify-between border-b pb-3">
        <main className="text-xl font-bold text-hitam">
          <h1>Profile</h1>
          {/* <p className="text-xs font-normal text-gray-500">{createAccount}</p> */}
        </main>
        <div className="items-center flex gap-2">
          {avatar !== null ? (
            <div className="overflow-hidden rounded-full bg-slate-50 shadow-lg">
              <Image
                src={avatar}
                alt="Profile"
                width={50}
                height={50}
                className="h-9 w-9 object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 shadow-lg">
              <IoPerson className="h-4 w-4" />
            </div>
          )}
          <p className="font-medium text-hitam">{username}</p>
        </div>
      </section>
    </nav>
  );
};

export default NavBarProfile;
