/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  error?: string | boolean;
  className?: string;
  id?: string;
  labelClass?: string;
}

const RFInputField = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, placeholder, register, error, className, type, id, labelClass, ...rest } = props;

  const errorAlert = (error: string | boolean): string => {
    return error ? ' border-red' : ' border-gray-300';
  };

  return (
    <div className="mb-4">
      {label !== '' && (
        <label
          htmlFor={id ?? ''}
          className={`block text-gray-700 text-sm font-semibold mb-2 ${labelClass}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        placeholder={placeholder}
        className={`appearance-none border rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error !== undefined && errorAlert(error)
        } ${className}`}
        {...register}
        {...rest}
      />
      {error !== undefined && (
        <div className="text-red rounded relative" role="alert">
          <span className="block sm:inline text-sm">{error}</span>
        </div>
      )}
    </div>
  );
});

RFInputField.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  id: '',
  className: '',
};

export default RFInputField;
