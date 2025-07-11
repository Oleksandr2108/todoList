interface CustomButtonProps {
  type: "submit" | "button";
  text: string;
  disabled: boolean;
  classBtn: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  text,
  disabled,
  classBtn,
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`rounded-2xl bg-main text-2xl text-white font-semibold text-center py-1 ${classBtn}`}
      >
        {text}
      </button>
    </>
  );
};

export default CustomButton;
