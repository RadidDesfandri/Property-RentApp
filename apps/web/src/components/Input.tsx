import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  as?: string;
  id?: string;
  children?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  className,
  as,
  children,
  id,
}) => {
  return (
    <div>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        as={as}
        id={id}
        className={className}
      >
        {children}
      </Field>
    </div>
  );
};

export const InputErr: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  className,
  as,
  children,
  id,
}) => {
  return (
    <div>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        as={as}
        id={id}
        className={className}
      >
        {children}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-xs text-red-700"
      />
    </div>
  );
};
