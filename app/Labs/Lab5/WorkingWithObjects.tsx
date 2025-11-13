"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to NodeJS",
    description: "Learn NodeJS basics and ExpressJS",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects" className="container mt-4">
      <h3>Working With Objects</h3>

      {/* Retrieving Objects */}
      <h4 className="mt-4">Retrieving Objects</h4>
      <div className="mb-3">
        <a
          id="wd-retrieve-assignments"
          className="btn btn-primary me-2"
          href={`${ASSIGNMENT_API_URL}`}
        >
          Get Assignment
        </a>
        <a
          id="wd-retrieve-module"
          className="btn btn-primary"
          href={`${MODULE_API_URL}`}
        >
          Get Module
        </a>
      </div>
      <hr />

      {/* Retrieving Properties */}
      <h4>Retrieving Properties</h4>
      <div className="mb-3">
        <a
          id="wd-retrieve-assignment-title"
          className="btn btn-primary me-2"
          href={`${ASSIGNMENT_API_URL}/title`}
        >
          Get Title
        </a>
        <a
          id="wd-retrieve-module-name"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name`}
        >
          Get Module Name
        </a>
      </div>
      <hr />

      {/* Modifying Assignment Properties */}
      <h4>Modifying Assignment Properties</h4>

      <div className="mb-3">
        <label htmlFor="wd-assignment-title" className="form-label fw-bold">
          Assignment Title
        </label>
        <div className="d-flex align-items-center">
          <FormControl
            className="w-75 me-2"
            id="wd-assignment-title"
            defaultValue={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
          <a
            id="wd-update-assignment-title"
            className="btn btn-primary"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
          >
            Update Title
          </a>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="wd-assignment-score" className="form-label fw-bold">
          Assignment Score
        </label>
        <div className="d-flex align-items-center">
          <FormControl
            className="w-75 me-2"
            id="wd-assignment-score"
            type="number"
            defaultValue={assignment.score}
            onChange={(e) =>
              setAssignment({ ...assignment, score: parseInt(e.target.value) })
            }
          />
          <a
            id="wd-update-assignment-score"
            className="btn btn-primary"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
          >
            Update Score
          </a>
        </div>
      </div>

      <div className="mb-3 d-flex align-items-center justify-content-between">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="wd-assignment-completed"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="wd-assignment-completed">
            Completed
          </label>
        </div>
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr />

      {/* Module Section */}
      <h4>Module</h4>

      <div className="mb-3">
        <label htmlFor="wd-module-name" className="form-label fw-bold">
          Module Name
        </label>
        <div className="d-flex align-items-center">
          <FormControl
            className="w-75 me-2"
            id="wd-module-name"
            defaultValue={module.name}
            onChange={(e) => setModule({ ...module, name: e.target.value })}
          />
          <a
            id="wd-update-module-name"
            className="btn btn-primary"
            href={`${MODULE_API_URL}/name/${module.name}`}
          >
            Update Name
          </a>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="wd-module-description" className="form-label fw-bold">
          Module Description
        </label>
        <div className="d-flex align-items-center">
          <FormControl
            className="w-75 me-2"
            id="wd-module-description"
            defaultValue={module.description}
            onChange={(e) =>
              setModule({ ...module, description: e.target.value })
            }
          />
          <a
            id="wd-update-module-description"
            className="btn btn-primary"
            href={`${MODULE_API_URL}/description/${module.description}`}
          >
            Update Description
          </a>
        </div>
      </div>

      <hr />
    </div>
  );
}
