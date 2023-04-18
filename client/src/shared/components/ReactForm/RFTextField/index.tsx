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
  width?: string;
  height?: string;
  className?: string;
}

const RFTextField = forwardRef(
  (props: Props, ref: LegacyRef<HTMLTextAreaElement>) => {
    const { label, register, error, width, height, className, ...rest } = props;

    const propStyle = {
      width: width,
      height: height
    };

    const errorAlert = (error: string | boolean): string => {
      return error ? ' border-red-500' : ' border-gray-300';
    };

    return (
      <div className="mb-4">
        {label !== '' && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
        )}
        <textarea
          {...register}
          {...rest}
          ref={ref}
          className={`appearance-none border rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error !== undefined && errorAlert(error)
          } ${className}`}
          style={propStyle}
        ></textarea>
        {error !== undefined && (
          <div className="text-red-700 rounded relative" role="alert">
            <span className="block sm:inline text-sm">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

RFTextField.defaultProps = {
  label: '',
  placeholder: '',
  id: '',
  width: '100%',
  height: '200px',
  className: ''
};

export default RFTextField;
