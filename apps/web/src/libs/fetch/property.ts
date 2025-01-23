import { getCookie } from "../server";
import { axiosInstance } from "../axios";
import { RoomForm } from "@/types/property";

export const createPropertyfetch = async (formData: FormData) => {
  const token = await getCookie("token");

  const res = await axiosInstance.post("/api/property/create", formData, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const createRoomfetch = async (
  payload: RoomForm,
  id: string,
  files: File[],
) => {
  const token = await getCookie("token");
  const formData = new FormData();
  formData.append("type", payload.type);
  formData.append("price", payload.price);
  formData.append("pricediscount", payload.pricediscount);
  formData.append("capacity", payload.capacity.toString());
  formData.append("description", payload.description);
  formData.append("facility", payload.facility.join(","));

  files.forEach((file) => {
    formData.append("roompic", file);
  });
  const res = await axiosInstance.post(
    `/api/rooms/create-room/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return res;
};

export const publishProperty = async (id: string) => {
  const res = await axiosInstance.post(`/api/property/publish/${id}`);
  return res;
};

export const getRoomById = async (id: string) => {
  const res = await axiosInstance.get(`/api/rooms/get-room/${id}`);
  return res;
};

export const getPropertyByid = async (id: string) => {
  const res = await axiosInstance.get(`/api/property/${id}`);
  return res;
};

export const getPropertyByTenantId = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance.get("/api/property/getbytenant", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  return res;
};

export const getPropertyPublish = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance.get("/api/property/get-publish", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  return res;
};

export const getPropertyDraft = async () => {
  const token = await getCookie("token");
  const res = await axiosInstance.get("/api/property/get-draft", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  return res;
};

export const deleteProperty = async (id: string) => {
  const res = await axiosInstance.delete(`/api/property/delete-property/${id}`);
  return res;
};

export const unPublishProperty = async (id: string) => {
  const res = await axiosInstance.patch(`/api/property/unpublish/${id}`);
  return res;
};

export const editProperty = async (id: string, formData: FormData) => {
  const token = await getCookie("token");
  const res = await axiosInstance.patch(`/api/property/edit/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getAllProperty = async () => {
  const res = await axiosInstance.get("/api/property/get");
  return res
};
