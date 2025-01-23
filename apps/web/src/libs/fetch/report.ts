import { axiosInstance } from "../axios";
import { getCookie } from "../server";
export const getReportSalesProperty = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance("/api/report/byproperty", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token?.value}`,
    },
  });
  return res.data;
};

export const getReportSalesUser = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance("/api/report/byuser", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token?.value}`,
    },
  });
  return res.data;
};

export const getReportCalendar = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance("/api/report/calendar", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token?.value}`,
    },
  });
  return res.data;
};
export const getReportTransaction = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance("/api/report/byreservation", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token?.value}`,
    },
  });
  return res.data;
};
