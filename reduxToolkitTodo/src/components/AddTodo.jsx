import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../features/todos/todoSlice";
const AddTodo = () => {
  const [title, setTitle] = useState("");
  const { edit: editTodo } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!editTodo.id) {
      dispatch(addTodo(title));
    } else {
      dispatch(updateTodo({ id: editTodo.id, title }));
    }

    setTitle("");
  };
  useEffect(() => {
    if (editTodo.id) setTitle(editTodo.title);
  }, [editTodo]);

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-control"
        placeholder="Enter todo"
      />
      {!editTodo.id && <button type="submit">Add todo</button>}
      {editTodo.id && <button type="submit">Update Todo</button>}
    </form>
  );
};

export default AddTodo;
