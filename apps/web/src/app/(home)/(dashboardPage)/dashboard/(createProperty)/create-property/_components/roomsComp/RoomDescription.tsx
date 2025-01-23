import { MdOutlineDescription } from "react-icons/md";
import { Field, ErrorMessage } from "formik";

const RoomDescription = () => (
  <div>
    <h1 className="flex items-center gap-2 font-medium text-gray-500">
      <MdOutlineDescription />
      <main>
        Deskripsi Room<span className="text-red-500">*</span>
      </main>
    </h1>
    <Field
      name="description"
      as="textarea"
      placeholder="Masukkan deskripsi unit anda"
      className="min-h-52 w-full rounded-md border bg-transparent px-3 py-2 focus:outline-btn"
    />
    <ErrorMessage
      name="description"
      component="div"
      className="text-sm text-red-700"
    />
  </div>
);

export default RoomDescription;
