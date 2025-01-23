"use client";

import { InputErr } from "@/components/Input";
import { RegisterSchema } from "@/Schemas/Schema";
import { UserType } from "@/types/user";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { createCookie } from "@/libs/server";
import InputOtpRegisterTenant from "./InputOtp";
import { registerAxiosTenant } from "@/libs/fetch/tenant";
import { ButtonComp } from "@/components/ButtonComp";

const FormikComp = () => {
  const [loading, setLoading] = useState(false);
  const [modalOtp, setModalOtp] = useState(false);
  const onRegister = async (data: UserType) => {
    setLoading(true);
    try {
      const res = await registerAxiosTenant(data);
      createCookie("token", res.data.token);
      toast.success(res.data.msg);
      setLoading(false);
      setModalOtp(!modalOtp);
    } catch (err: any) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const initialValues: UserType = {
    email: "",
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(value, action) => {
          onRegister(value);
          action.resetForm();
        }}
      >
        {() => {
          return (
            <Form className="flex flex-col">
              <div className="mb-6">
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
              <ButtonComp
                disable={loading}
                text={loading ? "Loading..." : "Daftar"}
              />
            </Form>
          );
        }}
      </Formik>

      {modalOtp ? <InputOtpRegisterTenant nav="form-data-tenant" /> : null}
    </section>
  );
};

export default FormikComp;
