/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <div className="d-flex gap-2">
        <Button
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
          variant="success"
        >
          Add
        </Button>
        <Button
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
          variant="warning"
        >
          Update
        </Button>
        <FormControl
          value={todo.title}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
        />
      </div>
    </ListGroupItem>
  );
}
