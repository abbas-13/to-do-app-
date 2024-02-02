import { useEffect, useState } from "react";

import { Appshell } from "./Components/Appshell";
import { Modal } from "./Components/Modal";
import { ToDoItem } from "./Components/To-DoItem";

import { SelectListContext } from "./Context/SelectListContext";
import { ListsContext } from "./Context/ListsContext";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [lists, setLists] = useState([]);

  const [selectedList, setSelectedList] = useState();

  const selectList = (id, name) => {
    setSelectedList({ id, name });
  };

  const toggleModal = (event) => {
    setShowModal(!showModal);
    event.preventDefault();
  };

  const checkToDo = (toDoId) => {
    const updatedToDos = toDos.map((toDo) =>
      toDo.id === toDoId ? { ...toDo, isChecked: !toDo.isChecked } : toDo
    );

    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));

    setToDos(updatedToDos);
  };

  const deleteToDo = (toDoId) => {
    const updatedToDos = toDos.filter((toDo) => toDo.id !== toDoId);
    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));
    setToDos(updatedToDos);
  };

  useEffect(() => {
    setToDos(JSON.parse(localStorage.getItem("toDoData")) || []);
  }, []);

  useEffect(() => {
    setLists(JSON.parse(localStorage.getItem("toDoLists")) || []);
  }, []);

  return (
    <SelectListContext.Provider
      value={{ selectList, selectedList, setSelectedList }}
    >
      <ListsContext.Provider value={{ lists, setLists }}>
        <div>
          <Appshell>
            <h2 className="text-2xl font-semibold p-2">Reminders</h2>
            <h2 className="text-2xl p-2">{selectedList?.name || ""}</h2>
            <div className="border border-gray-200 m-2"></div>
            <div className="grid grid-cols-8">
              {selectedList?.name ? (
                <button
                  onClick={toggleModal}
                  className="m-2 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
                >
                  Add +
                </button>
              ) : null}
            </div>
            <div className="grid grid-rows-5">
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
              {showModal && (
                <Modal
                  selectedList={selectedList}
                  setShowModal={setShowModal}
                  setToDos={setToDos}
                  toggleModal={toggleModal}
                />
              )}
            </div>
          </Appshell>
        </div>
      </ListsContext.Provider>
    </SelectListContext.Provider>
  );
}

export default App;
