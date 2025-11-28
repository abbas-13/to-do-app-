import { useContext, useState } from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { TextField, Box } from "@mui/material";

import { SelectListContext } from "../Context/SelectListContext";
import type { ToDoListProps } from "../assets/Types";

export const ToDoList = ({ list, deleteList, createList }: ToDoListProps) => {
  const { selectList } = useContext(SelectListContext);
  const [inputValue, setInputValue] = useState(list.name || "");

  const handleListNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
