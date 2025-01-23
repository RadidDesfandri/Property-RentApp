import toast from "react-hot-toast";
import { axiosInstance } from "../axios";
import { getCookie } from "../server";

export const getListTransaction = async (query?: string) => {
  try {
    const token = await getCookie("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/reservationInfo/list${query ? `?status=${query}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token?.value}`,
        },
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionById = async (reservation_id: String) => {
  const res = await axiosInstance(`/api/reservationInfo/${reservation_id}`);
  return res.data;
};

export const confirmPayment = async (reservation_id: String) => {
  try {
    const token = await getCookie("token");
    // console.log("TOKENN", token?.value);
    await axiosInstance.patch(
      `/api/transaction/confirm/${reservation_id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token?.value}`,
        },
      },
    );
    toast.success("Transaksi Dikonfirmasi");
  } catch (error) {
    return error;
  }
};

export const rejectPayment = async (reservation_id: String) => {
  const token = await getCookie("token");
  const res = await axiosInstance.patch(
    `/api/transaction/reject/${reservation_id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token?.value}`,
      },
    },
  );
  return res;
};
export const cancelTransaction = async (reservation_id: String) => {
  const token = await getCookie("token");
  const res = await axiosInstance.patch(
    `/api/transaction/cancel/${reservation_id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token?.value}`,
      },
    },
  );
  return res;
};

export const getNotification = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance("/api/transaction/notif", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token?.value}`,
    },
  });
  return res.data;
};
