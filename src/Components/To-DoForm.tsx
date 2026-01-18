import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "./ui/textarea";

import type { ToDoFormInput, ToDoFormProps } from "../assets/Types";
import { SelectListContext } from "@/Context/SelectListContext";
import styles from "./To-DoForm.module.css";

export const ToDoForm = ({
  onSubmit,
  isDialogOpen,
  setIsDialogOpen,
  isSubmitSuccessful,
}: ToDoFormProps) => {
  const { register, handleSubmit, reset } = useForm<ToDoFormInput>();
  const { selectedList } = useContext(SelectListContext);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {selectedList?.name ? (
          <Button
            className="mx-2 bg-[#2097f3] hover:bg-[#FFFFFF] hover:border-2 hover:border-[#2097f3] active:bg-[#2097f3] active:text-white active:outline-2 active:outline-[#85C7F8] hover:text-black hover:shadow-lg active:shadow-none active:border-1 active:border-white text-white"
            variant="outline"
          >
            Add
            <Plus strokeWidth={3} />
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent className="max-w-[380px]! rounded-lg md:max-w-[420px]! p-0!">
        <DialogHeader className="pt-4 pl-4 text-left">
          <DialogTitle>Describe to-do</DialogTitle>
        </DialogHeader>
        <div className="border border-gray-200"></div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["todo-form"]}>
          <div className="grid grid-cols-[30%_70%] py-2">
            <label className="text-xs font-semibold md:text-sm">
              To-Do Name:
            </label>
            <Input
              {...register("toDoName", {
                required: "Please enter the name of your ToDo",
              })}
              type="text"
              name="toDoName"
            />
          </div>
          <div className="grid grid-cols-[30%_70%] py-2">
            <label className="text-xs font-semibold md:text-sm">Notes:</label>
            <Textarea
              {...register("notes", { required: "Please enter your notes" })}
              name="notes"
            />
          </div>
          <div className="grid grid-cols-[30%_70%] py-2">
            <label className="text-xs font-semibold md:text-sm">Date:</label>
            <div className="flex gap-2">
              <Input
                {...register("date", {
                  required: "Please enter the deadline date of your ToDo",
                })}
                type="date"
                name="date"
                id="finish by"
                className="text-xs md:text-sm"
              />
              <Input
                {...register("time", {
                  required: "Please enter the deadline time of your ToDo",
                })}
                type="time"
                name="time"
                id="finish by"
                className="text-xs md:text-sm pl-2 pr-0 md:py-1 md:px-3"
                min={formattedDate}
              />
            </div>
          </div>
          <div className="border border-gray-200 my-2"></div>
          <div className="grid grid-cols-2 justify-self-end w-1/2 justify-center gap-2 items-center">
            <Button
              className="bg-[#2097f3] hover:bg-[#FFFFFF] hover:border-2 hover:border-[#2097f3] active:bg-[#2097f3] active:outline-2 active:outline-[#85C7F8] active:text-white hover:text-black hover:shadow-lg active:shadow-none active:border-1 active:border-white text-white"
              type="submit"
            >
              Submit
            </Button>
            <DialogClose asChild>
              <Button className="text-[#2097f3] hover:bg-white hover:shadow-lg active:shadow-none active:outline-2 active:outline-[#85C7F8] bg-white border-2 border-[#2097f3]">
                Close
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
