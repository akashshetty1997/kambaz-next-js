/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroupItem } from "react-bootstrap";

export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <div className="d-flex justify-content-between align-items-center">
        <span>{todo.title}</span>
        <div className="d-flex gap-2">
          <Button
            onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click"
            variant="primary"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={() => dispatch(deleteTodo(todo.id))}
            id="wd-delete-todo-click"
            variant="danger"
            size="sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
}
