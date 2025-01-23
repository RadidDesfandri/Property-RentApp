"use client";

import { ButtonComp } from "@/components/ButtonComp";
import { InputErr } from "@/components/Input";
import { forgotPasswordUser } from "@/libs/fetch/user";
import { RegisterSchema } from "@/Schemas/Schema";
import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";

interface IEmail{
  email: string
}

const FormikForgotPassUser = () => {
  const [loading, setLoading] = useState(false);

  const onForgotSubmit = async (data: IEmail, action: FormikHelpers<IEmail>) => {
    setLoading(true);
    try {
      const res = await forgotPasswordUser(data);
      toast.success(res.data.msg);
      action.resetForm()
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
      initialValues={{ email: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(value, action) => {
        onForgotSubmit(value, action);
        action.resetForm();
      }}
    >
      {() => {
        return (
          <Form className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="text-sm text-black">
                Email
              </label>
              <InputErr
                id="email"
                name="email"
                type="text"
                className="h-10 w-full rounded-md border border-btn px-3 focus:outline-btn"
                placeholder="Masukkan email"
              />
            </div>
            <ButtonComp
              disable={loading}
              text={loading ? "Loading..." : "Submit"}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikForgotPassUser;
