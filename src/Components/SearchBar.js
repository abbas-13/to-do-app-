import { Box, TextField } from "@mui/material";

export const SearchBar = ({ lists, setSearchResult, input, setInput }) => {
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const searchList = (query) => {
    const resultList = lists.filter(
      (list) => list.name.toLowerCase() === query.toLowerCase().trim()
    );
    console.log(query);
    console.log(resultList);
    setSearchResult(input && resultList);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchList(input);
  };

  return (
    <div>
      <form
        className="flex my-2 items-center justify-center"
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
    </div>
  );
};
