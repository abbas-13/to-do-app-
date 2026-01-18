import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Sidebar, SidebarContent, useSidebar } from "./ui/sidebar";

import { ToDoList } from "./To-DoList";
import { SearchBar } from "./SearchBar";
import { ListsContext } from "../Context/ListsContext";
import { SelectListContext } from "../Context/SelectListContext";
import type { ListsStateType, SelectedListState } from "../assets/Types";

export const MobileSidebar = () => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<ListsStateType[]>([]);

  const { lists, setLists } = useContext(ListsContext);
  const { selectList, setSelectedList } = useContext(SelectListContext);
  const { toggleSidebar } = useSidebar();

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
    <>
      <Sidebar>
        <SidebarContent className="gap-0 w-[230px]!">
          <SearchBar
            setSearchResult={setSearchResult}
            lists={lists}
            input={input}
            setInput={setInput}
          />
          <div className="flex my-4 items-center justify-center w-full">
            <Button
              className="bg-[#2097f3] active:outline-2 active:outline-[#85C7F8] hover:bg-[#FFFFFF] hover:border-2 hover:border-[#2097f3] active:bg-[#2097f3] active:text-white hover:text-black hover:shadow-lg active:shadow-none active:border-1 active:border-white text-white"
              variant="outline"
              onClick={addList}
            >
              Create List
              <Plus />
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
        </SidebarContent>
      </Sidebar>
      <Menu onClick={toggleSidebar} />
    </>
  );
};
