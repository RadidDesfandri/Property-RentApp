"use client";

import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { RoomForm } from "@/types/property";
import { FormRoom } from "@/Schemas/Schema";
import { createRoomfetch } from "@/libs/fetch/property";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ButtonComp } from "@/components/ButtonComp";
import TypeRoomSelection from "./roomsComp/TypeRoomSelection";
import ImagePreviewRoom from "./roomsComp/previewImgRoom";
import RoomFacilities from "./roomsComp/RoomFacility";
import RoomPrice from "./roomsComp/RoomPrice";
import RoomCapacity from "./roomsComp/RoomCapacity";
import RoomDescription from "./roomsComp/RoomDescription";
import { CiImageOn } from "react-icons/ci";

interface PropsFormik {
  onRoomClick: () => void;
  id: string;
}

const FormikRoom: FC<PropsFormik> = ({ onRoomClick, id }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const initialValues: RoomForm = {
    type: "",
    price: "",
    pricediscount: "",
    capacity: 1,
    description: "",
    facility: [],
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = Array.from(e.target.files);
      const maxFileSize = 1 * 1024 * 1024;
      const filterSize = newFile.filter((file) => {
        if (file.size > maxFileSize) {
          toast.error("Ukuran file terlalu besar, maksimal 1MB");
          return false;
        }
        return true;
      });
      const total = selectedFiles.length + filterSize.length;
      if (total > 5) {
        toast.error("Maksimal upload 5 gambar");
        return;
      }
      setSelectedFiles((prevFiles) => [...prevFiles, ...filterSize]);
    }
  };

  const onSumbitRoom = async (data: RoomForm) => {
    setLoading(true);
    try {
      const res = await createRoomfetch(data, id, selectedFiles);
      toast.success(res.data.msg);
      onRoomClick();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormRoom}
      onSubmit={(value) => {
        onSumbitRoom(value);
      }}
    >
      {({ values, setFieldValue, errors, dirty }) => {
        return (
          <Form>
            <section className="mb-8 flex flex-col text-hitam">
              <h1 className="flex items-center gap-2 font-medium text-gray-500">
                <CiImageOn />
                <main>
                  Preview Gambar<span className="text-red-500">*</span>
                </main>
              </h1>
              <section className="mb-8 flex gap-2">
                <ImagePreviewRoom
                  files={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                />
                <label htmlFor="roompic">
                  <h1 className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed text-center text-sm font-medium text-gray-500 transition duration-300 hover:bg-gray-300 hover:text-slate-50">
                    <CiImageOn className="h-5 w-5" />
                    <p>Upload gambar</p>
                  </h1>
                  <input
                    type="file"
                    id="roompic"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </section>
              <section className="flex">
                <TypeRoomSelection
                  values={values}
                  setFieldValue={setFieldValue}
                />
                <RoomFacilities />
              </section>
            </section>

            <section className="text-hitam">
              <RoomPrice setFieldValue={setFieldValue} />
              <RoomCapacity values={values} setFieldValue={setFieldValue} />
              <RoomDescription />
            </section>

            <div className="my-5">
              <ButtonComp
                disable={
                  !dirty ||
                  !!errors.capacity ||
                  !!errors.description ||
                  !!errors.facility ||
                  !!errors.price ||
                  !!errors.pricediscount ||
                  !!errors.type
                }
                text={loading ? "Loading..." : "Buat"}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikRoom;
