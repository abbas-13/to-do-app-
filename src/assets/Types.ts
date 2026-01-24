import type { Dispatch, SetStateAction } from "react";
import type { SubmitHandler } from "react-hook-form";

export interface ToDoState {
  id: string;
  isChecked: boolean;
  list: string;
  toDoName: string;
  date: Date;
  notes: string;
  time: string;
  priority: string;
  dateCreated: Date;
}

export interface SelectedListState {
  id: string;
  name: string;
}

export interface ListsStateType {
  id: string;
  name: string;
}

export interface ListsContextType {
  lists: ListsStateType[];
  setLists: Dispatch<SetStateAction<ListsStateType[]>>;
}

export interface SelectListContextType {
  selectList: (id: string, name: string) => void;
  selectedList: SelectedListState;
  setSelectedList: Dispatch<SetStateAction<SelectedListState>>;
}

export interface ToDoFormInput {
  toDoName: string;
  notes: string;
  date: Date;
  time: string;
  priority: string;
}
export interface SearchBarProps {
  lists: ListsStateType[];
  setSearchResult: Dispatch<SetStateAction<ListsStateType[]>>;
  input: string;
  setInput: (arg0: string) => void;
}

export interface ToDoFormProps {
  onSubmit: SubmitHandler<ToDoFormInput>;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  isSubmitSuccessful: boolean;
}

export interface ToDoItemProps {
  data: ToDoState;
  checkToDo: (id: string, isChecked: boolean) => void;
  deleteToDo: (id: string) => void;
}

export interface ToDoListProps {
  list: {
    id: string;
    name: string;
  };
  deleteList: (arg0: string) => void;
  createList: (arg0: string) => void;
}
