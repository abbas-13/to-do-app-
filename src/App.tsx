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

  const selectList = (id: string, name?: string) => {
    setSelectedList({ id, name: name ? name : "" });
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToDos = JSON.parse(localStorage.getItem("toDoData") ?? "[]");
      const updatedToDos = storedToDos.sort(
        (a: ToDoState, b: ToDoState) =>
          new Date(b.date).valueOf() - new Date(a.date).valueOf(),
      );
      setToDos(updatedToDos);

      const response = await fetch(`/api/lists`);
      const storedLists = await response.json();
      setLists(storedLists);
    };
    fetchData();
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
