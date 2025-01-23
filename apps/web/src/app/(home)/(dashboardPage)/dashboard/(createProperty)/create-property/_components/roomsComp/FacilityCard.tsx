import { RoomData } from "@/types/property";
import React from "react";
import { FaWifi } from "react-icons/fa6";
import {
  MdOutlineBedroomChild,
  MdOutlineBedroomParent,
  MdOutlineFreeBreakfast,
  MdOutlineShower,
} from "react-icons/md";

const FacilityCard = ({ data }: { data: RoomData }) => {
  return (
    <section>
      <h1 className="flex items-center gap-1 font-medium">
        <MdOutlineBedroomChild /> Fasilitas kamar
      </h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        {data.facility.map((item) => {
          if (item.name === "Wifi") {
            return (
              <div key={item.name} className="flex items-center gap-1">
                <FaWifi />
                <p>Wifi</p>
              </div>
            );
          } else if (item.name === "Single bed") {
            return (
              <div key={item.name} className="flex items-center gap-1">
                <MdOutlineBedroomChild />
                <p>Single bed</p>
              </div>
            );
          } else if (item.name === "Double bed") {
            return (
              <div key={item.name} className="flex items-center gap-1">
                <MdOutlineBedroomParent />
                <p>Double bed</p>
              </div>
            );
          } else if (item.name === "Breakfast") {
            return (
              <div key={item.name} className="flex items-center gap-1">
                <MdOutlineFreeBreakfast />
                <p>Breakfast</p>
              </div>
            );
          } else {
            return (
              <div key={item.name} className="flex items-center gap-1">
                <MdOutlineShower />
                <p>Shower</p>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default FacilityCard;
