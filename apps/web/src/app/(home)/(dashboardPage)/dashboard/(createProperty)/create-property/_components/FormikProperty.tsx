"use client";

import { InputErr } from "@/components/Input";
import { FormProperty } from "@/Schemas/Schema";
import { PropertyForm } from "@/types/property";
import { ErrorMessage, Form, Formik } from "formik";
import { FC, useState } from "react";
import ThumbnailPreview from "./ThumbnailPreview";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import { TbBuildingCommunity } from "react-icons/tb";
import { IoImageOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineCategory, MdOutlineDescription } from "react-icons/md";
import { createPropertyfetch } from "@/libs/fetch/property";
import { AxiosError } from "axios";
import { navigate } from "@/libs/server";
import { ButtonComp } from "@/components/ButtonComp";

const maxFileSize = 1 * 1024 * 1024;

interface PropsFormik {
  nextButton: () => void;
}

const FormikProperty: FC<PropsFormik> = ({ nextButton }) => {
  const [isActiveImage, setIsActiveImage] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [laoding, setLoading] = useState(false);

  const onSubmit = async (data: PropertyForm) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("location", data.location);
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }
    try {
      const res = await createPropertyfetch(formData);
      toast.success(res.data.msg);
      navigate(`/dashboard/create-property/${res.data.result.id}`);
      nextButton();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        setIsActiveImage(false)
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
        setIsActiveImage(!false);
      }
    }
  };

  const initialValues: PropertyForm = {
    name: "",
    description: "",
    category: "",
    location: "",
    thumbnail: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormProperty}
      onSubmit={(value) => {
        onSubmit(value);
        console.log(value);
      }}
    >
      {({ setFieldValue, values, dirty, errors }) => {
        return (
          <Form className="pb-5">
            <h1 className="text-lg font-semibold">Tentang Properti</h1>
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
                    <ThumbnailPreview
                      setFieldValue={setFieldValue}
                      thumbnail={values.thumbnail}
                    />
                    {isHover && (
                      <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-gray-300/20 transition-all duration-300">
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
                    htmlFor="thumbnail"
                    className="relative flex h-full w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <FiEdit className="h-6 w-6 text-hitam lg:h-10 lg:w-10" />
                        <p className="text-lg font-semibold text-hitam">
                          Unggah thumbnail
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Masukkan gambar dengan format jpg, jpeg, png dan tidak
                        lebih dari 1MB
                      </p>
                    </div>
                    <input
                      type="file"
                      name="thumbnail"
                      id="thumbnail"
                      onChange={(event: any) =>
                        handleFileChange(event, setFieldValue)
                      }
                      className="hidden"
                    />
                    <ErrorMessage
                      name="thumbnail"
                      component={"div"}
                      className="text-xm text-red-700"
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
                <InputErr
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
                  <InputErr
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
                  <ErrorMessage
                    name="category"
                    component={"div"}
                    className="text-sm text-red-700"
                  />
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
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-red-700"
                />
              </main>
            </section>
            <div className="my-4 flex w-full justify-end">
              <div className="w-fit">
                <ButtonComp
                  text={`${laoding ? "Loading.." : "Selanjutnya"}`}
                  disable={
                    laoding ||
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

export default FormikProperty;
