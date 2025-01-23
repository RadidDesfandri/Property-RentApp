import { axiosInstance } from "@/libs/axios";
import { createCookie, navigate } from "@/libs/server";
import { loginAction } from "@/Redux/slices/userSlice";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import { BsTwitterX } from "react-icons/bs";
import { useDispatch } from "react-redux";

const LoginTwitterUser = () => {
 
  return (
    <section>
      <button
        type="button"
        className="flex w-full justify-center rounded-md border border-btn py-2"
      >
        <BsTwitterX className="h-8 w-8" />
      </button>
    </section>
  );
};

export default LoginTwitterUser;
