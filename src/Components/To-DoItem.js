import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Box, Card, Grid, Typography } from "@mui/material";

export const ToDoItem = ({ data, checkToDo, deleteToDo }) => {
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
        <Grid item>
          <input
            type="checkbox"
            checked={data.isChecked}
            onChange={() => checkToDo(data.id)}
          />
        </Grid>
        <Grid item xs={9} md={9.7} lg={10}>
          {toDoLabel}
        </Grid>
        <Grid item xs="auto">
          <DeleteSweepIcon
            fontSize="sm"
            onClick={() => deleteToDo(data.id)}
            style={{ cursor: "pointer" }}
          />
          <label className="ml-2 text-xs sm:text-sm">{data.date}</label>
          <label className="ml-2 text-xs sm:text-sm">{data.time}</label>
        </Grid>
      </Grid>
      <p className="text-sm m-2 ml-6"> {data.notes}</p>
    </Card>
  );
};
