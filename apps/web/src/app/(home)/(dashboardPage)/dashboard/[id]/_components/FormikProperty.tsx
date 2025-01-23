"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/Input";
import { DataProperty, PropertyForm } from "@/types/property";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import { TbBuildingCommunity } from "react-icons/tb";
import { IoImageOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineCategory, MdOutlineDescription } from "react-icons/md";
import { ButtonComp } from "@/components/ButtonComp";
import { editProperty, getPropertyByid } from "@/libs/fetch/property";
import ThumbnailEditPreview from "./ThumbnailEditpreview";
import Image from "next/image";
import { AxiosError } from "axios";
import LoadingEditProperty from "./loadingEditProperty";

const maxFileSize = 1 * 1024 * 1024;

const FormikPropertyEdit = ({ id }: { id: string }) => {
  const [isActiveImage, setIsActiveImage] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataBe, setDataBe] = useState<DataProperty>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPropertyByid(id);
        const property = res.data.property;
        setDataBe(property);
        setThumbnailUrl(property.thumbnail);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading || !dataBe) {
    return <LoadingEditProperty />;
  }

  const onSubmit = async (data: PropertyForm) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("location", data.location);
    if (data.thumbnail && data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }
    try {
      const res = await editProperty(id, formData);
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        setIsActiveImage(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxFileSize) {
        toast.error("Ukuran file terlalu besar, maksimal 1MB");
      } else {
        setFieldValue("thumbnail", file);
        setThumbnailUrl(URL.createObjectURL(file));
        setIsActiveImage(true);
      }
    }
  };

  const initialValues: PropertyForm = {
    name: dataBe.name || "",
    description: dataBe.description || "",
    category: dataBe.category || "",
    location: dataBe.location || "",
    thumbnail: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ setFieldValue, values, dirty, errors }) => {
        return (
          <Form>
            <section className="mt-3 rounded-md border px-5 py-3">
              {/* Thumbnail start */}
              <h1 className="flex items-center gap-2 font-medium text-gray-500">
                <IoImageOutline />
                <main>
                  Unit Thumbnail<span className="text-red-500">*</span>
                </main>
              </h1>
              <main className="mb-8 h-[300px] px-10 py-2">
                {isActiveImage ? (
                  <label
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="relative cursor-pointer"
                  >
                    <ThumbnailEditPreview
                      setFieldValue={setFieldValue}
                      thumbnail={thumbnailUrl}
                    />
                    {isHover && (
                      <div className="absolute left-1/2 top-1/2 flex h-[300px] w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-gray-300/20 transition-all duration-300">
                        <FiEdit className="h-6 w-6 text-hitam lg:h-10 lg:w-10" />
                        <p className="text-lg font-semibold text-hitam">
                          Ganti
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="thumbnail"
                      id="thumbnail"
                      onChange={(event: any) =>
                        handleFileChange(event, setFieldValue)
                      }
                      className="hidden"
                    />
                  </label>
                ) : (
                  <label
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    htmlFor="thumbnail"
                    className="relative flex h-[300px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed"
                  >
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt="Thumbnail"
                        width={400}
                        height={400}
                        className="h-[300px] w-full rounded-md object-cover"
                      />
                    ) : (
                      <p>No thumbnail available</p>
                    )}
                    {isHover && (
                      <div className="absolute left-1/2 top-1/2 flex h-[300px] w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-gray-300/20 transition-all duration-300">
                        <FiEdit className="h-6 w-6 text-hitam lg:h-10 lg:w-10" />
                        <p className="text-lg font-semibold text-hitam">
                          Ganti
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="thumbnail"
                      id="thumbnail"
                      onChange={(event: any) =>
                        handleFileChange(event, setFieldValue)
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </main>

              {/* Nama properti start */}
              <main className="mb-8">
                <h1 className="flex items-center gap-2 font-medium text-gray-500">
                  <TbBuildingCommunity />
                  <main>
                    Nama Unit<span className="text-red-500">*</span>
                  </main>
                </h1>
                <Input
                  name="name"
                  placeholder="Masukkan nama unit anda"
                  className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 focus:outline-btn"
                />
              </main>

              {/* Lokasi dan kategori unit start */}
              <main className="mb-8 flex gap-10">
                {/* Lokasi sect */}
                <section className="w-1/2">
                  <h1 className="flex items-center gap-2 font-medium text-gray-500">
                    <IoLocationOutline />
                    <main>
                      Lokasi Unit<span className="text-red-500">*</span>
                    </main>
                  </h1>
                  <Input
                    name="location"
                    placeholder="Masukkan lokasi unit anda"
                    className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 focus:outline-btn"
                  />
                </section>

                {/* Kategori sect */}
                <section className="w-1/2">
                  <h1 className="flex items-center gap-2 font-medium text-gray-500">
                    <MdOutlineCategory />
                    <main>
                      Kategori Unit<span className="text-red-500">*</span>
                    </main>
                  </h1>
                  <section className="mt-3 flex cursor-pointer gap-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        id="category-villa"
                        value="Villa"
                        checked={values.category === "Villa"}
                        onChange={() => setFieldValue("category", "Villa")}
                      />
                      <label
                        htmlFor="category-villa"
                        className="cursor-pointer"
                      >
                        Villa
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        id="category-hotel"
                        value="Hotel"
                        checked={values.category === "Hotel"}
                        onChange={() => setFieldValue("category", "Hotel")}
                      />
                      <label
                        htmlFor="category-hotel"
                        className="cursor-pointer"
                      >
                        Hotel
                      </label>
                    </div>
                  </section>
                </section>
              </main>

              <main>
                <h1 className="flex items-center gap-2 font-medium text-gray-500">
                  <MdOutlineDescription />
                  <main>
                    Deskripsi Unit<span className="text-red-500">*</span>
                  </main>
                </h1>
                <textarea
                  name="description"
                  id="description"
                  value={values.description}
                  placeholder="Masukkan deskripsi unit anda"
                  className="min-h-52 w-full rounded-md border bg-transparent px-3 py-2 focus:outline-btn"
                  onChange={(e) => setFieldValue("description", e.target.value)}
                />
              </main>
            </section>
            <div className="my-4 flex w-full justify-end">
              <div className="w-fit">
                <ButtonComp
                  text={`${loading ? "Loading.." : "Simpan"}`}
                  disable={
                    loading ||
                    !dirty ||
                    !!errors.name ||
                    !!errors.category ||
                    !!errors.description ||
                    !!errors.location ||
                    !!errors.thumbnail
                  }
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikPropertyEdit;
