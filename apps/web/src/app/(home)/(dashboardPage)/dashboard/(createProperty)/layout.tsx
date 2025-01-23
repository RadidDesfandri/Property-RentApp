"use client";

import "./globals.css";
import { useAppSelector } from "@/Redux/Hooks";
import { MdCreate } from "react-icons/md";
import ProgressSteps from "./create-property/_components/ProgresStep";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { navigate } from "@/libs/server";
import toast from "react-hot-toast";
import { resetStep } from "@/Redux/slices/stepSlice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentStep = useAppSelector((state) => state.step.currentStep);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
  return (
    <div>
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-1">
          <MdCreate className="h-5 w-5" />
          <h1 className="text-xs font-medium md:text-lg">Buat Properti</h1>
        </div>
        <ProgressSteps currentStep={currentStep} />
        <button
          type="submit"
          disabled={currentStep === 1}
          onClick={handleSubmitDraft}
          className="flex items-center gap-1 rounded-md border-2 border-btn px-2 py-1 font-medium text-btn hover:shadow-md disabled:cursor-not-allowed disabled:border-btnhover/30 disabled:text-btnhover/30 disabled:shadow-none"
        >
          <IoCloudDownloadOutline className="h-5 w-5" />
          <p>{loading ? "Loading..." : "Draft"}</p>
        </button>
      </div>

      <main className="mt-4">{children}</main>
    </div>
  );
}
