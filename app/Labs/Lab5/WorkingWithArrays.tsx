"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "New Title",
    completed: false,
    description: "New Description",
  });

  return (
    <div id="wd-working-with-arrays" className="container mt-4">
      <h3>Working with Arrays</h3>

      {/* Retrieving Arrays */}
      <h4 className="mt-4">Retrieving Arrays</h4>
      <div className="mb-3">
        <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
          Get Todos
        </a>
      </div>
      <hr />

      {/* Retrieving by ID */}
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="d-flex align-items-center mb-3">
        <FormControl
          id="wd-todo-id"
          defaultValue={todo.id}
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-retrieve-todo-by-id"
          className="btn btn-primary"
          href={`${API}/${todo.id}`}
        >
          Get Todo by ID
        </a>
      </div>
      <hr />

      {/* Filtering Items */}
      <h4>Filtering Array Items</h4>
      <div className="mb-3">
        <a
          id="wd-retrieve-completed-todos"
          className="btn btn-primary me-2"
          href={`${API}?completed=true`}
        >
          Get Completed Todos
        </a>
        <a
          id="wd-retrieve-pending-todos"
          className="btn btn-secondary"
          href={`${API}?completed=false`}
        >
          Get Pending Todos
        </a>
      </div>
      <hr />

      {/* Creating New Items */}
      <h4>Creating New Items</h4>
      <div className="mb-3">
        <a
          id="wd-create-todo"
          className="btn btn-success"
          href={`${API}/create`}
        >
          Create Todo
        </a>
      </div>
      <hr />

      {/* Deleting from Array */}
      <h4>Deleting from an Array</h4>
      <div className="d-flex align-items-center mb-3">
        <FormControl
          defaultValue={todo.id}
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-remove-todo"
          className="btn btn-danger"
          href={`${API}/${todo.id}/delete`}
        >
          Remove Todo with ID = {todo.id}
        </a>
      </div>
      <hr />

      {/* Updating Todo Title */}
      <h4>Updating an Item in an Array</h4>
      <div className="d-flex align-items-center mb-3">
        <FormControl
          id="wd-todo-id-for-update"
          defaultValue={todo.id}
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <FormControl
          id="wd-todo-title"
          defaultValue={todo.title}
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <a
          id="wd-update-todo-title"
          className="btn btn-primary"
          href={`${API}/${todo.id}/title/${todo.title}`}
        >
          Update Todo Title
        </a>
      </div>
      <hr />

      {/* Updating Todo Completed */}
      <h4>Updating Todo Completed</h4>
      <div className="d-flex align-items-center mb-3">
        <div className="form-check me-3">
          <input
            type="checkbox"
            id="wd-todo-completed"
            className="form-check-input me-2"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />
          <label htmlFor="wd-todo-completed" className="form-check-label">
            Completed
          </label>
        </div>
        <a
          id="wd-update-todo-completed"
          className="btn btn-primary"
          href={`${API}/${todo.id}/completed/${todo.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr />

      {/* Updating Todo Description */}
      <h4>Updating Todo Description</h4>
      <div className="d-flex align-items-center mb-3">
        <FormControl
          id="wd-todo-description"
          defaultValue={todo.description}
          className="w-75 me-2"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <a
          id="wd-update-todo-description"
          className="btn btn-primary"
          href={`${API}/${todo.id}/description/${todo.description}`}
        >
          Update Description
        </a>
      </div>
      <hr />
    </div>
  );
}
