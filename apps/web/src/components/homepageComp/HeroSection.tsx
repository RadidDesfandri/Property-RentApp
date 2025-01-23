"use client";

import React, { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SearchBarHero from "./SearchBarHero";
import Image from "next/image";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import SearchBarHeroMobile from "./SearchBarHeroMobile";

export default function EmblaCarousel() {
  const [isHover, setIsHover] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const slide = [
    { img: "/herosec/heroimg1.jpg" },
    { img: "/herosec/heroimg2.jpg" },
    { img: "/herosec/heroimg3.jpg" },
    { img: "/herosec/heroimg4.jpg" },
    { img: "/herosec/heroimg5.jpg" },
    { img: "/herosec/heroimg6.jpg" },
  ];
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="embla w-full"
      ref={emblaRef}
    >
      <div className="embla__container bg-emerald-400">
        {slide.map((item, idx) => {
          return (
            <div
              key={idx}
              className="embla__slide flex items-center justify-center bg-black/50"
            >
              <Image
                src={item.img}
                alt={`HeroSection-${idx}`}
                width={3000}
                height={1000}
                className="h-[700px] w-full object-cover brightness-50 md:h-[500px]"
              />
            </div>
          );
        })}
      </div>
        <SearchBarHero />
        <SearchBarHeroMobile />
      {isHover && (
        <div
          className={`${isHover ? "opacity-50" : "opacity-100"} transition-opacity duration-300`}
        >
          <main
            onClick={scrollPrev}
            className="absolute left-0 top-[40%] z-20 -translate-y-1/2 transform cursor-pointer bg-black py-4 text-white"
          >
            <GrFormPrevious className="h-10 w-10" />
          </main>
          <main
            onClick={scrollNext}
            className="absolute right-0 top-[40%] z-20 -translate-y-1/2 transform cursor-pointer bg-black py-4 text-white"
          >
            <GrFormNext className="h-10 w-10" />
          </main>
        </div>
      )}
    </div>
  );
}
