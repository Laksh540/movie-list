import React from "react";
import {
  BUTTON_VARIANT,
  TButtonVariant,
  TIconButtonType,
} from "../../constants";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import close from "../../assets/close.png";
import { log } from "console";

interface IButtonProps {
  onClick?: () => void;
  type: TIconButtonType;
  imgClassName: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}
const BUTTON_TYPES = {
  LEFT_ARROW: {
    icon: leftArrow,
    className: " filter-invert-1 ",
  },
  RIGHT_ARROW: {
    icon: rightArrow,
    className: " filter-invert-1 ",
  },
  CLOSE: {
    icon: close,
    className: "  ",
  },
};
const IconButton = (props: IButtonProps) => {
  const { onClick, type, imgClassName, onMouseDown, onMouseUp } = props;

  const getImgUrl = () => {
    return BUTTON_TYPES?.[type]?.icon;
  };

  const getClassName = () => {
    let finalClassName =
      "w-full h-full  cursor-pointer bg-transparent border-none ";

    if (BUTTON_TYPES?.[type]?.className) {
      finalClassName += BUTTON_TYPES?.[type]?.className;
    }
    return finalClassName;
  };

  return (
    <button className={getClassName()} onClick={onClick}>
      <img src={getImgUrl()} className={imgClassName} />
    </button>
  );
};

export default IconButton;
