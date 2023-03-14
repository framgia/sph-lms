import React from 'react';

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  width: number;
  height: number;
  className: string;
  resizable: boolean;
  name?: string;
  value?: string;
  eventHandler?: (...args: any[]) => any;
}

const Textfield: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  width,
  height,
  className,
  resizable,
  name,
  value,
  eventHandler
}: TextFieldProps) => {
  return (
    <div className="mb-4 h-auto w-auto">
      {label !== null && (
        <div>
          <label>{label}</label>
        </div>
      )}
      <textarea
        rows={height}
        cols={width}
        className={`${resizable ? 'resize' : 'resize:none'} ${className}`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={eventHandler}
      ></textarea>
    </div>
  );
};

Textfield.defaultProps = {
  label: '',
  placeholder: '',
  value: ''
};

export default Textfield;
