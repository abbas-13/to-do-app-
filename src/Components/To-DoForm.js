export const ToDoForm = ({
  buttonClick,
  formData,
  setFormData,
  handleSubmit,
}) => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  const handleformDataChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-lg w-full bg-gray-200">
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-3 flex">
        <div className="flex">
          <label className="m-2 text-md">To-Do Name:</label>
          <input
            onChange={handleformDataChange}
            type="text"
            name="toDoName"
            value={formData.toDoName}
            className="m-2 pl-2 pr-2 h-8 rounded-md"
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Notes:</label>
          <input
            onChange={handleformDataChange}
            type="text"
            name="notes"
            value={formData.notes}
            className="pl-2 pr-2 m-2 rounded-md w-64"
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Date:</label>
          <input
            className="rounded-md pr-2 h-8 m-2 pl-2"
            onChange={handleformDataChange}
            value={formData.date}
            type="date"
            name="date"
            id="finish by"
          />
          <input
            className="rounded-md pr-2 h-8 m-2 pl-2"
            onChange={handleformDataChange}
            value={formData.time}
            type="time"
            name="time"
            id="finish by"
            min={formattedDate}
          />
        </div>
        <div className="grid grid-cols-3">
          <button
            className="m-2 pl-4 pr-4 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
            type="submit"
          >
            Submit
          </button>
          <button
            className="m-2 pl-4 pr-4 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
            onClick={buttonClick}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
