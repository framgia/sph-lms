/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { forwardRef, type TextareaHTMLAttributes, type LegacyRef } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: string | boolean;
  className?: string;
  labelClass?: string;
}

const RFTextField = forwardRef((props: Props, ref: LegacyRef<HTMLTextAreaElement>) => {
  const { label, register, error, className, labelClass, ...rest } = props;

  const errorAlert = (error: string | boolean): string => {
    return error ? ' border-red-500' : ' border-gray-300';
  };

  return (
    <div className="mb-4">
      {label !== '' && (
        <label className={`block text-gray-700 text-sm font-semibold mb-2 ${labelClass}`}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`appearance-none border rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[200px] ${
          error !== undefined && errorAlert(error)
        } ${className}`}
        {...register}
        {...rest}
      ></textarea>
      {error !== undefined && (
        <div className="text-red-700 rounded relative" role="alert">
          <span className="block sm:inline text-sm">{error}</span>
        </div>
      )}
    </div>
  );
});

RFTextField.defaultProps = {
  label: '',
  placeholder: '',
  id: '',
  className: '',
  labelClass: '',
};

export default RFTextField;
