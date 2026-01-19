import { Trash, CalendarDays, Clock, EllipsisVertical } from "lucide-react";
import { Card } from "@/Components/ui/card";
import { Checkbox } from "@/Components//ui/checkbox";

import type { ToDoItemProps } from "../assets/Types";
import styles from "./To-DoItem.module.css";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/Components/ui/menubar";

export const ToDoItem = ({ data, checkToDo, deleteToDo }: ToDoItemProps) => {
  const priorityColour = () => {
    switch (data.priority) {
      case "high":
        return "bg-red-200";
      case "medium":
        return "bg-yellow-300";
      case "low":
        return "bg-green-200";
      default:
        return "bg-transparent";
    }
  };

  return (
    <>
      <Card className="bg-transparent shadow-none border-0 mx-4">
        <div className="flex justify-between">
          <div className="grid">
            <div className="flex items-center gap-2 h-full">
              <Checkbox
                className="data-[state=checked]:border-2 data-[state=checked]:border-white data-[state=checked]:outline-1 rounded-[8px] data-[state=checked]:bg-[#2097f3] data-[state=checked]:text-transparent dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                checked={data.isChecked}
                onCheckedChange={() => checkToDo(data.id)}
              />

              <p
                className={`leading-7 font-semibold ${
                  data.isChecked && "line-through text-[#A9A9A9]"
                }`}
              >
                {data.toDoName}
              </p>
              <div className={`rounded-sm text-sm px-2 ${priorityColour()}`}>
                <p>{data.priority}</p>
              </div>
            </div>
            <p
              className={`leading-7 text-xs ml-6 max-w-[180px] md:max-w-auto ${
                data.isChecked && "text-[#A9A9A9]"
              }`}
            >
              {data.notes}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className={`ml-2 text-xs sm:text-xs flex items-center gap-2 ${
                data.isChecked && "text-[#A9A9A9]"
              }`}
            >
              <CalendarDays size={12} /> {data.date}
            </label>
            <label
              className={`ml-2 text-xs sm:text-xs flex items-center gap-2 ${
                data.isChecked && "text-[#A9A9A9]"
              }`}
            >
              <Clock size={12} /> {data.time}
            </label>
            <div>
              <Menubar className="shadow-none p-0 border-none bg-transparent h-auto justify-self-end max-w-max">
                <MenubarMenu>
                  <MenubarTrigger className="p-0">
                    <EllipsisVertical size={14} />
                  </MenubarTrigger>
                  <MenubarContent align="end" className={styles.MenubarContent}>
                    <MenubarItem className="flex justify-between">
                      Delete
                      <Trash
                        onClick={() => deleteToDo(data.id)}
                        size={18}
                        color="red"
                      />
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
      </Card>
      <div className="border border-gray-200 m-2"></div>
    </>
  );
};
