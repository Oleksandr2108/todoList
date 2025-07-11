
import React from "react";
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?:boolean
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div className="flex flex-col mb-4 w-full">
        <label className="text-[14px] font-semibold text-secondary mb-2">
          {label}
        </label>
        <input
          ref={ref}
          {...rest}
          className="outline-none w-full h-8 px-5 border-[1px] border-grayLine rounded-md focus:border-main"
        />
      </div>
    );
  }
);
CustomInput.displayName = "CustomInput";
export default CustomInput;
