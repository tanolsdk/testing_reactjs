import React, { useState, Fragment, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

export function App() {
  const [todos, setTodos] = useState([]);
  
  const TODOLIST = "ListaDeTareas";

  useEffect(() => {
    const todosLocal = localStorage.getItem(TODOLIST);
    if (todosLocal) {
      setTodos(JSON.parse(todosLocal));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(TODOLIST, JSON.stringify(todos));
    }
  }, [todos]);

  const todoTaskRef = useRef();

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") {
      return;
    }
    const todoTask = { id: uuidv4(), task: task, completed: false };

    setTodos((prevTodos) => {
      return [...prevTodos, todoTask];
    });

    todoTaskRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClearAllDone = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Ingrese tarea"></input>
      <button onClick={handleTodoAdd}>Agregar</button>
      <button onClick={handleClearAllDone}>Borrar completos</button>
      <div>
        Quedan {todos.filter((todo) => !todo.completed).length} tareas por hacer
      </div>
    </Fragment>
  );
}
