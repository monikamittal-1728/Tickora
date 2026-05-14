import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
function App() {
  const sessionName = "TickoraSession";
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(sessionName);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem(sessionName, JSON.stringify(todos));
  }, [todos]);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    heading: "",
    message: "",
    onConfirm: null,
  });
  const [toast, setToast] = useState({ visible: false, message: "" });

  const doneTask = todos.filter((todo) => todo.done).length;
  const leftTask = todos.filter((todo) => !todo.done).length;

  const total = todos.length; // 10
  const taskProgress = total === 0 ? 0 : Math.round((doneTask / total) * 100); // 30

  const addTodo = (text) => {
    console.log("Adding todo:", text);
    const newTodo = {
      id: Date.now(),
      text,
      done: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const stateToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };
  const showConfirm = (heading, message, onConfirm) => {
    setConfirmDialog({ open: true, heading, message, onConfirm });
  };

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  };

  const deleteTask = (id, taskName) => {
    showConfirm(
      "Delete Task ?",
      `Are you sure you want to delete "${taskName}"?`,
      () => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        showToast(`"${taskName}" deleted successfully`);
      },
    );
  };
  const clearAlltask = () => {
    showConfirm(
      "Clear All Task?",
      "Are you sure you want to remove all tasks? This action cannot be undone!",
      () => {
        setTodos([]);
        showToast("Completed tasks cleared");
      },
    );
  };

  const clearDoneTask = () => {
    showConfirm(
      "Clear All Done Task?",
      "Are you sure you want to remove all done tasks? This action cannot be undone!",
      () => {
        setTodos((prev) => prev.filter((todo) => !todo.done));
        showToast("Completed tasks cleared");
      },
    );
  };

  const editTask = (id, text) => {
    console.log(id, text);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: text } : todo)),
    );
  };
  return (
    <>
      <div className="app">
        <Header
          doneTask={doneTask}
          leftTask={leftTask}
          taskProgress={taskProgress}
        />
        <main className="main">
          <ToDoList
            todos={todos}
            onAddTodo={addTodo}
            onStateToggle={stateToggle}
            onClearDone={clearDoneTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
            onClearAll={clearAlltask}
          />
        </main>
      </div>
      {/* Confirm Dialog */}
      {confirmDialog.open && (
        <div
          className="dialogOverlay"
          onClick={() =>
            setConfirmDialog({
              open: false,
              message: "",
              onConfirm: null,
            })
          }
        >
          <div className="dialogBox" onClick={(e) => e.stopPropagation()}>
            <p className="dialogHeading">{confirmDialog.heading}</p>

            <p className="dialogMessage">{confirmDialog.message}</p>

            <div className="dialogBtns">
              <button
                className="cancelBtn"
                onClick={() =>
                  setConfirmDialog({
                    open: false,
                    message: "",
                    onConfirm: null,
                  })
                }
              >
                Cancel
              </button>

              <button
                className="deleteBtn"
                onClick={() => {
                  confirmDialog.onConfirm();

                  setConfirmDialog({
                    open: false,
                    message: "",
                    onConfirm: null,
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.visible && <div className="toast">✓ {toast.message}</div>}
    </>
  );
}

export default App;
