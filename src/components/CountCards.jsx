import React, { useState } from "react";
import { FcExpired } from "react-icons/fc";
import { TiShoppingBag } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import CountCard from "./CountCard";
import Popup from "reactjs-popup";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { Oval } from "react-loader-spinner";

const status = [
  {
    id: uuidv4(),
    value: "Low",
    name: "Low",
  },
  {
    id: uuidv4(),
    value: "High",
    name: "High",
  },
  {
    id: uuidv4(),
    value: "Completed",
    name: "Completed",
  },
];

const category = [
  {
    id: uuidv4(),
    value: "todo",
    name: "TO DO",
  },
  {
    id: uuidv4(),
    value: "on progress",
    name: "ON PROGRESS",
  },
  {
    id: uuidv4(),
    value: "done",
    name: "DONE",
  },
];
const CountCards = (props) => {
  const { values, addedTask } = props;
  const { expires, activeTasks, completed } = values;
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [statusValue, setStatusValue] = useState(status[0].value);
  const [taskCategory, setTaskCategory] = useState(category[0].value);
  const [taskDeadline, setTaskDeadline] = useState("");
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cards = [
    {
      id: uuidv4(),
      name: "Expired Tasks",
      icon: () => <FcExpired size={40} />,
      value: expires,
      bg: "bg-red-600",
    },
    {
      id: uuidv4(),
      name: "All Active Tasks",
      icon: () => <TiShoppingBag size={40} color="#fff" />,
      value: activeTasks,
      bg: "bg-orange-600",
    },

    {
      id: uuidv4(),
      name: "Completed Tasks",
      icon: () => <FaRegClock size={40} color="#fff" />,
      value: `${completed}/${activeTasks}`,
      bg: "bg-indigo-600",
    },
  ];

  const submitTask = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formatDate = format(new Date(taskDeadline), "yyyy-MM-dd");
    console.log(formatDate);
    const url = "https://tasks-api-mktq.onrender.com/tasks";

    const taskDetails = {
      name: taskName,
      description: taskDesc,
      status: statusValue,
      deadline: taskDeadline,
      category: taskCategory,
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    setIsLoading(false);
    setIsTaskAdded(true);
    console.log(data);
  };

  const renderForm = (close) => (
    <form
      onSubmit={submitTask}
      className="bg-white px-[30px] py-[30px] rounded flex flex-col w-[90%] max-w-[500px]"
    >
      <button className="self-end" onClick={() => close()}>
        <IoClose size={25} />
      </button>
      <p className="text-center text-[30px] font-bold">Enter Task Details</p>
      <label htmlFor="name" className="mt-[15px]">
        ENTER TASK NAME
      </label>
      <input
        type="text"
        id="name"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        className="border border-black rounded h-[30px] pl-[10px]"
      />
      <label htmlFor="desc" className="mt-[15px]">
        ENTER TASK DESC
      </label>
      <input
        type="text"
        id="desc"
        value={taskDesc}
        onChange={(event) => setTaskDesc(event.target.value)}
        className="border border-black rounded h-[30px] pl-[10px]"
      />
      <label htmlFor="select" className="mt-[15px]">
        SELECT TASK STATUS
      </label>
      <select
        id="select"
        value={statusValue}
        onChange={(event) => setStatusValue(event.target.value)}
        className="border-black border h-[30px] pl-[10px]"
      >
        {status.map((each) => (
          <option key={each.id} value={each.value}>
            {each.name}
          </option>
        ))}
      </select>
      <label htmlFor="select1" className="mt-[15px]">
        SELECT TASK CATEGORY
      </label>
      <select
        id="select1"
        value={taskCategory}
        onChange={(event) => setTaskCategory(event.target.value)}
        className="border-black border h-[30px] pl-[10px]"
      >
        {category.map((each) => (
          <option key={each.id} value={each.value}>
            {each.name}
          </option>
        ))}
      </select>
      <label htmlFor="date" className="mt-[15px]">
        SELECT TASK DEADLINE
      </label>
      <input
        type="date"
        id="date"
        value={taskDeadline}
        onChange={(event) => setTaskDeadline(event.target.value)}
        className="border-black border h-[30px] pl-[10px]"
      />
      <button className="bg-black text-white py-[8px] mt-[15px] rounded">
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Oval height={30} width={30} color="#fff" />
          </div>
        ) : (
          "Add Task"
        )}
      </button>
    </form>
  );

  const renderSuccess = () => (
    <div className="bg-white p-[25px] rounded-lg text-center">
      <img
        src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/check-mark-square-icon.png"
        alt="success"
        className="w-[80px] mx-auto mb-[10px] rounded-xl"
      />
      <p>new task has been created successfully</p>
      <button
        onClick={() => addedTask()}
        className="bg-black text-white w-full mt-[10px] h-[40px] rounded"
      >
        Back
      </button>
    </div>
  );

  return (
    <div className="w-full mb-[30px] md:w-[30%]">
      {cards.map((each) => (
        <CountCard key={each.id} cardDetails={each} />
      ))}
      <div>
        <Popup
          modal
          trigger={
            <button className="bg-black text-white w-full h-[50px] rounded-full">
              +Add Task
            </button>
          }
        >
          {(close) => {
            return (
              <div className="bg-black bg-opacity-50 h-screen w-screen flex items-center justify-center">
                {isTaskAdded ? renderSuccess() : renderForm(close)}
              </div>
            );
          }}
        </Popup>
      </div>
    </div>
  );
};

export default CountCards;
