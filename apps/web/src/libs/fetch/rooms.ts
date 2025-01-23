import { PeakSeasonType } from "@/types/property";
import { axiosInstance } from "../axios";

export const deleteRooms = async (id: string) => {
  const res = await axiosInstance.delete(`/api/rooms/delete/${id}`);
  return res;
};

export const getRoomsById = async (id: string, params: any) => {
  const res = await axiosInstance.get(`/api/rooms/get-roombyid/${id}`, {
    params,
  });
  return res;
};

export const getAllRooms = async (params: any) => {
  const res = await axiosInstance.get("/api/rooms/getall", { params });
  return res;
};

export const peakSeasons = async (id: string, payload: PeakSeasonType) => {
  const res = await axiosInstance.post(
    `/api/rooms/peak-season/${id}`,
    {
      startDate: payload.startDate,
      endDate: payload.endDate,
      priceIncrease: payload.priceIncrease,
      unavailable: payload.unavailable,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res;
};
