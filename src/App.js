import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CountCards from "./components/CountCards";
import TaskSlider from "./components/TaskSlider";
import { ThreeDots } from "react-loader-spinner";

function App() {
  const [searchText, setSearchText] = useState("");
  const [taskList, setTaskList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const todoList = taskList.filter(
    (each) => each.category === "todo" && new Date(each.deadline) >= new Date()
  );
  const progressList = taskList.filter(
    (each) =>
      each.category === "on progress" && new Date(each.deadline) >= new Date()
  );
  const doneList = taskList.filter((each) => each.category === "done");

  const expiresList = taskList.filter(
    (each) =>
      each.category === "expired" ||
      (new Date(each.deadline) < new Date() && each.category !== "done")
  );

  useEffect(() => {
    getTasks();
  }, [searchText]);

  const getTasks = async () => {
    setIsLoading(true);
    const url = `https://tasks-api-mktq.onrender.com/tasks?search_q=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    setTaskList(data);
    setIsLoading(false);
  };

  const addedTask = () => {
    getTasks();
  };

  const getTask = () => {
    getTasks();
  };

  const render = () => (
    <div className="mt-[40px] w-full flex flex-col md:flex-row md:justify-between">
      <CountCards
        addedTask={addedTask}
        values={{
          expires: expiresList.length,
          activeTasks: todoList.length + progressList.length + doneList.length,
          completed: doneList.length,
        }}
      />
      <TaskSlider
        getTasks={getTask}
        lists={{ todoList, progressList, doneList, expiresList }}
      />
    </div>
  );

  const renderLoader = () => (
    <div className="h-screen flex items-center justify-center">
      <ThreeDots color="#000" height={50} width={50} />
    </div>
  );

  return (
    <div>
      <div className="py-[40px] max-w-[90%] mx-auto">
        <Header searchDetails={{ searchText, setSearchText, getTasks }} />
        {isLoading ? renderLoader() : render()}
      </div>
    </div>
  );
}

export default App;
