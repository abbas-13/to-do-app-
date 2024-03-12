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
        className="flex max-w-fit items-center flex-grow"
      >
        <TextField
          id="standard-basic"
          sx={{ marginX: 2 }}
          variant="standard"
          onChange={(event) => handleListNameChange(event)}
          placeholder="List name..."
          value={inputValue}
        />
      </form>

      <div className="flex m-2 ml-auto items-center justify-center">
        <DeleteSweepIcon
          className="size-5"
          onClick={(event) => {
            event.stopPropagation();
            deleteList(list.id);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </Box>
  );
};
