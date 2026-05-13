import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./AddTask";
import ToDoItem from "./ToDoItem";
import "./styles.css";
import { useState } from "react";

let ToDoList = ({ todos, onAddTodo, onStateToggle,onClearDone,onDeleteTask ,onEditTask}) => {
  const [filter, setFilter] = useState("all"); // all | active | done
  let filteredList = todos;
  if (filter === "done") {
    filteredList = todos.filter((todo) => {
      if (todo.done) {
        return todo;
      }
    });
  } else if (filter === "active") {
    filteredList = todos.filter((todo) => {
      if (!todo.done) {
        return todo;
      }
    });
  }

  console.log(filteredList);

  return (
    <>
      <section className="taskSection">
        <AddTask onAddTodo={onAddTodo} />
        <div className="taskListSection">
          <div className="filterSection">
            <div className="filters">
              <button
                onClick={() => setFilter("all")}
                className={`allBtn filter-tab ${filter === "all" ? "active" : ""}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`activeBtn filter-tab ${filter === "active" ? "active" : ""}`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("done")}
                className={`doneBtn filter-tab ${filter === "done" ? "active" : ""}`}
              >
                Done
              </button>
            </div>
            <div className="clearSection">
              <button className="clearDone" onClick={()=>{onClearDone()}}>
                <FontAwesomeIcon icon={faBroom} /> Clear done
              </button>
            </div>
          </div>
          {filteredList.length>0 ? filteredList.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} onEditTask={onEditTask} onDeleteTask={onDeleteTask} onStateToggle={onStateToggle} />
          )) : <div> nothing</div>}
        </div>
      </section>
    </>
  );
};

export default ToDoList;
