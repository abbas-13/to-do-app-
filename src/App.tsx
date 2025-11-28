import { useEffect, useState } from "react";
import {
  Button,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Appshell } from "./Components/Appshell";
import { Modal } from "./Components/Modal";
import { ToDoItem } from "./Components/To-DoItem";
import { SelectListContext } from "./Context/SelectListContext";
import { ListsContext } from "./Context/ListsContext";
import type {
  ListsStateType,
  SelectedListState,
  ToDoState,
} from "./assets/Types";
import "./App.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [toDos, setToDos] = useState<ToDoState[]>([]);
  const [lists, setLists] = useState<ListsStateType[]>([]);
  const [selectedList, setSelectedList] = useState<SelectedListState>({
    id: "",
    name: "",
  });

  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "1.4rem",
    "@media (min-width:600px)": {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.6rem",
    },
  };

  const selectList = (id: string, name?: string) => {
    setSelectedList({ id, name: name ? name : "" });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal, "WHAT");
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

  useEffect(() => {
    const fetchData = async () => {
      const storedToDos = JSON.parse(localStorage.getItem("toDoData") ?? "[]");
      setToDos(storedToDos);
      const storedLists = JSON.parse(localStorage.getItem("toDoLists") ?? "[]");
      setLists(storedLists);
    };
    fetchData();
  }, []);

  return (
    <SelectListContext.Provider
      value={{ selectList, selectedList, setSelectedList }}
    >
      <ListsContext.Provider value={{ lists, setLists }}>
        <>
          <CssBaseline />
          <Appshell>
            <ThemeProvider theme={theme}>
              <Typography fontWeight="bold" variant="h3">
                Reminders
              </Typography>
            </ThemeProvider>
            <Typography variant="h6">{selectedList?.name || ""}</Typography>
            <div className="border border-gray-200 m-2"></div>

            {selectedList?.name ? (
              <Button
                onClick={toggleModal}
                sx={{ width: "100px", margin: "8px" }}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            ) : null}

            <div>
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
              {showModal && (
                <Modal
                  setShowModal={setShowModal}
                  setToDos={setToDos}
                  toggleModal={toggleModal}
                />
              )}
            </div>
          </Appshell>
        </>
      </ListsContext.Provider>
    </SelectListContext.Provider>
  );
};

export default App;
