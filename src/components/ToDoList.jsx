import AddTask from "./AddTask";
import "./styles.css";

let ToDoList = () => {
  const progress = 100;
  return (
    <>
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${progress}%` }}></div>
      </div>
      <section className="taskSection">
        <AddTask />
      </section>
    </>
  );
};

export default ToDoList;
