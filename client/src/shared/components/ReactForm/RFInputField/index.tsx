/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable react/display-name */
import React from 'react';
import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  error?: string | boolean;
  width?: string;
  height?: string;
  className?: string;
}

const RFInputField = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      placeholder,
      register,
      error,
      width,
      height,
      className,
      type,
      ...rest
    } = props;

    const propStyle = {
      width: width,
      height: height
    };

    return (
      <div className="mb-4">
        {label !== '' && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
        )}
        <input
          {...register}
          {...rest}
          type={type}
          ref={ref}
          className={`appearance-none border border-gray-300 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
          style={propStyle}
        />
        {error !== undefined && (
          <div className="text-red-700 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

RFInputField.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  id: '',
  width: '100%',
  height: '',
  className: ''
};

export default RFInputField;
