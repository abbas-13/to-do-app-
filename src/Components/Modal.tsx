import { v4 as uuidv4 } from "uuid";
import { type SubmitHandler } from "react-hook-form";

import { ToDoForm } from "./To-DoForm";
import type { ModalProps, ToDoFormInput } from "../assets/Types";

export const Modal = ({
  toggleModal,
  setToDos,
  setShowModal,
  selectedList,
}: ModalProps) => {
  const onSubmit: SubmitHandler<ToDoFormInput> = (data) => {
    const newId = uuidv4();

    const newToDo = {
      id: newId,
      list: selectedList.id,
      toDoName: data.toDoName,
      notes: data.notes,
      date: data.date,
      time: data.time,
      isChecked: false,
    };

    const usersToDos =
      JSON.parse(localStorage.getItem("toDoData") ?? "[]") || [];

    const updatedToDos = [newToDo, ...usersToDos];

    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));
    setToDos(updatedToDos);

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
        className="p-2 bg-white flex flex-col items-center shadow-lg justify-center border border-gray-200 rounded-lg"
      >
        <ToDoForm toggleModal={toggleModal} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
