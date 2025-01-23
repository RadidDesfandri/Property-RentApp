import { Field, ErrorMessage } from 'formik';
import { MdMergeType } from 'react-icons/md';

interface TypeRoomSelectionProps {
  values: {
    type: string;
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const TypeRoomSelection: React.FC<TypeRoomSelectionProps> = ({ values, setFieldValue }) => (
  <main className="w-1/2">
    <h1 className="flex items-center gap-2 font-medium text-gray-500">
      <MdMergeType className="h-5 w-5" />
      <main>
        Type Room<span className="text-red-500">*</span>
      </main>
    </h1>
    <section className="mt-3 flex cursor-pointer gap-6 text-sm">
      {['Standard', 'Deluxe', 'Suite'].map((type) => (
        <div className="flex items-center gap-2" key={type}>
          <Field
            type="radio"
            name="type"
            id={`type-${type.toLowerCase()}`}
            value={type}
            checked={values.type === type}
            onChange={() => setFieldValue('type', type)}
          />
          <label htmlFor={`type-${type.toLowerCase()}`} className="cursor-pointer">
            {type}
          </label>
        </div>
      ))}
      <ErrorMessage name="type" component={"div"} className="text-sm text-red-700" />
    </section>
  </main>
);

export default TypeRoomSelection;
