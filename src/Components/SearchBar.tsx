import { TextField } from "@mui/material";

import type { SearchBarProps } from "../assets/Types";

export const SearchBar = ({
  lists,
  setSearchResult,
  input,
  setInput,
}: SearchBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const searchList = (query: string) => {
    const resultList = lists.filter(
      (list) => list.name.toLowerCase() === query.toLowerCase().trim()
    );
    if (input) {
      setSearchResult(resultList);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchList(input);
  };

  return (
    <form
      className="flex m-2 mx-5 items-center justify-center"
      onSubmit={handleSearch}
    >
      <TextField
        size="small"
        id="outlined-basic"
        placeholder="Search"
        variant="outlined"
        value={input}
        onChange={handleInputChange}
      />
    </form>
  );
};
