import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

let ToDoItem = ({ todo }) => {
  return (
    <div className="itemContainer">
      <input type="checkbox" className="checkbox" />
      <p className="itemText">{todo.text}</p>
      <div className="btnCon">
        <button className="editBtn btnNormal">
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="deleteBtn btnNormal">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
