import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import Popup from "reactjs-popup";
const TaskCard = (props) => {
  const { taskDetails, getTasks, onDeleteTodo } = props;
  const { id, category, deadline, description, name } =
    taskDetails === undefined ? {} : taskDetails;
  const date = new Date(deadline);

  useEffect(() => {
    const date = new Date(deadline);
    const today = new Date();
    const diff = date - today;
    setTimeout(() => {
      if (category !== "done") {
        statusToExpire();
      }
    }, diff);
  }, []);

  const statusToExpire = async () => {
    const url = `https://tasks-api-mktq.onrender.com/tasks/${id}`;
    const details = { category: "expired" };
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    const data = await response.json();
  };

  let className;

  if (category === "todo") {
    className = "bg-purple-300 text-purple-500";
  } else if (category === "on progress") {
    className = "bg-orange-200 text-orange-500";
  } else if (category === "done") {
    className = "bg-green-300 text-green-500";
  } else if (category === "expired") {
    className = "bg-red-300 text-red-500";
  }

  const onChangeCategory = async (newCategory) => {
    const url = `https://tasks-api-mktq.onrender.com/tasks/${id}`;
    const details = { category: `${newCategory}` };
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    getTasks();
  };

  return (
    <div className="mt-[20px] bg-white p-[20px] rounded-lg shadow shadow-gray-500 hover:scale-105 duration-300">
      <div className="flex items-center justify-between">
        <p className={`${className} py-[2px] px-[7px] rounded-md`}>
          {category}
        </p>

        <Popup
          trigger={
            <button className="cursor-pointer hover:bg-gray-200 rounded-full p-[4px]">
              <BsThreeDots size={30} />
            </button>
          }
        >
          <div className="border border-black flex flex-col">
            <button
              onClick={() => onChangeCategory("todo")}
              className="w-[80px] h-[50px] bg-purple-600 text-white border-b border-black"
            >
              Todo
            </button>
            <button
              onClick={() => onChangeCategory("on progress")}
              className="w-[80px] h-[50px] border-b bg-orange-600 text-white border-black"
            >
              On Progress
            </button>
            <button
              onClick={() => onChangeCategory("done")}
              className="w-[80px] h-[50px] bg-green-600 text-white"
            >
              Done
            </button>
            <button
              onClick={() => onDeleteTodo(id)}
              className="w-[80px] h-[50px] bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </Popup>
      </div>
      <div className="mb-[20px]">
        <p className="text-[25px] font-semibold">{name}</p>
        <p className="text-gray-400">{description}</p>
      </div>
      <p>
        Deadline:{" "}
        <span>{`${date.getDate()}/${date.getMonth() + 1}/${date
          .getFullYear()
          .toString()
          .substr(2)}`}</span>
      </p>
    </div>
  );
};

export default TaskCard;
