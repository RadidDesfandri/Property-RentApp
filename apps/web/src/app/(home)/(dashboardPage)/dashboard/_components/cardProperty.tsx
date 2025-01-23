"use client";

import {
  deleteProperty,
  publishProperty,
  unPublishProperty,
} from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCloudDownloadOutline, IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { GoTrash } from "react-icons/go";
import ModalDashboard from "./modalDashboard";

const CardPropertyDashboard = ({
  data,
  onDraft,
  onPublish,
  onDelete,
}: {
  data: DataProperty;
  onDraft: (id: string) => void;
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const handleSubmitPublish = async () => {
    setLoading(true);
    try {
      const res = await publishProperty(data.id!.toString());
      onPublish(data.id.toString());
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
      setIsPublish(false);
    }
  };

  const handleSubmitDraft = async () => {
    setLoading(true);
    try {
      const res = await unPublishProperty(data.id!.toString());
      onDraft(data.id.toString());
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
      setIsDraft(false);
    }
  };

  const handleSubmitDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteProperty(data.id!.toString());
      onDelete(data.id.toString());
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
      setIsDelete(false);
    }
  };
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-slate-50 shadow-md">
      <Image
        src={data.thumbnail}
        alt="Order image"
        width={500}
        height={500}
        className="h-[140px] w-full rounded-lg object-cover transition-all duration-300 hover:scale-110 md:h-[180px]"
      />
      <section className="h-full px-3 py-2">
        <div className="flex items-center justify-between gap-6 text-sm md:text-base">
          <div className="flex w-1/2 items-center gap-1">
            <FaLocationDot className="text-btn" />
            <p className="truncate font-medium text-hitam">{data.location}</p>
          </div>
          {data?.category === "Hotel" ? (
            <div className="flex items-center gap-1 text-gray-500">
              <RiHotelLine />
              <p>Hotel</p>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-500">
              <MdOutlineVilla />
              <p>Villa</p>
            </div>
          )}
        </div>
        <div className="text-sm md:text-base">
          <p className="line-clamp-2 h-[50px] font-semibold text-hitam">
            Nama Properti{" "}
            <span className="font-normal text-gray-500">{data.name}</span>
          </p>
        </div>
        <Link
          href={`/dashboard/${data.id}`}
          className="flex items-center justify-center gap-1 rounded-md bg-btn/10 py-1 text-gray-500 transition-all duration-150 hover:bg-btn/50 hover:text-hitam"
        >
          <FaRegEdit /> Edit Property
        </Link>
        {data.isActive === false ? (
          <button
            type="submit"
            onClick={() => setIsPublish(true)}
            className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-btn/10 py-1 text-gray-500 transition-all duration-150 hover:bg-green-400 hover:text-white"
          >
            <IoCloudDownloadOutline />
            {loading ? "Loading..." : "Publish"}
          </button>
        ) : (
          <button
            type="submit"
            onClick={() => setIsDraft(true)}
            className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-btn/10 py-1 text-gray-500 transition-all duration-150 hover:bg-red-500 hover:text-white"
          >
            <IoCloudUploadOutline />
            {loading ? "Loading..." : "Unpublish"}
          </button>
        )}
        <button
          type="submit"
          onClick={() => setIsDelete(true)}
          className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-btn/10 py-1 text-gray-500 transition-all duration-150 hover:bg-red-500 hover:text-white"
        >
          <GoTrash />
          Hapus
        </button>
      </section>
      {isDelete && (
        <ModalDashboard
          showModal={isDelete}
          image="/hapus.svg"
          handleSubmit={handleSubmitDelete}
          loading={loading}
          onClose={() => setIsDelete(false)}
          buttontext="Hapus"
          ketmodal="Apakah kamu yakin ingin menghapus properti ini?"
          nameProperty={`${data.name}`}
        />
      )}
      {isPublish && (
        <ModalDashboard
          showModal={isPublish}
          image="publish.svg"
          handleSubmit={handleSubmitPublish}
          loading={loading}
          onClose={() => setIsPublish(false)}
          buttontext="Ya"
          ketmodal="Apakah kamu yakin ingin publish properti ini?"
          nameProperty={`${data.name}`}
        />
      )}
      {isDraft && (
        <ModalDashboard
          showModal={isDraft}
          image="unpublish.svg"
          handleSubmit={handleSubmitDraft}
          loading={loading}
          onClose={() => setIsDraft(false)}
          buttontext="Ya"
          ketmodal="Apakah kamu yakin ingin unpublish properti ini?"
          nameProperty={`${data.name}`}
        />
      )}
    </div>
  );
};

export default CardPropertyDashboard;
