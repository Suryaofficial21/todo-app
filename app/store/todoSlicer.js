import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/todos"; 

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addTodo = createAsyncThunk("todo/addTodo", async (text, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, { text });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async ({ id, text, completed }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { text, completed });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
