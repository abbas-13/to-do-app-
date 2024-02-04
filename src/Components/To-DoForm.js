export const ToDoForm = ({
  toggleModal,
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
      <form
        onSubmit={handleSubmit}
        className="grid items-center justify-center grid-cols-1 gap-2 m-4"
      >
        <div className="flex">
          <label className="m-2 text-md">To-Do Name:</label>
          <input
            onChange={handleformDataChange}
            type="text"
            name="toDoName"
            value={formData.toDoName}
            className="m-2 p-2 rounded-md flex-grow "
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Notes:</label>
          <input
            onChange={handleformDataChange}
            type="text"
            name="notes"
            value={formData.notes}
            className="p-2 m-2 rounded-md flex-grow"
          />
        </div>
        <div className="flex">
          <label className="text-md m-2">Date:</label>
          <input
            className="flex-grow rounded-md pr-2 h-8 m-2 pl-2"
            onChange={handleformDataChange}
            value={formData.date}
            type="date"
            name="date"
            id="finish by"
          />
          <input
            className="flex-grow rounded-md pr-2 h-8 m-2 pl-2"
            onChange={handleformDataChange}
            value={formData.time}
            type="time"
            name="time"
            id="finish by"
            min={formattedDate}
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            className="m-2 ml-8 flex-1 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
            type="submit"
          >
            Submit
          </button>
          <button
            className="m-2 mr-8 flex-1 shadow-md hover:drop-shadow-xl active:bg-blue-700 p-2 rounded-xl bg-blue-500 text-white"
            onClick={toggleModal}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
