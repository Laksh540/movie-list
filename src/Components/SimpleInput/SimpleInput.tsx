interface IInputProps {
  onChange: (option: any) => void;
  value: string;
  placeholder: string;
  // label: string;
}
const SimpleInput = (props: IInputProps) => {
  const { onChange, value, placeholder } = props;

  const getClassName = () => {
    let finalClassName =
      "h-20 p-0-5 text-left w-full bg-dark-gray-2 border-1 border-radius-6 p-0-5  text-sm text-white outline-none";

    return finalClassName;
  };

  return (
    <div className="w-full relative">
      <input
        onChange={onChange}
        value={value}
        className={getClassName()}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SimpleInput;
