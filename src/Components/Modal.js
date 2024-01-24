import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ToDoForm } from "./To-DoForm";

export const Modal = ({ toggleModal, setToDos, setShowModal }) => {
  const [formData, setFormData] = useState({
    id: "",
    toDoName: "",
    notes: "",
    date: "",
    time: "",
    isChecked: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newId = uuidv4();

    const newToDo = {
      id: newId,
      toDoName: formData.toDoName,
      notes: formData.notes,
      date: formData.date,
      time: formData.time,
      isChecked: false,
    };

    const usersToDos = JSON.parse(localStorage.getItem("toDoData")) || [];

    const updatedToDos = [...usersToDos, newToDo];

    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));
    setToDos(updatedToDos);

    setFormData({
      id: "",
      toDoName: "",
      notes: "",
      date: "",
      time: "",
      isChecked: false,
    });

    setShowModal(false);
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 flex justify-center items-center min-h-screen w-full bg-gray-200 bg-opacity-50"
      onClick={toggleModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" p-2 bg-white flex flex-col items-center shadow-lg justify-center border border-gray-200 rounded-lg"
      >
        <ToDoForm
          toggleModal={toggleModal}
          setToDos={setToDos}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
