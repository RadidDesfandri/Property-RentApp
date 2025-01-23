import { FC } from "react";
import { FaRestroom, FaMinus, FaPlus } from "react-icons/fa6";

interface Props {
  values: { capacity: number };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const RoomCapacity: FC<Props> = ({ values, setFieldValue }) => {
  const handleIncrement = () => {
    if (values.capacity < 5) {
      setFieldValue("capacity", values.capacity + 1);
    }
  };

  const handleDecrement = () => {
    if (values.capacity > 1) {
      setFieldValue("capacity", values.capacity - 1);
    }
  };

  return (
    <div className="mb-8">
      <h1 className="flex items-center gap-2 font-medium text-gray-500">
        <FaRestroom />
        <main>
          Capacity Room<span className="text-red-500">*</span>
        </main>
      </h1>
      <div className="mt-3 flex h-10 w-fit gap-3 rounded-md border">
        <button onClick={handleDecrement} type="button" className="border-r p-2">
          <FaMinus className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={values.capacity}
          name="capacity"
          className="w-8 bg-transparent text-center"
          readOnly
        />
        <button onClick={handleIncrement} type="button" className="border-l p-2">
          <FaPlus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default RoomCapacity;
