import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { type SubmitHandler } from "react-hook-form";

import { ToDoForm } from "./To-DoForm";
import type { ModalProps, ToDoFormInput } from "../assets/Types";
import { SelectListContext } from "../Context/SelectListContext";
import styles from "./Modal.module.css";

export const Modal = ({ toggleModal, setToDos, setShowModal }: ModalProps) => {
  const { selectedList } = useContext(SelectListContext);
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
      className={styles["modal-background"]}
      onClick={toggleModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles["modal-body"]}
      >
        <ToDoForm toggleModal={toggleModal} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
