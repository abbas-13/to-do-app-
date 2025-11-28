import { useForm } from "react-hook-form";

import type { ToDoFormInput, ToDoFormProps } from "../assets/Types";
import styles from "./To-DoForm.module.css";

export const ToDoForm = ({ toggleModal, onSubmit }: ToDoFormProps) => {
  const { register, handleSubmit } = useForm<ToDoFormInput>();

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return (
    <div className={styles["form-container"]}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["todo-input-form"]}
      >
        <div className="flex">
          <label className="m-2 text-md">To-Do Name:</label>
          <input
            {...register("toDoName", {
              required: "Please enter the name of your ToDo",
            })}
            type="text"
            name="toDoName"
            className={styles["todo-input-field"]}
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Notes:</label>
          <input
            {...register("notes", { required: "Please enter your notes" })}
            type="text"
            name="notes"
            className={styles["todo-input-field"]}
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Date:</label>
          <input
            {...register("date", {
              required: "Please enter the deadline date of your ToDo",
            })}
            className={styles["todo-date-time"]}
            type="date"
            name="date"
            id="finish by"
          />
          <input
            className={styles["todo-date-time"]}
            {...register("toDoName", {
              required: "Please enter the deadline time of your ToDo",
            })}
            type="time"
            name="time"
            id="finish by"
            min={formattedDate}
          />
        </div>

        <div className="flex justify-center items-center">
          <input
            className={`${styles["todo-form-buttons"]} ml-8`}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
          <button
            className={`${styles["todo-form-buttons"]} mr-8`}
            onClick={toggleModal}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
