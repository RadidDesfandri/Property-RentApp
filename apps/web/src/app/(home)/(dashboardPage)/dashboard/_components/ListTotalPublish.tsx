"use client";

import { getPropertyPublish } from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";
import { useEffect, useState } from "react";
import CardPropertyDashboard from "./cardProperty";
import EmptyComp from "@/components/EmptyComp";
import SkeletonPropertyCard from "./loadingSkeleton";

const ListTotalPublish = () => {
  const [totalPublish, setDataPublish] = useState<DataProperty[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataPublish = async () => {
      try {
        const res = await getPropertyPublish();
        setDataPublish(res.data.property);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataPublish();
  }, []);

  const handleDelete = (id: string) => {
    setDataPublish((prev) => prev?.filter((item) => item.id.toString() !== id));
  };

  const handlePublish = (id: string) => {
    setDataPublish((prev) =>
      prev?.map((item) =>
        item.id.toString() === id ? { ...item, isActive: true } : item,
      ),
    );
  };

  const handleUnpublish = (id: string) => {
    setDataPublish((prev) =>
      prev?.map((item) =>
        item.id.toString() === id ? { ...item, isActive: false } : item,
      ),
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 place-items-center gap-3 py-2 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <SkeletonPropertyCard />
            <SkeletonPropertyCard />
            <SkeletonPropertyCard />
          </>
        ) : (
          totalPublish?.map((item) => {
            return (
              <CardPropertyDashboard
                key={item.id}
                data={item}
                onDraft={handleUnpublish}
                onDelete={handleDelete}
                onPublish={handlePublish}
              />
            );
          })
        )}
      </div>

      <div className="flex w-full items-center">
        {totalPublish?.length === 0 && (
          <div className="w-full">
            <EmptyComp
              text="Belum ada properti yang dipublish"
              width="w-[200px]"
              height="h-[200px]"
              sizetext="text-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTotalPublish;
