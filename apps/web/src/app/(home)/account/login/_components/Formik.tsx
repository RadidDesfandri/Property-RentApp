"use client";

import { ButtonComp } from "@/components/ButtonComp";
import { Input, InputErr } from "@/components/Input";
import { loginUser } from "@/libs/fetch/user";
import { createCookie, navigate } from "@/libs/server";
import { useAppDispatch } from "@/Redux/Hooks";
import { loginAction } from "@/Redux/slices/userSlice";
import { LoginSchema } from "@/Schemas/Schema";
import { LoginType } from "@/types/user";
import { AxiosError } from "axios";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const FormikComp = () => {
  const [hidePass, setHidePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const initialValues: LoginType = {
    email: "",
    password: "",
  };

  const onLogin = async (data: LoginType, action: FormikHelpers<LoginType>) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      const userData = {
        ...res.data.user,
        token: res.data.token,
      };
      createCookie("token", res.data.token);
      dispatch(loginAction(userData));
      toast.success(res.data.msg);
      action.resetForm();
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(value, action) => {
        onLogin(value, action);
      }}
    >
      {() => {
        return (
          <Form className="flex flex-col">
            <div className="mb-2">
              <label htmlFor="email" className="text-sm text-black">
                E-Mail Address
              </label>
              <InputErr
                id="email"
                name="email"
                type="email"
                className="h-10 w-full rounded-md border border-btn px-3 focus:outline-btn"
                placeholder="Masukkan email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-black">
                E-Mail Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={hidePass ? "text" : "password"}
                  className="h-10 w-full rounded-md border border-btn px-3 focus:outline-btn"
                  placeholder="Masukkan password"
                />
                <span
                  onClick={() => setHidePass(!hidePass)}
                  className="absolute right-5 top-[32%] cursor-pointer"
                >
                  {hidePass ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-red-700"
              />
            </div>
            <Link
              href={"/account/forgot-password-user"}
              className="mb-6 w-fit text-xs text-btn hover:text-btnhover hover:underline"
            >
              Lupa password?
            </Link>

            <ButtonComp
              disable={loading}
              text={loading ? "Loading..." : "Masuk"}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikComp;