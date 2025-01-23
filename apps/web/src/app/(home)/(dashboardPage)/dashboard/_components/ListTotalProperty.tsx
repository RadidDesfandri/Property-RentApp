"use client";

import { getPropertyByTenantId } from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";
import React, { useEffect, useState } from "react";
import CardPropertyDashboard from "./cardProperty";
import EmptyComp from "@/components/EmptyComp";
import SkeletonPropertyCard from "./loadingSkeleton";

const ListTotalProperty = () => {
  const [totalAll, setData] = useState<DataProperty[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPropertyByTenantId();
        setData(res.data.property);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setData((prev) => prev?.filter((item) => item.id.toString() !== id));
  };

  const handlePublish = (id: string) => {
    setData((prev) =>
      prev?.map((item) =>
        item.id.toString() === id ? { ...item, isActive: true } : item,
      ),
    );
  };

  const handleUnpublish = (id: string) => {
    setData((prev) =>
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
          totalAll?.map((item) => {
            return (
              <CardPropertyDashboard
                key={item.id}
                data={item}
                onDelete={handleDelete}
                onDraft={handleUnpublish}
                onPublish={handlePublish}
              />
            );
          })
        )}
      </div>

      <div className="flex w-full items-center">
        {totalAll?.length === 0 && (
          <div className="w-full">
            <EmptyComp
              text="Belum ada property"
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

export default ListTotalProperty;
