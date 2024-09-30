import { RoomsQuery } from "@/types/property";
import { axiosInstance } from "../axios";

export const deleteRooms = async (id: string) => {
  const res = await axiosInstance.delete(`/api/rooms/delete/${id}`);
  return res;
};

export const getRoomsById = async (id: string) => {
  const res = await axiosInstance.get(`/api/rooms/get-roombyid/${id}`);
  return res;
};

export const getAllRooms = async (params: any) => {
  const res = await axiosInstance.get("/api/rooms/getall",{params});
  return res;
};
