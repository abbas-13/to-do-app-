import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Card } from "@mui/material";

export const ToDoItem = ({ data, checkToDo, deleteToDo }) => {
  const toDoClassName = data.isChecked
    ? "font-semibold text-gray-600 ml-2 line-through"
    : "ml-2 font-semibold";

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        margin: "10px",
        minHeight: "80px",
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div className=" relative w-100%">
        <input
          type="checkbox"
          checked={data.isChecked}
          onChange={() => checkToDo(data.id)}
        />
        <label className={toDoClassName}> {data.toDoName}</label>
        <div className="absolute flex items-center mr-2 inset-y-0 right-0">
          <DeleteSweepIcon
            onClick={() => deleteToDo(data.id)}
            style={{ cursor: "pointer" }}
          />

          <label className="ml-2"> {data.date}</label>
          <label className="ml-2"> {data.time}</label>
        </div>
      </div>
      <p className="text-sm m-2 ml-6"> {data.notes}</p>
    </Card>
  );
};
