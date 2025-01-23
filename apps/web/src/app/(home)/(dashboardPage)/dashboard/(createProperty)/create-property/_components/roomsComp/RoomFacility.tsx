import { ErrorMessage, Field } from "formik";
import {
  MdOutlineBedroomChild,
  MdOutlineBedroomParent,
  MdOutlineFreeBreakfast,
  MdOutlineShower,
} from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
const RoomFacilities = () => {
  const facilityOpt = [
    { value: "Wifi", icon: <FaWifi /> },
    { value: "Double bed", icon: <MdOutlineBedroomParent /> },
    { value: "Single bed", icon: <MdOutlineBedroomChild /> },
    { value: "Breakfast", icon: <MdOutlineFreeBreakfast /> },
    { value: "Shower", icon: <MdOutlineShower /> },
  ];

  return (
    <div className="w-1/2">
      <h1 className="flex items-center gap-2 font-medium text-gray-500">
        <main>
          Fasilitas Room<span className="text-red-500">*</span>
        </main>
      </h1>
      <div className="mt-3 flex flex-wrap gap-5">
        {facilityOpt.map((item, idx) => {
          return (
            <label
              key={idx}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Field type="checkbox" value={item.value} name="facility" />{" "}
              {item.icon}
              <p>{item.value}</p>
            </label>
          );
        })}
      </div>
      <ErrorMessage
        name="facility"
        component={"div"}
        className="text-sm text-red-700"
      />
    </div>
  );
};

export default RoomFacilities;
