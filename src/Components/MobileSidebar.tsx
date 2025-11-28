import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Drawer, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ToDoList } from "./To-DoList";
import { SearchBar } from "./SearchBar";
import { ListsContext } from "../Context/ListsContext";
import { SelectListContext } from "../Context/SelectListContext";
import type { ListsStateType, SelectedListState } from "../assets/Types";

interface MobileSidebarProps {
  open: boolean;
  toggleDrawer: (arg0: boolean) => void;
}

export const MobileSidebar = ({ open, toggleDrawer }: MobileSidebarProps) => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<ListsStateType[]>([]);

  const { lists, setLists } = useContext(ListsContext);
  const { selectList, setSelectedList } = useContext(SelectListContext);

  const addList = () => {
    const newId = uuidv4();
    const newList = { id: newId, name: "" };

    setLists((prevLists: ListsStateType[]) => [newList, ...prevLists]);
    selectList(newId, "");
  };

  const createList = (name: string) => {
    const updatedToDoLists = lists.map((list) =>
      list.name || !list.id ? list : { ...list, name }
    );

    localStorage.setItem("toDoLists", JSON.stringify(updatedToDoLists));
    setLists(updatedToDoLists);
    setSelectedList(updatedToDoLists[0]);
  };

  const deleteList = (id: string) => {
    const updatedToDoLists = lists.filter(
      (toDoList: SelectedListState) => toDoList.id !== id
    );
    localStorage.setItem("toDoLists", JSON.stringify(updatedToDoLists));
    setLists(updatedToDoLists);
    selectList("", "");
  };

  return (
    <Drawer
      open={open}
      onClose={() => toggleDrawer(false)}
      elevation={20}
      sx={{
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: "240px",
          transition: "width 0.3s ease",
        },
      }}
    >
      <SearchBar
        setSearchResult={setSearchResult}
        lists={lists}
        input={input}
        setInput={setInput}
      />
      <div className="flex my-4 items-center justify-center w-full">
        <Button variant="contained" onClick={addList} endIcon={<AddIcon />}>
          Create List
        </Button>
      </div>
      {input?.length
        ? searchResult?.map((item: SelectedListState) => (
            <ToDoList
              key={item.id}
              list={item}
              createList={createList}
              deleteList={deleteList}
            />
          ))
        : lists?.map((list: SelectedListState) => (
            <ToDoList
              key={list.id}
              list={list}
              createList={createList}
              deleteList={deleteList}
            />
          ))}
    </Drawer>
  );
};
