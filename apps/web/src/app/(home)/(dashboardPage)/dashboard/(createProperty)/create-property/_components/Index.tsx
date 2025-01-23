"use client";

import FormikProperty from "./FormikProperty";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/Redux/Hooks";
import { nextStep, prevStep, resetStep } from "@/Redux/slices/stepSlice";
import DesignRoom from "../[id]/page";
import ReviewProperty from "../review/[id]/page";

const CreatePropertyPage = () => {
  const dispatch = useDispatch();
  const currentStep = useAppSelector((state) => state.step.currentStep);

  const handleNext = () => {
    dispatch(nextStep());
  };

  return (
    <div>
      <main className="mt-4">
        {currentStep == 1 ? (
          <FormikProperty nextButton={handleNext} />
        ) : currentStep == 2 ? (
          <DesignRoom />
        ) : (
          <ReviewProperty />
        )}
      </main>
    </div>
  );
};

export default CreatePropertyPage;
