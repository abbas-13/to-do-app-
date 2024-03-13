import { useContext, useState } from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { SelectListContext } from "../Context/SelectListContext";
import { TextField, Box } from "@mui/material";

export const ToDoList = ({
  list,
  deleteList,
  createList,
  listCreated,
  setListCreated,
}) => {
  const { selectList } = useContext(SelectListContext);
  const [inputValue, setInputValue] = useState(list.name || "");

  const handleListNameChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box
      onClick={() => {
        selectList(list.id, list.name);
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createList(inputValue);
          setListCreated(true);
        }}
        className="flex max-w-fit m-2 items-center flex-grow"
      >
        <TextField
          id="standard-basic"
          sx={{ marginX: 2 }}
          variant="standard"
          onChange={(event) => handleListNameChange(event)}
          placeholder="List name..."
          value={inputValue}
        />
        <DeleteSweepIcon
          fontSize="medium"
          onClick={(event) => {
            event.stopPropagation();
            deleteList(list.id);
          }}
          style={{ cursor: "pointer" }}
        />
      </form>
    </Box>
  );
};
