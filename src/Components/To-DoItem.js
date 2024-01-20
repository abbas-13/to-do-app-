import { MdDeleteSweep } from "react-icons/md";

export const ToDoItem = ({ data, handleChange, deleteToDo }) => {
  const toDoClassName = data.isChecked
    ? "font-semibold text-gray-600 ml-2 line-through"
    : "ml-2 font-semibold";
  console.log(data);

  return (
    <div className="bg-gray-200 rounded-lg w-full m-2 p-2">
      <div className=" relative w-100%">
        <input
          type="checkbox"
          checked={data.isChecked}
          onChange={() => handleChange(data.id)}
        />
        <label className={toDoClassName}> {data.toDoName}</label>
        <div className="absolute flex items-center mr-2 inset-y-0 right-0">
          <MdDeleteSweep
            className="size-5"
            onClick={() => deleteToDo(data.id)}
            style={{ cursor: "pointer" }}
          />

          <label className="ml-2"> {data.date}</label>
          <label className="ml-2"> {data.time}</label>
        </div>
      </div>
      <p className="text-sm m-2 ml-6"> {data.notes}</p>
    </div>
  );
};
