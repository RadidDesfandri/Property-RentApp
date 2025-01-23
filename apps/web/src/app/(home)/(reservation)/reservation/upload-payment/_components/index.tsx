"use client";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import ProofPreview from "./imagePreview";
import { CiImageOn } from "react-icons/ci";
import { ButtonComp } from "@/components/ButtonComp";
import { axiosInstance } from "@/libs/axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { navigate } from "@/libs/server";
import TimerComp from "./proofTimer";
import { getReservation } from "@/libs/fetch/reservation";
const ImageInput = () => {
  const [status, setStatus] = useState<string>();
  const params = useParams();
  const reservation_id = params.reservation_id;
  useEffect(() => {
    const getRes = async () => {
      const res = await getReservation(reservation_id as string);
      setStatus(res.data[0].statusRes);
    };
    getRes();
  });
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const [isActiveImage, setIsActiveImage] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIsActiveImage(!false);
    if (file) {
      setSelectImage(file);
    }
  };
  const token = Cookies.get("token");
  const handleSubmit = async (image: File) => {
    const formData = new FormData();
    formData.append("media", image);
    try {
      const res = await axiosInstance.post(
        `/api/reservation/TF/proof/${reservation_id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      toast.success("success");
      navigate(`/reservation/payment/${reservation_id}`);
    } catch (error: any) {
      toast.error(
        error.response?.data || "error" || error.response?.data?.status,
      );
    }
  };
  return (
    <div className={``}>
      {status != "CANCEL" ? (
        <>
          <div className="flex flex-col lg:mt-10">
            <TimerComp />
          </div>
          <p className="font-semibold">Upload pembayaran disini</p>
          {isActiveImage ? (
            <label
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              htmlFor="profile"
              className="relative flex h-40 w-full cursor-pointer items-center justify-center rounded-xl border bg-slate-50 shadow-lg lg:h-[200px] lg:w-full"
            >
              <ProofPreview image={selectImage} />
              {isHover && (
                <div className="absolute top-0 flex h-40 w-full items-center justify-center rounded-xl bg-gray-300/20 transition-opacity duration-300 lg:h-[200px] lg:w-full">
                  <FiEdit className="h-5 w-5 text-hitam lg:h-8 lg:w-8" />
                  <p className="font-semibold text-hitam">Edit</p>
                </div>
              )}
              <input
                id="profile"
                type="file"
                name="profile"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <label
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              htmlFor="profile"
              className="relative flex h-40 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dotted bg-slate-50 shadow-lg lg:h-[200px] lg:w-[500px]"
            >
              <CiImageOn
                className={`h-14 w-14 text-hitam lg:h-16 lg:w-16 ${isHover ? "opacity-5" : "opacity-100"} transition-opacity duration-300`}
              />

              {isHover && (
                <div className="absolute top-0 flex h-40 w-full items-center justify-center rounded-xl bg-gray-300/20 transition-opacity duration-300 lg:h-[200px] lg:w-[500px]">
                  <FiEdit className="h-5 w-5 text-hitam lg:h-8 lg:w-8" />
                  <p className="font-semibold text-hitam">Edit</p>
                </div>
              )}
              <input
                id="profile"
                type="file"
                name="profile"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          <div
            className={`mt-2 lg:w-fit`}
            onClick={() => handleSubmit(selectImage!)}
          >
            <ButtonComp text="Kirim" disable={selectImage ? false : true} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center lg:mt-20 h-full">

       <h1 className="text-xl">Reservasi telah dibatalkan</h1>
       <button onClick={navigate('/')} className=" border-2 px-2 py-2 mt-4 rounded-full ">Kembali ke Home</button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
