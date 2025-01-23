import { RoomData } from "@/types/property";
import React, { useState } from "react";
import GridCardRooms from "../../(createProperty)/create-property/_components/roomsComp/GridCardRooms";
import { MdMergeType } from "react-icons/md";
import FacilityCard from "../../(createProperty)/create-property/_components/roomsComp/FacilityCard";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ModalDashboard from "../../_components/modalDashboard";
import { deleteRooms } from "@/libs/fetch/rooms";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import RoomCapacity from "../../(createProperty)/create-property/_components/roomsComp/RoomCapacity";
import RoomDescription from "../../(createProperty)/create-property/_components/roomsComp/RoomDescription";
import { ButtonComp } from "@/components/ButtonComp";
import RoomPrice from "../../(createProperty)/create-property/_components/roomsComp/RoomPrice";
import ModalPeakSeason from "./ModalPeakSeason";

const FormikEditRoom = ({ data }: { data: RoomData }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isPeakSeasons, setIsPeakSeasons] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteRoom = async () => {
    setLoading(true);
    try {
      const res = await deleteRooms(data.id);
      toast.success(res.data.msg);
      setIsDelete(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    type: data.type,
    price: data.price,
    pricediscount: data.pricediscount,
    capacity: data.capacity,
    description: data.description,
  };

  return (
    <section className="w-full rounded-md border p-5 text-gray-500">
      <Formik
        initialValues={initialValues}
        onSubmit={(value) => {
          alert(JSON.stringify(value));
        }}
      >
        {({ values, setFieldValue, dirty, errors }) => {
          return (
            <Form>
              <p className="flex items-center gap-1 text-xl font-semibold">
                <IoMdInformationCircleOutline /> Keterangan Room:{" "}
                {data.availability === false ? "Disewa" : "Disewakan"}
              </p>
              <main className="flex items-center gap-4 pb-4">
                <button
                  type="button"
                  onClick={() => setIsDelete(true)}
                  className="mt-2 flex items-center justify-center gap-1 rounded-md bg-btn/10 px-3 py-1 text-gray-500 transition-all duration-150 hover:bg-red-500 hover:text-white"
                >
                  <IoCloudUploadOutline />
                  Hapus
                </button>
                <button
                  type="button"
                  onClick={() => setIsPeakSeasons(!isPeakSeasons)}
                  className="mt-2 flex items-center justify-center gap-1 rounded-md bg-btn/10 px-3 py-1 text-gray-500 transition-all duration-150 hover:bg-green-500 hover:text-white"
                >
                  Naikkan harga room
                </button>
              </main>
              <GridCardRooms data={data} />

              <main className="mt-7">
                <div className="flex items-center justify-between gap-12">
                  <div>
                    <h1 className="flex items-center font-medium">
                      <MdMergeType className="h-5 w-5" /> Tipe Kamar
                    </h1>
                    <div className="flex gap-3">
                      {["Standard", "Deluxe", "Suite"].map((type) => (
                        <div className="flex items-center gap-1" key={type}>
                          <Field
                            type="radio"
                            name="type"
                            id={`type-${type.toLowerCase()}`}
                            value={type}
                            checked={values.type === type}
                            onChange={() => setFieldValue("type", type)}
                          />
                          <label
                            htmlFor={`type-${type.toLowerCase()}`}
                            className="cursor-pointer"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <RoomPrice setFieldValue={setFieldValue} />
                </div>
                <div className="mt-6">
                  <RoomCapacity values={values} setFieldValue={setFieldValue} />
                </div>
                <div className="my-6">
                  <FacilityCard data={data} />
                </div>
                <RoomDescription />
              </main>
              <div className="my-5">
                <ButtonComp
                  disable={
                    !dirty ||
                    !!errors.capacity ||
                    !!errors.description ||
                    !!errors.price ||
                    !!errors.pricediscount ||
                    !!errors.type
                  }
                  text={loading ? "Loading..." : "Simpan"}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      {isDelete && (
        <ModalDashboard
          showModal={isDelete}
          image="/hapus.svg"
          handleSubmit={handleDeleteRoom}
          loading={loading}
          onClose={() => setIsDelete(false)}
          buttontext="Ya"
          ketmodal="Apakah kamu yakin ingin hapus room ini?"
          nameProperty={`Room-${data.id}`}
        />
      )}
      {isPeakSeasons && (
        <ModalPeakSeason
          isPeakSeasons={isPeakSeasons}
          setIsPeakSeasons={setIsPeakSeasons}
          id={data.id}
        />
      )}

    </section>
  );
};

export default FormikEditRoom;
