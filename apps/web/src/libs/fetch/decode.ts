import { axiosInstance } from "../axios";

export const decodeToken = async (token: string) => {
  const res = await axiosInstance.get("/api/decode/token", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
