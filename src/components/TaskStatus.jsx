import React from "react";
import TaskCard from "./TaskCard";

const TaskStatus = (props) => {
  const { statusDetails, getTasks } = props;
  const { title, list, color } = statusDetails;

  const onDeleteTodo = async (id) => {
    const url = `https://tasks-api-mktq.onrender.com/tasks/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    getTasks();
  };

  return (
    <div className="bg-gray-200 mx-[10px] min-h-screen md:h-screen p-[20px] rounded-xl">
      <div className="flex justify-center items-center mb-[20px]">
        <div
          className={`${color} h-[10px] w-[10px] rounded-full mr-[6px]`}
        ></div>
        <p>{title}</p>
        <div className="h-[25px] w-[25px] ml-[10px] rounded-full bg-gray-300 flex items-center justify-center">
          {list.length}
        </div>
      </div>
      <hr className={`${color} h-[5px] rounded-full`} />
      <div>
        {list.map((each) => (
          <TaskCard
            getTasks={getTasks}
            onDeleteTodo={onDeleteTodo}
            key={each.id}
            taskDetails={each}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;
