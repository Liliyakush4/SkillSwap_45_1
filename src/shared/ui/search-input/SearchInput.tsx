import { Input } from "../input/Input";
import { type InputProps } from "../input/Input";
import cls from "./SearchInput.module.css";

type SearchInputProps = Pick<
  InputProps,
  "value" | "onChange" | "placeholder" | "className"
>;

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  className,
}: SearchInputProps) => {
  return (
    <div className={[cls.container, className ?? ""].join(" ")}>
      <span className={cls.icon}>🔍</span>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cls.input}
      />
    </div>
  );
};