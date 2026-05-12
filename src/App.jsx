import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
function App() {
  const [todos, setTodos] = useState([
    
  ]);

  const addTodo = (text) => {
    console.log("Adding todo:", text);
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  return (
    <>
      <div className="app">
        <Header />
        <main className="main">
          <ToDoList todos={todos} onAddTodo={addTodo} />
        </main>
      </div>
    </>
  );
}

export default App;
