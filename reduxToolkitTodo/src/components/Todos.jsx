import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, setEdit } from "../features/todos/todoSlice";
function Todos() {
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };
  const handleEdit = (todo) => {
    dispatch(setEdit(todo));
  };
  return (
    <>
      <div>MyTodos:</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* <line
              type="text"
              value={todo.title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={}
            /> */}
            {todo.title}

            <button onClick={() => handleEdit(todo)}>Edit</button>

            <button onClick={() => handleDelete(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
