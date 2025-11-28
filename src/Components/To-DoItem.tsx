import { Card, Grid, Typography } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import type { ToDoItemProps } from "../assets/Types";

export const ToDoItem = ({ data, checkToDo, deleteToDo }: ToDoItemProps) => {
  const toDoLabel = data.isChecked ? (
    <Typography
      variant="body1"
      fontWeight="bold"
      style={{ textDecoration: "line-through", color: "#444444" }}
    >
      {data.toDoName}
    </Typography>
  ) : (
    <Typography variant="body1" fontWeight="bold">
      {data.toDoName}
    </Typography>
  );

  return (
    <Card
      variant="elevation"
      raised
      sx={{
        margin: "10px",
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Grid container spacing={0.5}>
        <div className="mx-2">
          <input
            type="checkbox"
            checked={data.isChecked}
            onChange={() => checkToDo(data.id)}
          />
        </div>
        <Grid component="div" size={{ xs: 9, md: 9, lg: 10 }}>
          {toDoLabel}
        </Grid>
        <Grid component="div">
          <DeleteSweepIcon
            fontSize="small"
            onClick={() => deleteToDo(data.id)}
            style={{ cursor: "pointer", marginLeft: "8px" }}
          />
          <label className="ml-2 text-xs sm:text-sm">
            {data.date.toString()}
          </label>
          <label className="ml-2 text-xs sm:text-sm">{data.time}</label>
        </Grid>
      </Grid>
      <p className="text-sm m-2 ml-6"> {data.notes}</p>
    </Card>
  );
};
