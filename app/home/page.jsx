"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "@/app/store/todoSlicer";

function page() {
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState({ id: "", text: "" });

  const dispatch = useDispatch();
  const { todos, isLoading, error } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddToDo = () => {
    if (!task.trim()) return;
    dispatch(addTodo(task));
    setTask("");
  };

  const handleEdit = (todo) => setEditTask({ id: todo._id, text: todo.text });

  const handleUpdate = () => {
    dispatch(updateTodo({ id: editTask.id, text: editTask.text }));
    setEditTask({ id: "", text: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold mb-6 text-black">To-do App</h1>

      <div className="flex gap-4 w-96">
        <input
          type="text"
          className="border p-2 w-full rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={handleAddToDo}
        >
          Add
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-6 w-96 space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="bg-white shadow p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(updateTodo({ id: todo._id, completed: !todo.completed }))}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
              />
              {editTask.id === todo._id ? (
                <input
                  type="text"
                  className="border p-1 rounded-md text-black w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editTask.text}
                  onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
                />
              ) : (
                <span className={todo.completed ? "line-through text-gray-500" : "text-black"}>
                  {todo.text}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {editTask.id === todo._id ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                onClick={() => dispatch(deleteTodo(todo._id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
