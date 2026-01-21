import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import type { ToDoFormInput, ToDoFormProps } from "../assets/Types";
import styles from "./To-DoForm.module.css";

export const ToDoForm = ({
  onSubmit,
  isDialogOpen,
  setIsDialogOpen,
  isSubmitSuccessful,
}: ToDoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ToDoFormInput>();

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
        <Button
          className="bg-[#2097f3] px-3 md:px-4 gap-1 md:gap-2 hover:bg-[#FFFFFF] hover:border-2 hover:border-[#2097f3] active:bg-[#2097f3] active:text-white active:outline-2 active:outline-[#85C7F8] hover:text-black hover:shadow-lg active:shadow-none active:border-1 active:border-white text-white"
          variant="outline"
        >
          Add Task
          <Plus strokeWidth={3} />
        </Button>
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
            <div>
              <Input
                {...register("toDoName", {
                  required: "Please enter to-do name",
                })}
                type="text"
                name="toDoName"
                placeholder="To do name"
              />
              <ErrorMessage
                errors={errors}
                name="toDoName"
                render={({ message }) => (
                  <p className="text-xs text-red-500 mt-1 text-center">
                    {message}
                  </p>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-[30%_70%] py-2">
            <label className="text-xs font-semibold md:text-sm">
              Priority:
            </label>
            <div>
              <Controller
                name="priority"
                control={control}
                rules={{ required: "Please select a priority" }}
                render={({ field }) => (
                  <>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[
                            { label: "High", value: "high" },
                            { label: "Medium", value: "medium" },
                            { label: "Low", value: "low" },
                          ].map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      errors={errors}
                      name="priority"
                      render={({ message }) => (
                        <p className="text-xs text-red-500 mt-1 text-center">
                          {message}
                        </p>
                      )}
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-[30%_70%] py-2">
            <label className="text-xs font-semibold md:text-sm">Notes:</label>
            <div>
              <Textarea
                {...register("notes", {
                  required: "Please enter notes description",
                })}
                name="notes"
              />
              <ErrorMessage
                errors={errors}
                name="notes"
                render={({ message }) => (
                  <p className="text-xs text-red-500 mt-1 text-center">
                    {message}
                  </p>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-[30%_70%] py-2">
            <label className="text-xs font-semibold md:text-sm">Date:</label>
            <div className="flex gap-2">
              <div>
                <Input
                  {...register("date", {
                    required: "Please select deadline date",
                  })}
                  type="date"
                  name="date"
                  id="finish by"
                  className="text-xs md:text-sm"
                />
                <ErrorMessage
                  errors={errors}
                  name="date"
                  render={({ message }) => (
                    <p className="text-xs text-red-500 mt-1 text-center">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div>
                <Input
                  {...register("time", {
                    required: "Please select deadline time",
                  })}
                  type="time"
                  name="time"
                  id="finish by"
                  className="text-xs md:text-sm pl-2 pr-0 md:py-1 md:px-3"
                  min={formattedDate}
                />
                <ErrorMessage
                  errors={errors}
                  name="time"
                  render={({ message }) => (
                    <p className="text-xs text-red-500 mt-1 text-center">
                      {message}
                    </p>
                  )}
                />
              </div>
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
