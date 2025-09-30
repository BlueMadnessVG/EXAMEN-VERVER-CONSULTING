import style from "./css/SearchBar.module.css";
import { SearchInput } from "./SearchInput";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <div className={style.searchBar}>
      <SearchInput placeholder="Search..." value={query} onChange={setQuery} />
    </div>
  );
};
