import style from "./css/SearchInput.module.css";
import SearchIcon from "../../assets/icon/Search.svg";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchInput = ({
  placeholder,
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <div className={style.searchInputWrapper}>
      <input
        className={style.searchInput}
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <span className={style.searchIcon}>
        <img src={SearchIcon} alt="Search" />
      </span>
    </div>
  );
};
