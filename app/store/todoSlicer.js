import {createAsyncThunk, createSlice}  from '@reduxjs/toolkit'
import axios from 'axios'
import { act } from 'react'
const initialState = {
  todo: [],
  isLoading: false,
  error: null
} 
const API_URL="http://localhost:3001/api/todos"

export const fetchTodos=createAsyncThunk('todo/fetchTodos',async()=>{
  try{
    const res= await axios.get(API_URL)
    return res.data
  }
  catch{
    return {message:"error fetching data"}
  }
})

export const addTodos=createAsyncThunk('todo/addTodo',async(text)=>{
  try{
    const res= await axios.post(API_URL,{text})
    return res.data
  }
  catch{
    return {message:"error adding data"}
  }
})
export const updateTodos=createAsyncThunk('todo/updateTodo',async({id,text,completed})=>{
  try{
    console.log(id)
    const res= await axios.get(`${API_URL}/${id}`,{text,completed})
    return res.data
  }
  catch{
    return {message:"error updating data"}
  }
})
export const deleteTodos=createAsyncThunk('todo/deleteTodo',async()=>{
  try{
    const res= await axios.get(`${API_URL/id}`)
    return res.data
  }
  catch{
    return {message:"error deleting data"}
  }
})



const todoSlice=createSlice({
  name:"todo",
  initialState,
  reducers:{
  addTodo:(state,action)=>{
    state.todo.push({
      id:Date.now(),
      text:action.payload,
      completed:false
    })
    
  },
  removeTodo:(state,action)=>{
    state.todo=state.todo.filter((t)=>t.id!==action.payload)

  },
  updateTodo:(state,action)=>{
    const{id,text,type}=action.payload
    const todo=state.todo.find((t)=>t.id=id)
    if(todo){
        if(type=="edit"){
          todo.text=text
        }

      if(type=="completed"){
        todo.completed=!todo.completed
      }
    }
   
  }
  },
  extraReducers:(builder)=>{
builder.addCase(fetchTodos.pending,(state)=>{
  state.isLoading=true;
  state.error=null
}).addCase(fetchTodos.fulfilled,(state,action)=>{
  state.isLoading=false;
  state.todo=action.payload
}).addCase(fetchTodos.rejected,(state,action)=>{
  state.isLoading=false
  state.error=action.payload
}).addCase(updateTodos.fulfilled,(state,action)=>{
  const index=state.todo.findIndex((todo)=>todo._id==action.payload._id)
  if(index!==1) state.todo[index]=action.payload
}).addCase(deleteTodos.fulfilled,(state,action)=>{
  state.todo=state.todo.filter((todo)=>todo._id!==action.payload)
})
  }
 
})
export const {addTodo,removeTodo,updateTodo,toggleComplete}=todoSlice.actions
export default todoSlice.reducer