"use client";

import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "./_components/SearchBar";
import PriceRange from "./_components/PriceRange";
import CategoryDropdown from "./_components/CategoryDropDown";
import ShortByDropDown from "./_components/ShortByDropDown";
import CardAllRooms, { RoomDataProps } from "./_components/CardAllRooms";
import { getAllRooms } from "@/libs/fetch/rooms";
import LoadingSkeletonAllRoom from "./_components/LoadingSkeletonAllRoom";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

interface TypeRooms {
  totalPage: number;
  total: number;
  room: RoomDataProps[];
}

const AllRooms = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<TypeRooms>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortByParam = searchParams.get("sortBy") || "price";
  const sortOrderParam = searchParams.get("sortOrder") || "asc";
  const categoryParam = searchParams.get("category") || "";
  const propertyNameParam = searchParams.get("propertyName") || "";
  const minPriceParam = searchParams.get("minPrice") || "0";
  const maxPriceParam = searchParams.get("maxPrice") || "5000000";
  const pageParams = searchParams.get("page") || "1";
  const locationParam = searchParams.get("location") || "";
  const startDateParam = searchParams.get("startDate") || "";
  const endDateParam = searchParams.get("endDate") || "";

  const [sortBy, setSortBy] = useState<string>(sortByParam);
  const [sortOrder, setSortOrder] = useState<string>(sortOrderParam);
  const [category, setCategory] = useState<string>(categoryParam);
  const [propertyName, setPropertyName] = useState<string>(propertyNameParam);
  const [minPrice, setMinPrice] = useState<number>(Number(minPriceParam));
  const [maxPrice, setMaxPrice] = useState<number>(Number(maxPriceParam));
  const [page, setPages] = useState<number>(Number(pageParams));
  const [location, setLocation] = useState<string>(locationParam);
  const [startDate, setStartDate] = useState<string>(startDateParam);
  const [endDate, setEndDate] = useState<string>(endDateParam);

  const handleSearch = (location: string, startDate: string, endDate: string) => {
    setLocation(location);
    setStartDate(startDate);
    setEndDate(endDate);
    setPages(1);
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    setPages(selected + 1);
  };

  const handleResetQuery = () => {
    setSortBy("price");
    setSortOrder("asc");
    setCategory("");
    setPropertyName("");
    setMinPrice(0);
    setMaxPrice(5000000);
    setPages(1);
    setLocation("");
    setStartDate("");
    setEndDate("");

    const resetQuery = new URLSearchParams({
      sortBy: "price",
      sortOrder: "asc",
      category: "",
      propertyName: "",
      location: "",
      page: "1",
      minPrice: "0",
      maxPrice: "5000000",
      startDate: "",
      endDaet: "",
    }).toString();

    router.push(`?${resetQuery}`);
  };

  const updateQueryParams = useCallback(() => {
    const query = new URLSearchParams({
      sortBy,
      sortOrder,
      category,
      propertyName,
      location,
      page: page.toString(),
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      startDate,
      endDate,
    }).toString();

    router.push(`?${query}`);
  }, [sortBy, sortOrder, category, propertyName, location, page, minPrice, maxPrice, startDate, endDate, router]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const params = { sortBy, sortOrder, propertyName, category, location, page, minPrice, maxPrice, startDate, endDate };
        const res = await getAllRooms(params);
        setRooms(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchRoom();
    }, 800);

    return () => clearTimeout(debounceFetch);
  }, [propertyName, category, minPrice, maxPrice, sortBy, sortOrder, page, location, startDate, endDate]);

  useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  return (
    <div className="w-full bg-btnhover pt-20">
      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 pb-5 pt-14 md:px-20">
          <SearchBar onSearch={handleSearch} />
          <div className="flex flex-col gap-4 pt-7 lg:flex-row lg:px-10">
            {/* Filter */}
            <div className="w-full lg:w-1/3">
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-hitam">Filter</p>
                <button
                  onClick={handleResetQuery}
                  className="text-sm text-gray-500 hover:text-gray-700">
                  Reset
                </button>
              </div>
              <p className="font-semibold text-hitam">Range harga</p>
              <p className="mb-4 text-xs text-gray-500">Per kamar, per malam</p>
              <PriceRange
                onChangePriceRange={(min: number, max: number) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
              <p className="mt-3 font-semibold text-hitam">Kategori</p>
              <CategoryDropdown
                onSelectCategory={(category) => setCategory(category)}
              />
            </div>

            {/*List Hotel card */}
            <div className="w-full">
              <div className="flex items-center justify-end">
                {/* Short by */}
                <div className="flex items-end gap-2">
                  <p className="font-semibold text-hitam">Short by</p>
                  <ShortByDropDown
                    onSelectSortBy={(sort) => {
                      if (sort === "Harga (Low to High)") {
                        setSortBy("price");
                        setSortOrder("asc");
                      } else if (sort === "Harga (High to Low)") {
                        setSortBy("price");
                        setSortOrder("desc");
                      } else if (sort === "Name (A-Z)") {
                        setSortBy("name");
                        setSortOrder("asc");
                      } else if (sort === "Name (Z-A)") {
                        setSortBy("name");
                        setSortOrder("desc");
                      }
                    }}
                  />
                </div>
              </div>
              {/* All rooms */}
              <div className="mt-4 flex flex-col gap-3 md:gap-5 lg:pl-5">
                {loading ? (
                  <>
                    <LoadingSkeletonAllRoom />
                    <LoadingSkeletonAllRoom />
                    <LoadingSkeletonAllRoom />
                  </>
                ) : rooms?.room.length! > 0 ? (
                  rooms?.room.map((data) => {
                    return <CardAllRooms key={data.id} data={data} />;
                  })
                ) : (
                  <p className="text-center">Tidak ada data kamar yang tersedia</p>
                )}
              </div>
              {rooms?.totalPage! > 1 && (
                <div className="mt-5 flex justify-end">
                  <Pagination
                    take={rooms?.total!}
                    total={rooms?.totalPage!}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
