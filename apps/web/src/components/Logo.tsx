import React from "react";
import { GiHummingbird } from "react-icons/gi";

interface Logo {
  colorText: string;
  colorBird: string;
  size: string;
}
interface LogoScroll {
  size: string;
  scrolled: boolean;
}

export const Logo = ({ colorText, colorBird, size }: Logo) => {
  return (
    <div className={`flex ${size}`}>
      <GiHummingbird className={`text-${colorBird} h-6 w-6`} />
      <p
        className={`left-[16px] top-2 -translate-x-2 translate-y-2 text-xl font-semibold text-${colorText}`}
      >
        Nezztar
      </p>
    </div>
  );
};

export const LogoScroll = ({ size, scrolled }: LogoScroll) => {
  return (
    <div className={`flex ${size}`}>
      <GiHummingbird
        className={`transition-colors duration-300 ${scrolled ? "text-btn" : "text-gray-100"} h-6 w-6`}
      />
      <p
        className={`left-[16px] top-2 -translate-x-2 translate-y-2 text-xl font-semibold transition-colors duration-300 ${scrolled? "text-hitam" : "text-gray-100"} `}
      >
        Nezztar
      </p>
    </div>
  );
};
