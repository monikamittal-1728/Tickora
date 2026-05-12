import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./AddTask";
import ToDoItem from "./ToDoItem";
import "./styles.css";
// import { useState } from "react";

let ToDoList = ({ todos, onAddTodo }) => {
  const progress = 100;
  // const [filter, setFilter] = useState("all"); // all | active | completed

  return (
    <>
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${progress}%` }}></div>
      </div>
      <section className="taskSection">
        <AddTask onAddTodo={onAddTodo} />
        <div className="taskListSection">
          <div className="filterSection">
            <div className="filters">
              <button className="allBtn btnHover ">All</button>
              <button className="activeBtn btnHover">Active</button>
              <button className="doneBtn btnHover">Done</button>
            </div>
            <div className="clearSection">
              <button className="clearDone">
                <FontAwesomeIcon icon={faBroom} /> Clear done
              </button>
            </div>
          </div>
          {todos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ToDoList;
