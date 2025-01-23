import Image from "next/image";
import { FC } from "react";

interface EmptyProps {
  text: string;
  sizetext: string;
  width: string;
  height: string;
}

const EmptyComp: FC<EmptyProps> = ({ text, width, height, sizetext }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <Image
        src={"/empty.svg"}
        alt="Empty"
        width={300}
        height={300}
        className={`${width} ${height}`}
      />
      <p className={`text-center font-semibold text-btn ${sizetext}`}>{text}</p>
    </div>
  );
};

export default EmptyComp;
