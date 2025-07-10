interface CustomInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?:boolean
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required
}) => {
  return (
    <div className="flex flex-col mb-4 w-full ">
      <label className="text-[14px] font-semibold text-secondary mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required = {required}
        className="outline-none w-full h-8 px-5 border-[1px] border-grayLine rounded-md focus:border-main"
      />
    </div>
  );
};

export default CustomInput;
