import { FormDataInput, LoginType, UserType } from "@/types/user";
import { axiosInstance } from "../axios";
import { getCookie } from "../server";

export const registerAxiosTenant = async (payload: UserType) => {
  const res = await axiosInstance.post(
    "/api/tenant/register",
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

export const verifyOtpTenant = async (payload: UserType) => {
  const token = await getCookie("token");
  const res = await axiosInstance.post(
    "/api/tenant/verify-otp",
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

export const updateDataTenant = async (payload: FormDataInput) => {
  const token = await getCookie("token");
  const res = await axiosInstance.post(
    "/api/tenant/update-data",
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

export const loginTenant = async (payload: LoginType) => {
  const res = await axiosInstance.post(
    "/api/tenant/login",
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

export const forgotPasswordTenant = async (payload: UserType) => {
  const res = await axiosInstance.post("/api/tenant/forgot-password", {
    email: payload.email,
  });

  return res
};

export const resetPasswordTenant = async (password: string, token: string) => {
  const res = await axiosInstance.patch(
    "/api/tenant/reset-password",
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

export const editTenant = async (formData: FormData) => {
  const token = await getCookie("token");
  const res = await axiosInstance.patch("/api/tenant/edittenant", formData, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const sendVerificationChangeMailTenant = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance.post(
    "/api/tenant/send-mail",
    {},
    { headers: { Authorization: `Bearer ${token?.value}` } },
  );

  return res;
};

export const changeEmailTenant = async (email: string, token: string) => {
  const res = await axiosInstance.patch(
    "/api/tenant/change-mail",
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