import { ICreateReservation, IReservation } from "@/types/reservation";
import { getCookie, navigate } from "../server";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios";
export const getRoomReservation = async (id: string) => {
  const res = await axiosInstance.get(`/api/rooms/get-roombyid/${id}`);
  return res.data.room;
};
export const createPaymentVA = async (payload: ICreateReservation) => {
  try {
    const { total, startDate, endDate, room_id, guest } = payload;
    const token = await getCookie("token");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NGROK_URL}/api/reservation/VA/${room_id}`,
      {
        guest: guest,
        price: total,
        startDate: startDate,
        endDate: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token?.value}`,
        },
      },
    );
    toast.success("Berhasil Membuat Reservasi, Lakukan proses pembayaran");
    navigate(res.data.URL);
  } catch (error: any) {
    typeof error.response?.data?.msg == "string"
      ? toast.error(error.response?.data?.msg)
      : toast.error("error");
    console.log(error);
  }
};

export const createPaymentTF = async (payload: ICreateReservation) => {
  const { total, startDate, endDate, room_id, guest } = payload;
  const token = await getCookie("token");
  try {
    const res = await axiosInstance.post(
      `/api/reservation/TF/${room_id}`,
      {
        guest: guest,
        price: total,
        startDate: startDate,
        endDate: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token?.value}`,
        },
      },
    );
    toast.success("Reservasi dibuat, silahkan upload bukti pembayaran");
    navigate(`/reservation/upload-payment/${res.data.id}`);
  } catch (error: any) {
    typeof error.response?.data?.msg == "string"
      ? toast.error(error.response?.data?.msg)
      : "error";
  }
};

export const getReservation = async (booking_id?: string) => {
  const token = await getCookie("token");
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/reservationInfo${booking_id ? `?booking_id=${booking_id}` : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token?.value}`,
      },
    },
  );
  return res.data;
};

export const cancelResersvationUser = async (reservation_id: string) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/reservation/TF/cancel/${reservation_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token?.value}`,
        },
      },
    );
    toast.success("reservasi dibatalkan");
  } catch (error) {
    return error;
  }
};

export const getPastReservation = async () => {
  try {
    const token = await getCookie("token");
    const res = await axiosInstance.get(`/api/reservationInfo/past`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token?.value}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getDateDisable = async (id: string) => {
  const res = await axiosInstance(`/api/reservationInfo/dates/${id}`);
  return res.data;
};
