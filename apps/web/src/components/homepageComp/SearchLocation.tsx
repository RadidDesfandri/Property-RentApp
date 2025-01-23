import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchLocation = () => {
  const location = [
    {
      img: "/herosec/heroimg3.jpg",
      name: "Jakarta",
      href: "/search?location=Jakarta",
    },
    {
      img: "/herosec/heroimg1.jpg",
      name: "Bandung",
      href: "/search?location=Bandung",
    },
    {
      img: "/herosec/heroimg2.jpg",
      name: "Bali",
      href: "/search?location=Bali",
    },
    {
      img: "/herosec/heroimg4.jpg",
      name: "Yogyakarta",
      href: "/search?location=Yogyakarta",
    },
    {
      img: "/herosec/heroimg5.jpg",
      name: "Surabaya",
      href: "/search?location=Surabaya",
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold text-hitam md:text-4xl">
        Tujuan Populer
      </h1>
      <main className="mt-5 flex items-center gap-5 md:gap-7">
        {location.map((item, idx) => {
          return (
            <Link
              key={idx}
              href={item.href}
              className="flex flex-col gap-2 text-center text-xs text-gray-700 md:text-base"
            >
              <Image
                src={item.img}
                alt="Location"
                width={100}
                height={100}
                className="h-14 w-14 rounded-full md:h-20 md:w-20"
              />
              <p>{item.name}</p>
            </Link>
          );
        })}
      </main>
    </div>
  );
};

export default SearchLocation;
