import { FormDataInput, LoginType, UserType } from "@/types/user";
import { axiosInstance } from "../axios";
import { getCookie } from "../server";

export const registerAxios = async (payload: UserType) => {
  const res = await axiosInstance.post(
    "/api/users/register",
    {
      email: payload.email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res;
};

export const verifyOtp = async (payload: UserType) => {
  const token = await getCookie("token");
  const res = await axiosInstance.post(
    "/api/users/verify-otp",
    {
      otp: payload.otp,
    },
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return res;
};

export const updateDataUser = async (payload: FormDataInput) => {
  const token = await getCookie("token");
  const res = await axiosInstance.post(
    "/api/users/update-data",
    {
      username: payload.username,
      phone: payload.phone,
      password: payload.password,
    },
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );
  return res;
};

export const loginUser = async (payload: LoginType) => {
  const res = await axiosInstance.post(
    "/api/users/login",
    {
      email: payload.email,
      password: payload.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res;
};

export const forgotPasswordUser = async (payload: UserType) => {
  const res = await axiosInstance.post("/api/users/forgot-password", {
    email: payload.email,
  });

  return res;
};

export const resetPasswordUser = async (password: string, token: string) => {
  const res = await axiosInstance.patch(
    "/api/users/reset-password",
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};

export const editUser = async (formData: FormData) => {
  const token = await getCookie("token");
  const res = await axiosInstance.patch("/api/users/edituser", formData, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const sendVerificationChangeMail = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance.post(
    "/api/users/send-mail",
    {},
    { headers: { Authorization: `Bearer ${token?.value}` } },
  );

  return res;
};

export const changeEmail = async (email: string, token: string) => {
  const res = await axiosInstance.patch(
    "/api/users/change-mail",
    {
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
};
