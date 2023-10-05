import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {

    todos: [{ id: 1, title: "hello" }],
    edit: { id: null, title: null }
}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = { id: nanoid(), title: action.payload };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo);
            state.edit = initialState.edit
        },
        setEdit: (state, action) => {
            state.edit = action.payload;
        }


    }
})

export const { addTodo, removeTodo, updateTodo, setEdit } = todoSlice.actions;
export default todoSlice.reducer;


