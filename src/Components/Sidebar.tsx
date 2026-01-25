import { useContext, useState } from "react";
import { Menu, Plus } from "lucide-react";
import { Sidebar, SidebarContent, useSidebar } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/Components/ui/button";

import { ToDoList } from "./To-DoList";
import { SearchBar } from "./SearchBar";
import { ListsContext } from "../Context/ListsContext";
import { SelectListContext } from "../Context/SelectListContext";
import type { ListsStateType } from "../assets/Types";

export const CustomSidebar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<ListsStateType[]>([]);

  const { lists, setLists } = useContext(ListsContext);
  const { selectList, setSelectedList } = useContext(SelectListContext);
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const addList = async () => {
    try {
      const response = await fetch("/api/lists", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.error || `HTTP ${response.status}`);
      }

      const { body } = await response.json();
      const newList = { id: body._id, name: "" };

      setLists((prevLists) => [newList, ...prevLists]);
      selectList(body._id, "");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unkown error occurred";
      console.error(errorMessage);
    }
  };

  const createList = async (name: string): Promise<void> => {
    try {
      const updatedToDoLists = lists.map((list: ListsStateType) =>
        list.name || !list.id ? list : { ...list, name },
      );

      const response = await fetch(`/api/lists/${updatedToDoLists[0].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      setLists(updatedToDoLists);
      setSelectedList(updatedToDoLists[0]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unkown error occurred";
      console.error("Create list failed: ", errorMessage);
    }
  };

  const deleteList = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/lists/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const updatedToDoLists = lists.filter(
        (toDoList: { id: string }) => toDoList.id !== id,
      );

      setLists(updatedToDoLists);
      selectList("", "");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unkown error occurred";
      console.error("Delete list failed: ", errorMessage);
    }
  };

  const sideBarContent = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      {isMobile ? (
        <div className="h-screen flex">
          <div className="pt-6 pl-4 bg-[#F5FAFE]">
            <Sidebar>
              <SidebarContent className="gap-0 w-[230px]!">
                {sideBarContent()}
              </SidebarContent>
            </Sidebar>
            <Menu onClick={toggleSidebar} />
          </div>
        </div>
      ) : (
        <div className="p-2 w-52 bg-[#FAFBFF] border-r-2 border-r-grey-400">
          {sideBarContent()}
        </div>
      )}
    </>
  );
};
