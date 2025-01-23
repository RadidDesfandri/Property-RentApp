"use client";

import { ButtonComp } from "@/components/ButtonComp";
import { InputErr } from "@/components/Input";
import { resetPasswordUser } from "@/libs/fetch/user";
import { navigate } from "@/libs/server";
import { resetPassSchema } from "@/Schemas/Schema";
import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface ResetPassProps {
  token: string;
}

interface ResetPassType {
  password: string;
  confirmPassword: string;
}

const FormikResetPassUser: FC<ResetPassProps> = ({ token }) => {
  const [hidePass, setHidePass] = useState(false);
  const [hidePassConfirm, setHidePassConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const onResetPass = async (
    password: string,
    action: FormikHelpers<ResetPassType>,
    token: string,
  ) => {
    setLoading(true);
    try {
      const res = await resetPasswordUser(password, token);
      toast.success(res.data.msg);
      action.resetForm();
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
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={resetPassSchema}
      onSubmit={(value, action) => {
        onResetPass(value.password, action, token);
      }}
    >
      {() => {
        return (
          <Form className="w-full">
            <section className="w-full">
              <div className="mb-2">
                <label htmlFor="password" className="text-sm text-black">
                  Password
                </label>
                <div className="relative">
                  <InputErr
                    id="password"
                    name="password"
                    type={hidePass ? "text" : "password"}
                    className="h-10 w-full rounded-md border border-btn px-3 focus:outline-btn"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setHidePass(!hidePass)}
                    className="absolute right-5 top-[32%] cursor-pointer"
                  >
                    {hidePass ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="text-sm text-black">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <InputErr
                    id="confirmPassword"
                    name="confirmPassword"
                    type={hidePassConfirm ? "text" : "password"}
                    className="h-10 w-full rounded-md border border-btn px-3 focus:outline-btn"
                    placeholder="Konfirmasi password"
                  />
                  <span
                    onClick={() => setHidePassConfirm(!hidePassConfirm)}
                    className="absolute right-5 top-[32%] cursor-pointer"
                  >
                    {hidePassConfirm ? <AiFillEye /> : <AiFillEyeInvisible />}
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

export default FormikResetPassUser;
