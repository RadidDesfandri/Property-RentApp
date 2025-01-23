"use client";

import { ButtonComp } from "@/components/ButtonComp";
import { InputErr } from "@/components/Input";
import { updateDataUser } from "@/libs/fetch/user";
import { deleteCookie, navigate } from "@/libs/server";
import { FormDataSchema } from "@/Schemas/Schema";
import { FormDataInput } from "@/types/user";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const FormikFormUser = () => {
  const [hidePass, setHidePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues: FormDataInput = {
    username: "",
    phone: "",
    password: "",
  };

  const onRegister = async (data: FormDataInput) => {
    setLoading(true);
    try {
      const res = await updateDataUser(data);
      toast.success(res.data.msg);
      deleteCookie("token");
      navigate("/account/login");
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
      validationSchema={FormDataSchema}
      onSubmit={(value, action) => {
        onRegister(value);
        action.resetForm();
      }}
    >
      {() => {
        return (
          <Form className="w-full">
            <section className="mt-6 w-full">
              <div className="mb-2">
                <label htmlFor="username" className="text-sm text-black">
                  Username
                </label>
                <InputErr
                  id="username"
                  name="username"
                  type="text"
                  className="h-10 w-full rounded-md border border-btn px-3 focus:outline-btn"
                  placeholder="Masukkan username"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="phone" className="text-sm text-black">
                  Phone
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Masukkan phone"
                  className="h-10 w-full rounded-md border border-btn px-3"
                  pattern="\d*"
                  inputMode="numeric"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-xs text-red-700"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="text-sm text-black">
                  Password
                </label>
                <div className="relative">
                  <InputErr
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
              </div>

              <ButtonComp
                disable={loading}
                text={loading ? "Loading..." : "Submit"}
              />
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikFormUser;