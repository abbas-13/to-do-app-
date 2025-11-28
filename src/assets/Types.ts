import type { Dispatch, SetStateAction } from "react";
import type { SubmitHandler } from "react-hook-form";

export interface ToDoState {
  id: string;
  isChecked: boolean;
  list: string;
  toDoName: string;
  date: string;
  notes: string;
  time: string;
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
}

export interface ModalProps {
  toggleModal: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  setToDos: Dispatch<SetStateAction<ToDoState[]>>;
  setShowModal: (arg0: boolean) => void;
}

export interface SearchBarProps {
  lists: ListsStateType[];
  setSearchResult: Dispatch<SetStateAction<ListsStateType[]>>;
  input: string;
  setInput: (arg0: string) => void;
}

export interface ToDoFormProps {
  toggleModal: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onSubmit: SubmitHandler<ToDoFormInput>;
}

export interface ToDoItemProps {
  data: ToDoState;
  checkToDo: (id: string) => void;
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
