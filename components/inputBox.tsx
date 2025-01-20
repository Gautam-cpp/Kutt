interface InputBoxProps {
    type: string;
    name: string;
    placeholder: string;
    value?: string;
    error?: string; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export function InputBox({
    type,
    name,
    placeholder,
    value = "",
    onChange,
    error,
  }: InputBoxProps) {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-16 mt-4 px-[3rem] py-0 text-base letter tracking-wider text-[#444] bg-white rounded-full box-border border-b-[5px] ${
            error ? "border-red-500" : "border-b-[rgba(224,216,216,0.8)]"
          } shadow-[0_10px_35px_hsla(200,15%,70%,0.2)] focus:ring-0 focus:outline-none`}      />
    );
  }
  