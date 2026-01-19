import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { type SubmitHandler } from "react-hook-form";

import { Appshell } from "./Components/Appshell";
import { ToDoItem } from "./Components/To-DoItem";
import { SelectListContext } from "./Context/SelectListContext";
import { ListsContext } from "./Context/ListsContext";
import type {
  ListsStateType,
  SelectedListState,
  ToDoState,
  ToDoFormInput,
} from "./assets/Types";
import "./App.css";
import { ToDoForm } from "./Components/To-DoForm";

const App = () => {
  const [toDos, setToDos] = useState<ToDoState[]>([]);
  const [lists, setLists] = useState<ListsStateType[]>([]);
  const [selectedList, setSelectedList] = useState<SelectedListState>({
    id: "",
    name: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ToDoFormInput> = async (data) => {
    const newId = uuidv4();
    console.log(data);
    const newToDo = {
      id: newId,
      list: selectedList.id,
      toDoName: data.toDoName,
      notes: data.notes,
      date: data.date,
      time: data.time,
      isChecked: false,
      priority: data.priority,
    };

    const usersToDos =
      JSON.parse(localStorage.getItem("toDoData") ?? "[]") || [];

    const updatedToDos = [newToDo, ...usersToDos];

    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));
    setToDos(updatedToDos);
    setIsDialogOpen(false);
    setIsSubmitSuccessful(true);
  };

  const selectList = (id: string, name?: string) => {
    setSelectedList({ id, name: name ? name : "" });
  };

  const checkToDo = (toDoId: string) => {
    const updatedToDos = toDos.map((toDo) =>
      toDo.id === toDoId ? { ...toDo, isChecked: !toDo.isChecked } : toDo
    );

    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));

    setToDos(updatedToDos);
  };

  const deleteToDo = (toDoId: string) => {
    const updatedToDos = toDos.filter((toDo) => toDo.id !== toDoId);
    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));
    setToDos(updatedToDos);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToDos = JSON.parse(localStorage.getItem("toDoData") ?? "[]");
      setToDos(storedToDos);
      const storedLists = JSON.parse(localStorage.getItem("toDoLists") ?? "[]");
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
          <h1 className="scroll-m-20 text-left px-2 text-4xl font-semibold tracking-tight text-balance">
            Task Overview
          </h1>
          <h3 className="scroll-m-20 text-2xl px-2 my-2 tracking-tight">
            {selectedList?.name || ""}
          </h3>
          <div className="border border-gray-200 m-2"></div>
          <ToDoForm
            onSubmit={onSubmit}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            isSubmitSuccessful={isSubmitSuccessful}
          />
          <div className="flex flex-col gap-2 p-2">
            {toDos
              .filter((toDo) => toDo.list === selectedList?.id)
              .map((toDo, index) => (
                <ToDoItem
                  key={index}
                  data={toDo}
                  checkToDo={checkToDo}
                  deleteToDo={deleteToDo}
                />
              ))}
          </div>
        </Appshell>
      </ListsContext.Provider>
    </SelectListContext.Provider>
  );
};

export default App;
