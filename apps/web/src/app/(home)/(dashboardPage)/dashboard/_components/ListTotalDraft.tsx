"use client";

import { getPropertyDraft } from "@/libs/fetch/property";
import { DataProperty } from "@/types/property";
import React, { useEffect, useState } from "react";
import CardPropertyDashboard from "./cardProperty";
import EmptyComp from "@/components/EmptyComp";
import SkeletonPropertyCard from "./loadingSkeleton";

const ListTotalDraft = () => {
  const [totalDraft, setDataDraft] = useState<DataProperty[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataDraft = async () => {
      try {
        const res = await getPropertyDraft();
        setDataDraft(res.data.property);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataDraft();
  }, []);

  const handleDelete = (id: string) => {
    setDataDraft((prev) => prev?.filter((item) => item.id.toString() !== id));
  };

  const handlePublish = (id: string) => {
    setDataDraft((prev) =>
      prev?.map((item) =>
        item.id.toString() === id ? { ...item, isActive: true } : item,
      ),
    );
  };

  const handleUnpublish = (id: string) => {
    setDataDraft((prev) =>
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
          totalDraft?.map((item) => {
            return (
              <CardPropertyDashboard
                key={item.id}
                data={item}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onDraft={handleUnpublish}
              />
            );
          })
        )}
      </div>

      <div className="flex w-full items-center">
        {totalDraft?.length === 0 && (
          <div className="w-full">
            <EmptyComp
              text="Belum ada draft"
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

export default ListTotalDraft;
