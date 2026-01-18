import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ToDoList } from "./To-DoList";
import { SearchBar } from "./SearchBar";
import { ListsContext } from "../Context/ListsContext";
import { SelectListContext } from "../Context/SelectListContext";
import type { ListsStateType } from "../assets/Types";
import { Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const Sidebar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<ListsStateType[]>([]);

  const { lists, setLists } = useContext(ListsContext);
  const { selectList, setSelectedList } = useContext(SelectListContext);

  const addList = () => {
    const newId = uuidv4();
    const newList = { id: newId, name: "" };

    setLists((prevLists) => [newList, ...prevLists]);
    selectList(newId, "");
  };

  const createList = (name: string) => {
    const updatedToDoLists = lists.map((list: ListsStateType) =>
      list.name || !list.id ? list : { ...list, name }
    );

    localStorage.setItem("toDoLists", JSON.stringify(updatedToDoLists));
    setLists(updatedToDoLists);
    setSelectedList(updatedToDoLists[0]);
  };

  const deleteList = (id: string) => {
    const updatedToDoLists = lists.filter(
      (toDoList: { id: string }) => toDoList.id !== id
    );
    localStorage.setItem("toDoLists", JSON.stringify(updatedToDoLists));
    setLists(updatedToDoLists);
    selectList("", "");
  };

  return (
    <div className="p-2 w-52 bg-[#FAFBFF] border-r-2 border-r-grey-400">
      <SearchBar
        setSearchResult={setSearchResults}
        lists={lists}
        input={input}
        setInput={setInput}
      />
      <div className="flex my-4 items-center justify-center w-full">
        <Button
          className="bg-[#2097f3] hover:bg-[#FFFFFF] hover:border-2 hover:border-[#2097f3] active:bg-[#2097f3] active:text-white hover:text-black active:outline-2 active:outline-[#85C7F8] hover:shadow-lg active:shadow-none active:border-1 active:border-white text-white"
          variant="outline"
          onClick={addList}
        >
          Create List
          <Plus strokeWidth={3} />
        </Button>
      </div>
      {input?.length
        ? searchResults?.map((item: { id: string; name: string }) => (
            <ToDoList
              key={item.id}
              list={item}
              createList={createList}
              deleteList={deleteList}
            />
          ))
        : lists?.map((list: ListsStateType) => (
            <ToDoList
              key={list.id}
              list={list}
              createList={createList}
              deleteList={deleteList}
            />
          ))}
    </div>
  );
};
