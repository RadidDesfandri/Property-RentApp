import { RoomData } from "@/types/property";
import Image from "next/image";
import React from "react";

const GridCardRooms = ({ data }: { data: RoomData }) => {
  const totalImg = data.RoomPic.length;
  const roomPic = data.RoomPic;
  return (
    <div className="grid gap-2">
      {totalImg === 1 && (
        <div className="col-span-1">
          <Image
            src={roomPic[0].url}
            alt="Image"
            width={300}
            height={300}
            className="h-[300px] w-full rounded-lg object-cover"
          />
        </div>
      )}
      {totalImg === 2 && (
        <div className="grid grid-cols-2 gap-2">
          {roomPic.map((item, idx) => {
            return (
              <Image
                key={idx}
                src={item.url}
                alt={`Image ${idx + 1}`}
                width={300}
                height={300}
                className="h-auto w-full rounded-lg object-cover"
              />
            );
          })}
        </div>
      )}
      {totalImg === 3 && (
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          {roomPic.slice(0, 1).map((item, idx) => {
            return (
              <div key={idx} className="col-span-2 row-span-2">
                <Image
                  src={item.url}
                  alt={`Image ${idx + 1}`}
                  width={300}
                  height={300}
                  className="h-[300px] w-full rounded-lg object-cover"
                />
              </div>
            );
          })}
          {roomPic.slice(1).map((item, idx) => {
            return (
              <div key={idx} className="col-span-1 row-span-1">
                <Image
                  src={item.url}
                  alt={`Image ${idx + 1}`}
                  width={300}
                  height={300}
                  className="h-[146px] w-full rounded-lg object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
      {totalImg === 4 && (
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1 row-span-2">
            <Image
              src={roomPic[0].url}
              alt="Image 1"
              width={300}
              height={300}
              className="h-[300px] w-full rounded-lg object-cover"
            />
          </div>

          <div className="grid grid-rows-2 gap-2">
            <div className="row-span-1">
              <Image
                src={roomPic[1].url}
                alt="Image 2"
                width={150}
                height={150}
                className="h-[150px] w-full rounded-lg object-cover"
              />
            </div>
            <div className="row-span-1 grid grid-cols-2 gap-2">
              {roomPic.slice(2, 4).map((item, idx) => {
                return (
                  <div key={idx} className="col-span-1">
                    <Image
                      src={item.url}
                      alt={`Image-${idx + 3}`}
                      width={150}
                      height={150}
                      className="h-[144px] w-full rounded-lg object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {totalImg === 5 && (
        <div className="grid grid-cols-4 grid-rows-1 gap-2">
          <div className="col-span-2 row-span-2">
            <Image
              src={roomPic[0].url}
              alt="Image 1"
              width={600}
              height={600}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src={roomPic[1].url}
              alt="Image 2"
              width={300}
              height={300}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <Image
              src={roomPic[2].url}
              alt="Image 3"
              width={300}
              height={300}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="col-span-1 row-span-1">
            <Image
              src={roomPic[3].url}
              alt="Image 4"
              width={300}
              height={300}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="col-span-1 row-span-1">
            <Image
              src={roomPic[4].url}
              alt="Image 5"
              width={300}
              height={300}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GridCardRooms;
