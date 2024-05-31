import React, { useEffect, useMemo, useState } from "react";
import { BUTTON_VARIANT, TButtonVariant } from "../../constants";
import downArrowIcon from "../../assets/down-arrow.png";
interface IButtonProps {
  onChange: (option: any) => void;
  value: string;
  options: any[];
  optionLabel: string;
  optionValue: string;
  placeholder: string;
  // label: string;
}
const SimpleDropdown = (props: IButtonProps) => {
  const { onChange, value, options, optionLabel, optionValue, placeholder } =
    props;
  const [showDropdownPanel, setShowDropdownPanel] = useState(false);

  const displayValue = useMemo(() => {
    const result = options.find((record) => record[optionValue] === value);
    return result?.[optionLabel];
  }, [value, options]);

  const getClassName = (selected: string) => {
    let finalClassName =
      " p-0-5 text-left w-full bg-dark-gray-2 border-1 border-radius-6 p-0-5 cursor-pointer text-sm text-white ";

    if (!selected) {
      finalClassName += " text-mid-dark-gray";
    }
    return finalClassName;
  };

  const getPanelClassName = () => {
    return showDropdownPanel
      ? ` z-100 dropdown-panel-width absolute cursor-pointer p-0-5 
      relative dropdown-panel flex flex-col text-white  text-sm
       bg-dark-gray-2  border-radius-6`
      : "hidden";
  };

  const onChangeOption = (option: any) => {
    onChange?.(option);
    setShowDropdownPanel(false);
  };

  const onToggle = () => {
    setShowDropdownPanel((prev) => !prev);
  };

  const onBlurButton = () => {
    setTimeout(() => {
      setShowDropdownPanel(false);
    }, 500);
  };

  console.log("options from component", options);

  return (
    <div className="w-full relative">
      <button
        className={getClassName(displayValue)}
        onClick={onToggle}
        onBlur={onBlurButton}
      >
        <div className="flex justify-between align-center">
          <div>{displayValue ?? placeholder}</div>
          <div className="w-20 h-20 filter-invert-1">
            <img src={downArrowIcon} className="w-20 h-20" />
          </div>
        </div>
      </button>
      <div className={getPanelClassName()}>
        {options?.map((option: any) => (
          <div
            key={option?.[optionValue]}
            className="pb-0_5 pt-0_5"
            onClick={() => {
              onChangeOption(option);
            }}
          >
            {option?.[optionLabel]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleDropdown;
