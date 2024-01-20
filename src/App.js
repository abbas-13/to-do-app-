import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "react";

import { Appshell } from "./Components/Appshell";
import { Modal } from "./Components/Modal";
import { ToDoItem } from "./Components/To-DoItem";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [toDos, setToDos] = useState();

  const handleClick = (event) => {
    setShowModal(!showModal);
    event.preventDefault();
  };

  const handleChange = (toDoId) => {
    setToDos((prevToDos) => {
      const updatedToDos = prevToDos.map((toDo) =>
        toDo.id === toDoId ? { ...toDo, isChecked: !toDo.isChecked } : toDo
      );

      localStorage.setItem("toDoData", JSON.stringify(updatedToDos));

      return updatedToDos;
    });
  };

  const deleteToDo = (toDoId) => {
    setToDos((prevToDos) => {
      const updatedToDos = prevToDos.filter((toDo) => toDo.id !== toDoId);
      localStorage.setItem("toDoData", JSON.stringify(updatedToDos));

      return updatedToDos;
    });
  };

  useEffect(() => {
    setToDos(JSON.parse(localStorage.getItem("toDoData")) || []);
  }, []);

  console.log({ toDos });

  return (
    <div>
      <Appshell>
        <h2 className="text-2xl font-semibold p-2">Reminders</h2>
        <div className="border border-gray-200 m-2"></div>
        <div className="grid grid-cols-8">
          <button
            onClick={handleClick}
            className="m-2 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
          >
            Add +
          </button>
        </div>
        <div className="grid grid-rows-5">
          {toDos &&
            toDos.map((toDo, index) => (
              <ToDoItem
                key={index}
                data={toDo}
                handleChange={handleChange}
                deleteToDo={deleteToDo}
              />
            ))}
          {showModal && (
            <Modal
              setShowModal={setShowModal}
              setToDos={setToDos}
              buttonClick={handleClick}
            />
          )}
        </div>
      </Appshell>
    </div>
  );
}

export default App;
