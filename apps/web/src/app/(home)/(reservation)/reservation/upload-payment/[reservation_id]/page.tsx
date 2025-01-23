import Footer from "@/components/Footer";

import ImageInput from "../_components";
import UploadFile from "../_components";
import TotalPrice from "../_components/totalPrice";

export default function UploadPayment() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center gap-5 px-5 pb-4 pt-6 lg:my-20 lg:flex-row lg:gap-20 lg:pb-0 lg:pt-0">
        <TotalPrice />
        <ImageInput />
      </div>
    </div>
  );
}
