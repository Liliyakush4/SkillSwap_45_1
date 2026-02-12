import { useState } from "react";
import { Input, type InputProps } from "../input/Input";
import cls from "./PasswordInput.module.css";

type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput = ({
  value,
  onChange,
  placeholder,
  errorText,
  className,
  ...rest
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={[cls.container, className ?? ""].join(" ")}>
      <Input
        {...rest}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        errorText={errorText}
        className={cls.input}
      />

      <button
        type="button"
        className={cls.toggle}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? "🙈" : "👁"}
      </button>
    </div>
  );
};