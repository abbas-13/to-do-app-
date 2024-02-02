import { useContext, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { SelectListContext } from "../Context/SelectListContext";

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
    <div
      onClick={() => {
        selectList(list.id, list.name);
      }}
      className="bg-gray-100 cursor-pointer flex shadow-md pt-2 pb-2 mt-2 mb-2 rounded-xl hover:drop-shadow-xl hover:bg-white active:bg-gray-100 active:shadow-sm aspect-w-1 aspect-h-1 max-w-xs max-h-xs group"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createList(inputValue);
          setListCreated(true);
        }}
        className="flex max-w-fit items-center flex-grow"
      >
        <input
          className="bg-gray-100 pl-2 pt-2 pb-2 ml-1 rounded-xl group-hover:bg-white group-active:bg-gray-100 flex-grow"
          type="text"
          value={inputValue}
          onChange={(event) => handleListNameChange(event)}
          placeholder="List name..."
        />
      </form>

      <div className="flex m-2 ml-auto items-center justify-center">
        <MdDeleteSweep
          className="size-5"
          onClick={(event) => {
            event.stopPropagation();
            deleteList(list.id);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
