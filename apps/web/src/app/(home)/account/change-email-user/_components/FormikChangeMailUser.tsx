"use client";

import { ButtonComp } from "@/components/ButtonComp";
import { InputErr } from "@/components/Input";
import { changeEmail } from "@/libs/fetch/user";
import { createCookie, navigate } from "@/libs/server";
import { ChangeEmailSchema } from "@/Schemas/Schema";
import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import InputOtpRegisterUser from "../../register/_components/InputOtp";

interface ChangeEmail {
  email: string;
}

const FormikChangeMailUser = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [modalOtp, setModalOtp] = useState(false);

  const onSubmit = async (
    email: string,
    action: FormikHelpers<ChangeEmail>,
    id: string,
  ) => {
    setLoading(true);
    try {
      const res = await changeEmail(email, id);
      createCookie("token", res.data.token);
      toast.success(res.data.msg);
      action.resetForm();
      setModalOtp(!modalOtp);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ChangeEmailSchema}
        onSubmit={(value, action) => {
          onSubmit(value.email, action, id);
        }}
      >
        {({ errors, dirty }) => {
          return (
            <Form className="w-full">
              <div className="mb-2">
                <label htmlFor="email" className="text-sm text-black">
                  Email
                </label>
                <div className="relative">
                  <InputErr
                    id="email"
                    name="email"
                    type="email"
                    className="h-10 w-full rounded-md border border-btn px-3 focus:outline-btn"
                    placeholder="Email baru anda"
                  />
                </div>
              </div>
              <ButtonComp
                disable={loading || !!errors.email || !dirty}
                text={loading ? "Loading..." : "Submit"}
              />
            </Form>
          );
        }}
      </Formik>
      {modalOtp && <InputOtpRegisterUser nav="login"/>}
    </section>
  );
};

export default FormikChangeMailUser;
