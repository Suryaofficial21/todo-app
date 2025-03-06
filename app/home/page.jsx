"use client"
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, toggleComplete, updateTodo } from '../store/todoSlicer'
import {fetchTodos,addTodos,updateTodos,deleteTodos} from '@/app/store/todoSlicer'
function page() {

  const [task,setTask]=useState("")
  // const [editId,setEditId]=useState("")
  const [editTask,setEditTask]=useState({})
  const todos=useSelector((state)=>state.todo.todo)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchTodos())
  },[dispatch])
  const handleAddToDo=()=>{
    // if(task.trim()==="") return;
    dispatch(addTodos(task))
    setTask("")
  }

  const handleUpdate=()=>{
    dispatch(updateTodos({id:editTask.id,text:editTask.text}))
    // setEditTask({id:"",text:""})
  }

  return (
  <div className='min-h-screen bg-gray-100 flex flex-col items-center pt-10'>

    <h1 className='text-4xl font-bold mb-6 text-blue ' style={{color:"black"}}>To-do App</h1>
    <div className="flex gap-4">
        <input
          type="text"
          className="border p-2 w-64 rounded-md text-black"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleAddToDo}>
          Add Task
        </button>
      </div>
    <ul className="mt-6 w-96">
  {todos.map((todo) => (
    <div key={todo.id} className="bg-white shadow p-4 mb-2 rounded-md flex justify-between">
     <li className="flex justify-between items-center">
              {editTask.id == todo.id ? (
                <input
                  type="text"
                  className="border p-1 w-full rounded-md text-black"
                  value={editTask.text}
                  onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
                />
              ) : (
                <span className={`${todo.completed ? "line-through text-gray-500" : "text-black"}`}>
                  {todo.text}
                </span>
              )}
            </li>           
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => dispatch(updateTodo({ id: todo.id, type: "completed" }))}
          className="bg-green-500 text-white px-3 py-1 rounded-md"
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={() =>{ 
          if(editTask.id===todo.id){
            // dispatch(updateTodo({id:todo.id,text:editTask.text}))
            handleUpdate()
            // setEditTask({id:"",text:""})
          }
          else{
            setEditTask({id:todo.id,text:todo.text})
          } 
        }}>
          {editTask.id==todo.id?"Save":"Edit"}

        </button>
        <button
          onClick={() => dispatch(deleteTodos({id:todo.id}))}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</ul>

  

  </div>
  )
}

export default page