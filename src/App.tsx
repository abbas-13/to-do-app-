import { useEffect, useState } from "react";

import { Appshell } from "./Components/Appshell";
import { SelectListContext } from "./Context/SelectListContext";
import { ListsContext } from "./Context/ListsContext";
import type {
  ListsStateType,
  SelectedListState,
  ToDoState,
} from "./assets/Types";
import "./App.css";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const [toDos, setToDos] = useState<ToDoState[]>([]);
  const [lists, setLists] = useState<ListsStateType[]>([]);
  const [selectedList, setSelectedList] = useState<SelectedListState>({
    id: "",
    name: "",
  });

  const fetchToDos = async (id: string) => {
    try {
      const response = await fetch(`/api/toDos/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error fetching To Dos: ", await response.json());
      }

      const toDoData = await response.json();
      const sortedToDos = toDoData.sort(
        (a: ToDoState, b: ToDoState) =>
          new Date(a.date).valueOf() - new Date(b.date).valueOf(),
      );

      setToDos(sortedToDos);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unkown error occurred";
      console.error("Fetching To Dos failed: ", errorMessage);
    }
  };

  const selectList = (id: string, name?: string) => {
    setSelectedList({ id, name: name ? name : "" });
    fetchToDos(id);
  };

  useEffect(() => {
    const fetchToDoLists = async () => {
      try {
        const response = await fetch(`/api/lists`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(await response.json());
        }

        const toDoLists = await response.json();
        setLists(toDoLists);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unkown error occurred";
        console.error("Error while fetching lists: ", errorMessage);
      }
    };

    fetchToDoLists();
  }, []);

  return (
    <SelectListContext.Provider
      value={{ selectList, selectedList, setSelectedList }}
    >
      <ListsContext.Provider value={{ lists, setLists }}>
        <Appshell>
          <Dashboard toDos={toDos} setToDos={setToDos} />
        </Appshell>
      </ListsContext.Provider>
    </SelectListContext.Provider>
  );
};

export default App;
