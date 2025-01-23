import { useAppSelector } from "@/Redux/Hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoPerson } from "react-icons/io5";

const MenuMobile = ({ scrolled }: { scrolled: boolean }) => {
  const { username, token, avatar } = useAppSelector((state) => state.user);

  return (
    <div className={`flex ${scrolled ? "text-hitam" : "text-white"} md:hidden`}>
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
              <p>{username.split(" ")[0]}</p>
            </div>
          )}
        </Link>
      ) : (
        <div
          className={`flex gap-3 border-2 text-sm ${scrolled ? "border-hitam text-hitam" : "border-btn text-white"} rounded-full px-2 py-2 font-semibold`}
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
    </div>
  );
};

export default MenuMobile;
