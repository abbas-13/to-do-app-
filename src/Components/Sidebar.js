import { ToDoList } from "./To-DoList";
import { SearchBar } from "./SearchBar";
import { ListsContext } from "../Context/ListsContext";
import { SelectListContext } from "../Context/SelectListContext";

import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const Sidebar = () => {
  const [listCreated, setListCreated] = useState(true);
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { lists, setLists } = useContext(ListsContext);
  const { selectList, setSelectedList } = useContext(SelectListContext);

  const addList = () => {
    setListCreated(false);
    const newId = uuidv4();
    const newList = { id: newId };

    setLists((prevLists) => [newList, ...prevLists]);
    selectList(newId);
  };

  const createList = (name) => {
    const updatedToDoLists = lists.map((list) =>
      list.name || !list.id ? list : { ...list, name }
    );

    localStorage.setItem("toDoLists", JSON.stringify(updatedToDoLists));
    setLists(updatedToDoLists);
    setSelectedList(updatedToDoLists[0]);
  };

  const deleteList = (id) => {
    const updatedToDoLists = lists.filter((toDoList) => toDoList.id !== id);
    localStorage.setItem("toDoLists", JSON.stringify(updatedToDoLists));
    setLists(updatedToDoLists);
    selectList(null);
  };

  return (
    <div>
      <div className="p-4 h-full w-64 bg-gray-200">
        <SearchBar
          setSearchResult={setSearchResult}
          lists={lists}
          createList={createList}
          deleteList={deleteList}
          listCreated={listCreated}
          setListCreated={setListCreated}
          input={input}
          setInput={setInput}
        />
        <div className="flex my-4 items-center justify-center w-full">
          <Button variant="contained" onClick={addList} endIcon={<AddIcon />}>
            Create List
          </Button>
        </div>
        {input?.length
          ? searchResult?.map((searchResult) => (
              <ToDoList
                key={searchResult.id}
                list={searchResult}
                createList={createList}
                deleteList={deleteList}
                listCreated={listCreated}
                setListCreated={setListCreated}
              />
            ))
          : lists?.map((list) => (
              <ToDoList
                key={list.id}
                list={list}
                createList={createList}
                deleteList={deleteList}
                listCreated={listCreated}
                setListCreated={setListCreated}
                autoFocus
              />
            ))}
      </div>
    </div>
  );
};
