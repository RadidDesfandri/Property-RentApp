import { GrNext } from "react-icons/gr";

const ProgressSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, name: "Buat Properties" },
    { id: 2, name: "Buat Rooms" },
    { id: 3, name: "Review" },
  ];

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              currentStep === step.id
                ? "border-blue-500 bg-blue-500 text-xs text-white"
                : "border-gray-300 bg-white text-xs text-gray-400"
            }`}
          >
            {step.id}
          </div>
          <div
            className={`ml-2 text-sm font-medium ${
              currentStep === step.id ? "text-blue-500" : "text-gray-400"
            }`}
          >
            {step.name}
          </div>

          {index < steps.length - 1 && (
            <div className="mx-4">
              <GrNext className="text-gray-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
