import { useState } from "react";
import { Input, type InputProps } from "../input/Input";
import cls from "./PasswordInput.module.css";
import showIcon from "../../../shared/assets/icons/ui/icon_password_show.svg";
import hideIcon from "../../../shared/assets/icons/ui/icon_password_hide.svg";

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
        type={isVisible ? "show password" : "hide password"}
        errorText={errorText}
        className={cls.input}
      />

    <button
        type="button"
        className={cls.toggle}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <img
          src={isVisible ? hideIcon : showIcon}
          alt="toggle password visibility"
        />
      </button>
    </div>
  );
};