import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./AddTask";
import ToDoItem from "./ToDoItem";
import "./styles.css";
import { useState } from "react";

let ToDoList = ({
  todos,
  onAddTodo,
  onStateToggle,
  onClearDone,
  onDeleteTask,
  onEditTask,onClearAll,showToast
}) => {
  const [filter, setFilter] = useState("all"); // all | active | done
  let filteredList = todos;
  if (filter === "done") {
    filteredList = todos.filter(todo => todo.done);
  } else if (filter === "active") {
    filteredList = todos.filter(todo => !todo.done);
  }


  return (
    <>
      <section className="taskSection">
        <AddTask onAddTodo={onAddTodo} showToast={showToast} />
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
              <button
                className="clearDone"
                onClick={() => {
                  onClearDone();
                }}
              >
                <FontAwesomeIcon icon={faBroom} /> Clear done
              </button>
              <button
                className="clearAll"
                onClick={() => {
                  onClearAll();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} /> Clear All
              </button>
            </div>
          </div>
          {filteredList.length > 0 ? (
            filteredList.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                onStateToggle={onStateToggle}
              />
            ))
          ) : (
            <div className="emptyState">
              <img className="emptyImg" src="./empty.png" alt="logo" />
              <p className="emptyLine1">Nothing here yet.</p>
              <p className="emptyLine2">
                Start by adding your first task above.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ToDoList;
