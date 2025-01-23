import { Field, ErrorMessage } from "formik";
import { FC } from "react";
import { IoPricetagsOutline } from "react-icons/io5";

interface Props {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const RoomPrice: FC<Props> = ({ setFieldValue }) => (
  <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center">
    <div className="w-1/2">
      <h1 className="flex items-center gap-2 font-medium text-gray-500">
        <IoPricetagsOutline />
        <main>
          Normal Price Room<span className="text-red-500">*</span>
        </main>
      </h1>
      <Field
        name="price"
        placeholder="Masukkan harga room"
        className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 focus:outline-btn"
        inputMode="numeric"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        }}
      />
      <ErrorMessage
        name="price"
        component={"div"}
        className="text-sm text-red-700"
      />
    </div>
    <div className="w-1/2">
      <div>
        <h1 className="flex items-center gap-2 font-medium text-gray-500">
          <IoPricetagsOutline />
          <main>
            Discount Price Room
            <span className="text-red-500">*</span>
          </main>
        </h1>
        <Field
          name="pricediscount"
          placeholder="Masukkan harga room"
          className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 focus:outline-btn"
          inputMode="numeric"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
        />
        <ErrorMessage
          name="pricediscount"
          component={"div"}
          className="text-sm text-red-700"
        />
      </div>
    </div>
  </div>
);

export default RoomPrice;
