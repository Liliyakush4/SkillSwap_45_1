import { Input } from "../input/Input";
import { type InputProps } from "../input/Input";
import cls from "./SearchInput.module.css";
import searchIcon from "../../../shared/assets/icons/ui/icon_search.svg";

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
      <span className={cls.icon}>
        <img src={searchIcon} alt="search" />
      </span>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cls.input}
      />
    </div>
  );
};