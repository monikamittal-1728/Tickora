import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
function App() {
  const [todos, setTodos] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
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
  const showConfirm = (message, onConfirm) => {
    setConfirmDialog({ open: true, message, onConfirm });
  };

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  };

  const deleteTask = (id, taskName) => {
    showConfirm(`Delete "${taskName}"?`, () => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      showToast(`"${taskName}" deleted successfully`);
    });
  };

  const clearDoneTask = () => {
    showConfirm("Clear all completed tasks?", () => {
      setTodos((prev) => prev.filter((todo) => !todo.done));
      showToast("Completed tasks cleared");
    });
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
          />
        </main>
      </div>
      {/* Confirm Dialog */}
      {confirmDialog.open && (
        <div
          onClick={() =>
            setConfirmDialog({ open: false, message: "", onConfirm: null })
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              width: "320px",
            }}
          >
            <p style={{ marginBottom: "20px", fontWeight: "500" }}>
              {confirmDialog.message}
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
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
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog({
                    open: false,
                    message: "",
                    onConfirm: null,
                  });
                }}
                style={{ color: "red" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.visible && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#1a1a1a",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          ✓ {toast.message}
        </div>
      )}
    </>
  );
}

export default App;
