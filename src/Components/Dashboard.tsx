import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  CircleArrowDown,
  CircleArrowUp,
  CircleCheck,
  CircleEqual,
  Funnel,
} from "lucide-react";

import type { ToDoFormInput, ToDoState } from "@/assets/Types";
import { ToDoForm } from "@/Components/To-DoForm";
import { ToDoItem } from "@/Components/To-DoItem";
import { SelectListContext } from "@/Context/SelectListContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardProps {
  toDos: ToDoState[];
  setToDos: Dispatch<SetStateAction<ToDoState[]>>;
}

const Dashboard = ({ toDos, setToDos }: DashboardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const isSmallScreen = useIsMobile();

  const { selectedList } = useContext(SelectListContext);

  const onSubmit: SubmitHandler<ToDoFormInput> = async (data) => {
    const newId = uuidv4();

    const newToDo = {
      id: newId,
      list: selectedList.id,
      toDoName: data.toDoName,
      notes: data.notes,
      date: data.date,
      time: data.time,
      isChecked: false,
      priority: data.priority,
    };

    const usersToDos =
      JSON.parse(localStorage.getItem("toDoData") ?? "[]") || [];

    const updatedToDos = [newToDo, ...usersToDos];

    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));
    setToDos(updatedToDos);
    setIsDialogOpen(false);
    setIsSubmitSuccessful(true);
  };

  const checkToDo = (toDoId: string) => {
    const updatedToDos = toDos.map((toDo) =>
      toDo.id === toDoId ? { ...toDo, isChecked: !toDo.isChecked } : toDo
    );

    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));

    setToDos(updatedToDos);
  };

  const deleteToDo = (toDoId: string) => {
    const updatedToDos = toDos.filter((toDo) => toDo.id !== toDoId);
    localStorage.setItem("toDoData", JSON.stringify(updatedToDos));
    setToDos(updatedToDos);
  };

  const priorityFilter = (priority: string) => {
    const storedToDos = JSON.parse(localStorage.getItem("toDoData") ?? "[]");
    if (priority === "all") {
      setToDos(storedToDos);
    } else {
      const updatedToDos = storedToDos.filter(
        (item: ToDoState) => item.priority === priority
      );
      console.log({ storedToDos, toDos, updatedToDos });
      setToDos(updatedToDos);
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-left px-2 text-4xl font-semibold tracking-tight text-balance">
        Task Overview
      </h1>
      <h3 className="scroll-m-20 text-2xl px-2 my-2 tracking-tight">
        {selectedList?.name || ""}
      </h3>
      <div className="border border-gray-200 m-2"></div>
      {selectedList?.name ? (
        <div className="flex mx-2 justify-between">
          <ToDoForm
            onSubmit={onSubmit}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            isSubmitSuccessful={isSubmitSuccessful}
          />
          <div className="min-h-[100%] grid grid-cols-5 gap-1 md:gap-2">
            <div className="bg-white w-[35px] sm:w-[60px] justify-self-end h-full flex items-center justify-center rounded-md sm:px-2 border-1 ">
              <Funnel size={20} />
            </div>
            <div
              className="bg-white text-sm h-full flex gap-2 cursor-pointer items-center justify-center rounded-md sm:px-4 border-1"
              onClick={() => priorityFilter("all")}
            >
              <CircleCheck size={20} color="#2097f3" />
              {!isSmallScreen && "All"}
            </div>
            <div
              className="bg-white h-full text-sm flex items-center cursor-pointer gap-2 justify-center rounded-md sm:px-4 border-1"
              onClick={() => priorityFilter("high")}
            >
              <CircleArrowUp size={20} color="red" />
              {!isSmallScreen && "High"}
            </div>
            <div
              className="bg-white h-full text-sm flex items-center cursor-pointer gap-2 justify-center rounded-md sm:px-4 border-1"
              onClick={() => priorityFilter("medium")}
            >
              <CircleEqual size={20} color="orange" />
              {!isSmallScreen && "Medium"}
            </div>
            <div
              className="bg-white h-full text-sm flex items-center cursor-pointer gap-2 justify-center rounded-md md:px-4 border-1"
              onClick={() => priorityFilter("low")}
            >
              <CircleArrowDown size={20} color="green" />
              {!isSmallScreen && "Low"}
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 mt-2 p-2 overflow-scroll h-[calc(100%-130px)]">
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
      </div>
    </>
  );
};

export default Dashboard;
