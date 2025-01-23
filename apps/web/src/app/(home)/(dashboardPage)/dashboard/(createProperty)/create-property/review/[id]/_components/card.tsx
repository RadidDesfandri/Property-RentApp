"use client";
import { getPropertyByid, publishProperty } from "@/libs/fetch/property";
import { resetStep } from "@/Redux/slices/stepSlice";
import { DataProperty } from "@/types/property";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineVilla } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { ButtonComp, ButtonCompStroke } from "@/components/ButtonComp";
import { navigate } from "@/libs/server";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import CardCreateRoom from "../../../_components/CardCreateRoom";

const Cardcomp = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState<DataProperty>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPropertyByid(id);
        setPropertyData(res.data.property);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmitDraft = () => {
    setLoading(true);
    try {
      navigate("/dashboard");
      toast.success("Properties are saved as drafts");
      dispatch(resetStep());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPublish = async () => {
    setLoading(true);
    try {
      const res = await publishProperty(id);
      toast.success(res.data.msg);
      navigate("/dashboard");
      dispatch(resetStep());
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <section className="mt-10 flex-row-reverse justify-between gap-2 lg:flex">
        <main className="lg:w-1/2">
          <Image
            src={propertyData?.thumbnail!}
            alt="Thumbnail"
            width={400}
            height={400}
            className="h-[300px] w-full rounded-3xl object-cover"
          />
        </main>

        <main className="mt-8 text-hitam lg:mt-0 lg:w-1/2">
          <h1 className="text-2xl font-medium lg:text-3xl">
            {propertyData?.name}
          </h1>
          <p className="text-xs text-gray-500">{propertyData?.location}</p>
          <main className="py-3">
            <h1 className="text-lg font-medium">Kategori</h1>
            {propertyData?.category === "Hotel" ? (
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
          </main>

          <main className="my-3 w-full text-sm text-gray-500">
            <h1 className="text-lg font-medium text-hitam">Deskripsi</h1>
            <p>{propertyData?.description}</p>
          </main>
        </main>
      </section>

      <main className="mb-10 flex w-full flex-col gap-7 pt-3">
        {propertyData?.Room.map((item) => {
          return <CardCreateRoom key={item.id} data={item} />;
        })}
      </main>

      <div className="mb-7 flex w-full justify-end">
        <main className="flex items-center gap-2">
          <div onClick={handleSubmitDraft} className="w-fit">
            <ButtonCompStroke disable={loading} text="Draft" />
          </div>
          <div onClick={handleSubmitPublish} className="w-fit">
            <ButtonComp disable={loading} text="Publish" />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Cardcomp;
