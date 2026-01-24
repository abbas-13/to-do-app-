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
    const responseToDos = await fetch(`/api/toDos/${id}`, {
      method: "GET",
    });

    const toDos = await responseToDos.json();
    const sortedToDos = toDos.sort(
      (a: ToDoState, b: ToDoState) =>
        new Date(a.date).valueOf() - new Date(b.date).valueOf(),
    );

    setToDos(sortedToDos);
  };

  const selectList = (id: string, name?: string) => {
    setSelectedList({ id, name: name ? name : "" });
    fetchToDos(id);
  };

  useEffect(() => {
    const fetchToDoLists = async () => {
      const responseLists = await fetch(`/api/lists`, {
        method: "GET",
      });

      const toDoLists = await responseLists.json();
      setLists(toDoLists);
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
