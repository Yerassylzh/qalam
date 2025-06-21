import React from "react";

interface Props {
  className?: string;
  onChange?: (isChecked: boolean) => void;
  isChecked?: boolean;
}

const RadioInput = ({ className, onChange, isChecked }: Props) => {
  return (
    <input
      type="radio"
      className={`
        appearance-none
        w-[32px] h-[32px]
        rounded-full
        border-2 border-gray-300
        checked:border-green-400
        checked:bg-green-400
        transition-colors
        ${className ? className : ""}
      `}
      onChange={(e) => onChange && onChange(e.target.checked)}
      checked={isChecked}
    />
  );
};

export default RadioInput;
