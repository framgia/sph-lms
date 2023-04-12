/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable react/display-name */
import React from 'react';
import {
  type ForwardedRef,
  forwardRef,
  type SelectHTMLAttributes
} from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ label: string; value: string }>;
  register?: UseFormRegisterReturn;
  error?: string | boolean;
  width?: string;
  height?: string;
  className?: string;
}

const RFSelectField = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLSelectElement>) => {
    const {
      label,
      options,
      register,
      error,
      width,
      height,
      className,
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
        <select
          {...register}
          {...rest}
          ref={ref}
          className={`appearance-none border border-gray-300 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
          style={propStyle}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error !== undefined && (
          <div className="text-red-700 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

RFSelectField.defaultProps = {
  label: '',
  options: [],
  id: '',
  width: '100%',
  height: '',
  className: ''
};

export default RFSelectField;
