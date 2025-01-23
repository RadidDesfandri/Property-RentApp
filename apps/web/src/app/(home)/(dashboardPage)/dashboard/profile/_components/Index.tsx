"use client";

import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useAppSelector } from "@/Redux/Hooks";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { UpdateDataUser } from "@/types/user";
import Image from "next/image";
import { updateDataProfile } from "@/Schemas/Schema";
import ChangeEmailTenant from "./EmailChangeTenant";
import ProfilePreview from "@/app/(home)/(profilePage)/profile/_components/ProfilePreview";
import { ButtonComp } from "@/components/ButtonComp";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { editTenant } from "@/libs/fetch/tenant";
import { useDispatch } from "react-redux";
import { loginAction } from "@/Redux/slices/userSlice";

const Profilepage = () => {
  const [isHover, setIsHover] = useState(false);
  const { username, phone, avatar } = useAppSelector((state) => state.user);
  const [isActiveImage, setIsActiveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const file = event.target.files?.[0];
    setIsActiveImage(!false);
    if (file) {
      setFieldValue("avatar", file);
    }
  };

  const onSubmit = async (data: UpdateDataUser) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("phone", data.phone);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    try {
      const res = await editTenant(formData);
      const userData = {
        ...res.data.user.updUser,
        token: res.data.user.token,
      };
      dispatch(loginAction(userData));
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const initialValues: UpdateDataUser = {
    avatar: avatar,
    username: username,
    phone: phone,
  };

  return (
    <div className="pb-7 lg:px-5">
      <p className="text-xl font-semibold lg:text-2xl">Pengaturan Akun</p>
      <div className="relative mt-5 border-b-2 px-4 pb-1">
        <p className="font-semibold text-btn">Informasi Akun</p>
        <span className="absolute bottom-[-1px] h-[2px] w-[119px] bg-btn"></span>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={updateDataProfile}
        onSubmit={(value, action) => {
          onSubmit(value);
        }}
      >
        {({
          setFieldValue,
          values,
          errors,
          dirty,
        }: FormikProps<UpdateDataUser>) => {
          return (
            <Form>
              <section className="mt-5 w-full rounded-md border bg-slate-50 shadow-lg">
                <p className="border-b px-6 py-2 font-semibold md:py-3">
                  Data Pribadi
                </p>
                <div className="flex gap-10 px-6 py-3">
                  {/* Avatar start */}
                  <main className="lg:w-1/6">
                    {isActiveImage ? (
                      <label
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        htmlFor="profile"
                        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border bg-slate-50 shadow-lg md:h-20 md:w-20 lg:h-28 lg:w-28"
                      >
                        <ProfilePreview
                          avatar={values.avatar}
                          setFieldValue={setFieldValue}
                        />
                        {isHover && (
                          <div className="absolute top-0 flex h-14 w-14 items-center justify-center rounded-full bg-gray-300/20 transition-opacity duration-300 md:h-20 md:w-20 lg:h-28 lg:w-28">
                            <FiEdit className="h-5 w-5 text-hitam lg:h-8 lg:w-8" />
                            <p className="font-semibold text-hitam">Edit</p>
                          </div>
                        )}
                        <input
                          id="profile"
                          type="file"
                          name="avatar"
                          onChange={(event: any) =>
                            handleFileChange(event, setFieldValue)
                          }
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <label
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        htmlFor="profile"
                        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border bg-slate-50 shadow-lg md:h-20 md:w-20 lg:h-28 lg:w-28"
                      >
                        {/* Show avatar start */}
                        {avatar !== null ? (
                          <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-50 shadow-lg md:h-20 md:w-20 lg:h-28 lg:w-28">
                            <Image
                              src={avatar}
                              alt="Avatar"
                              width={50}
                              height={50}
                              className="h-14 w-14 rounded-full object-cover md:h-20 md:w-20 lg:h-28 lg:w-28"
                            />
                          </div>
                        ) : (
                          <IoPerson
                            className={`h-10 w-10 text-hitam md:h-14 md:w-14 lg:h-16 lg:w-16 ${isHover ? "opacity-50" : "opacity-100"} transition-opacity duration-300`}
                          />
                        )}
                        {/* Show avatar end */}

                        {isHover && (
                          <div className="absolute top-0 flex h-14 w-14 items-center justify-center rounded-full bg-gray-300/20 transition-opacity duration-300 md:h-20 md:w-20 lg:h-28 lg:w-28">
                            <FiEdit className="h-5 w-5 text-hitam lg:h-8 lg:w-8" />
                            <p className="font-semibold text-hitam">Edit</p>
                          </div>
                        )}
                        <input
                          id="profile"
                          type="file"
                          name="avatar"
                          onChange={(event: any) =>
                            handleFileChange(event, setFieldValue)
                          }
                          className="hidden"
                        />
                      </label>
                    )}
                  </main>
                  {/* Avatar end */}

                  <div className="flex w-full flex-col gap-3 md:gap-5">
                    <main className="flex w-full flex-col">
                      <label
                        htmlFor="username"
                        className="lg:tetx-base mb-1 text-sm font-medium text-gray-500"
                      >
                        Nama lengkap
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        className="w-full rounded-md px-3 text-sm outline-none outline-1 outline-gray-400 focus:outline-2 focus:outline-btn/50 md:py-1 md:text-base"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </main>
                    <main className="flex w-full flex-col">
                      <label
                        htmlFor="phone"
                        className="mb-1 text-sm font-medium text-gray-500 lg:text-base"
                      >
                        Nomor Telephone
                      </label>
                      <Field
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="No. telephone"
                        className="w-full rounded-md px-3 text-sm outline-none outline-1 outline-gray-400 focus:outline-2 focus:outline-btn/50 md:py-1 md:text-base"
                        pattern="\d*"
                        inputMode="numeric"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="mt-1 text-xs text-red-500"
                      />
                    </main>
                    <div className="flex w-full justify-end">
                      <div>
                        <ButtonComp
                          disable={
                            !dirty || !!errors.phone || !!errors.username
                          }
                          text={loading ? "Loading..." : "Submit"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Form>
          );
        }}
      </Formik>
      <ChangeEmailTenant />
    </div>
  );
};

export default Profilepage;
