import React from "react";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TaskStatus from "./TaskStatus";

const TaskSlider = (props) => {
  const { lists, getTasks } = props;
  const { todoList, progressList, doneList, expiresList } = lists;

  const taskStatus = [
    {
      idd: uuidv4(),
      title: "To Do",
      list: todoList,
      color: "bg-purple-600",
    },
    {
      idd: uuidv4(),
      title: "On Progress",
      list: progressList,
      color: "bg-orange-600",
    },
    {
      idd: uuidv4(),
      title: "Done",
      list: doneList,
      color: "bg-green-600",
    },
    {
      idd: uuidv4(),
      title: "Expired",
      list: expiresList,
      color: "bg-red-600",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
  };

  return (
    <div className="md:ml-[10px] w-full md:w-[70%]">
      <div className="md:hidden">
        <Slider className="p-[0px] cursor-grabbing" {...settings}>
          {taskStatus.map((each) => (
            <TaskStatus
              getTasks={getTasks}
              key={each.idd}
              statusDetails={each}
            />
          ))}
        </Slider>
      </div>
      <div className="hidden md:block">
        <Slider className="p-[0px] cursor-grabbing" {...settings2}>
          {taskStatus.map((each) => (
            <TaskStatus
              getTasks={getTasks}
              key={each.idd}
              statusDetails={each}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TaskSlider;
