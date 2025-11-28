import { useForm } from "react-hook-form";

import type { ToDoFormInput, ToDoFormProps } from "../assets/Types";

export const ToDoForm = ({ toggleModal, onSubmit }: ToDoFormProps) => {
  const { register, handleSubmit } = useForm<ToDoFormInput>();

  return (
    <div className="rounded-lg w-full bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-center justify-center grid-cols-1 gap-2 m-4"
      >
        <div className="flex">
          <label className="m-2 text-md">To-Do Name:</label>
          <input
            {...register("toDoName", {
              required: "Please enter the name of your ToDo",
            })}
            type="text"
            name="toDoName"
            className="m-2 p-2 rounded-md flex-grow "
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Notes:</label>
          <input
            {...register("notes", { required: "Please enter your notes" })}
            type="text"
            name="notes"
            className="p-2 m-2 rounded-md flex-grow"
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Date:</label>
          <input
            {...register("date", {
              required: "Please enter the deadline date of your ToDo",
            })}
            className="flex-grow rounded-md pr-2 h-8 m-2 pl-2"
            type="date"
            name="date"
            id="finish by"
          />
          <input
            className="flex-grow rounded-md pr-2 h-8 m-2 pl-2"
            {...register("time", {
              required: "Please enter the deadline time of your ToDo",
            })}
            type="time"
            name="time"
            id="finish by"
          />
        </div>
        <div className="flex justify-center items-center">
          <input
            className="m-2 ml-8 flex-1 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
            type="submit"
          />
          <button
            className="m-2 mr-8 flex-1 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
            onClick={toggleModal}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
