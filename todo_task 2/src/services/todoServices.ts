// import { useState } from "react";
import type { TodoItemProps } from "../models/TodoItemProps.model"

export const list: TodoItemProps[] = [
      {id:1, text:"Learn JavaScript", status: "activate"}, 
      {id:2, text:"Learn React", status: "completed" }, 
      {id:3, text:"Build a React App", status: "deactivate" },
  ];



export function GetTodos(){
  return list;
}