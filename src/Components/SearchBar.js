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
        className="flex p-2 rounded-lg items-center justify-center"
        onSubmit={handleSearch}
      >
        <input
          className="rounded-xl shadow-md hover:drop-shadow-xl hover:bg-white p-2 w-96 bg-gray-100"
          value={input}
          onChange={handleInputChange}
          placeholder="Search"
        />
      </form>
    </div>
  );
};
