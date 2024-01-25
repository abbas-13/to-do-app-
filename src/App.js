import { useEffect, useState } from "react";

import { Appshell } from "./Components/Appshell";
import { Modal } from "./Components/Modal";
import { ToDoItem } from "./Components/To-DoItem";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [toDos, setToDos] = useState([]);

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

  return (
    <div>
      <Appshell>
        <h2 className="text-2xl font-semibold p-2">Reminders</h2>
        <div className="border border-gray-200 m-2"></div>
        <div className="grid grid-cols-8">
          <button
            onClick={toggleModal}
            className="m-2 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
          >
            Add +
          </button>
        </div>
        <div className="grid grid-rows-5">
          {toDos.map((toDo, index) => (
            <ToDoItem
              key={index}
              data={toDo}
              checkToDo={checkToDo}
              deleteToDo={deleteToDo}
            />
          ))}
          {showModal && (
            <Modal
              setShowModal={setShowModal}
              setToDos={setToDos}
              toggleModal={toggleModal}
            />
          )}
        </div>
      </Appshell>
    </div>
  );
}

export default App;
