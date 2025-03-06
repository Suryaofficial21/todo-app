import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/app/store/todoSlicer"
export const store=configureStore({
  reducer:{
    todo:todoReducer
  }
})