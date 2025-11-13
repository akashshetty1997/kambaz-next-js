/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect } from "react";
import * as client from "./client";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const todos = await client.fetchTodos();
      const fakeTodo = {
        id: 1234,
        title: "Fake Todo - Not in Backend",
        completed: false,
      };
      setTodos([...todos, fakeTodo]);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Error fetching todos:", error);
      setErrorMessage("Unable to fetch todos from the server.");
    }
  };

  const removeTodo = async (todo: any) => {
    try {
      const updatedTodos = await client.removeTodo(todo);
      setTodos(updatedTodos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error removing todo.");
    }
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      setErrorMessage(null);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Error deleting todo.");
    }
  };

  const createNewTodo = async () => {
    try {
      const todos = await client.createNewTodo();
      setTodos(todos);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Error creating new todo:", error);
      setErrorMessage("Error creating new todo.");
    }
  };

  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos([...todos, newTodo]);
      setErrorMessage(null);
    } catch (error: any) {
      console.error("Error posting new todo:", error);
      setErrorMessage("Error posting new todo.");
    }
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error updating todo.");
    }
  };

  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays" className="container mt-4">
      <h3>Working with Arrays Asynchronously</h3>

      {/* Error Alert */}
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 ms-3"
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
        />
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end ms-3 mt-1"
              id="wd-edit-todo"
              style={{ cursor: "pointer" }}
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end ms-3 fs-3"
              id="wd-delete-todo"
              style={{ cursor: "pointer" }}
            />
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
              style={{ cursor: "pointer" }}
            />
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              className="form-check-input me-2 float-start"
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
