import React from "react";
import { Logo } from "./Logo";

const LoadingComp = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="animate-bounce">
        <Logo colorBird="btn" colorText="white" size="scale-150" />
      </div>
    </div>
  );
};

export default LoadingComp;