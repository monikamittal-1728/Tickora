import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

let AddTask = ({ onAddTodo ,showToast}) => {
  const [inputText, setInputText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  let handleAdd = () => {
    if (inputText.trim().length > 0) {
      onAddTodo(inputText);
      setInputText("");
   }else{
    showToast("Please enter task to Add!")
   }
  };
  return (
    <section className="addTaskSection">
      <div className="tagLine">
        <p className="innerTagline1">
          Today's <span>focus.</span>
        </p>
        <p className="innerTagline2">
          <em>Small steps, big progress.</em>
        </p>
      </div>
      <div className="rightSection">
        <div className="addTask">
          <input
            type="text"
            placeholder="Add a new task..."
            className="taskInput"
            onKeyDown={handleKeyDown}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={handleAdd} className="addButton">
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>
        </div>
        <div className="instruction">
          <span className="enterInst">Enter</span> to add · click circle to
          complete · click text to edit{" "}
        </div>
      </div>
    </section>
  );
};

export default AddTask;
