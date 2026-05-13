import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./styles.css";

let ToDoItem = ({ todo, onStateToggle, onDeleteTask,onEditTask }) => {
  const [isChecked, setIsChecked] = useState(todo.done);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);
  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    onStateToggle(todo.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  let handleEdit = () => {
    console.log("here")
    onEditTask(todo.id, updatedText);
    setIsEditing(false);
  };
  return (
    <div className="itemContainer">
      {isEditing ? (
        <div className="innerContainer">
          <input type="text" value={updatedText} autoFocus  onKeyDown={handleKeyDown} onChange={(e) => setUpdatedText(e.target.value)} className="updateInput" />
          <div>
            <button onClick={()=> handleEdit()} className="editStateBtn saveBtn">Save</button>
            <button onClick={()=> setIsEditing(false)} className="editStateBtn cancelBtn">cancel</button>
          </div>
        </div>
      ) : (
        <div className="innerContainer">
          <input
            type="checkbox"
            className="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
          />
          <p className="itemText">{todo.text}</p>
          <div className="btnCon">
            <button
              onClick={() => setIsEditing(true)}
              className="editBtn btnNormal"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              onClick={() => {
                onDeleteTask(todo.id, todo.text);
              }}
              className="deleteBtn btnNormal"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
