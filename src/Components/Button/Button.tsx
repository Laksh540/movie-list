import React from "react";
import { BUTTON_VARIANT, TButtonVariant } from "../../constants";

interface IButtonProps {
  onClick?: () => void;
  label: string;
  isSelected?: boolean;
  variant: TButtonVariant;
}
const Button = (props: IButtonProps) => {
  const { variant, onClick, isSelected, label } = props;

  const getClassName = () => {
    let finalClassName =
      "w-full border-1 border-radius-6 p-0-5 cursor-pointer ";

    if (variant === BUTTON_VARIANT.PRIMARY && !isSelected) {
      finalClassName += " bg-mid-dark-gray border-mid-dark-gray text-white";
    } else {
      finalClassName += " bg-red border-red text-white ";
    }
    return finalClassName;
  };
  return (
    <button className={getClassName()} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
