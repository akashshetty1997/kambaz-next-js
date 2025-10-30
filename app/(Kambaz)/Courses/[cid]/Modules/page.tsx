/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import { useState } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  // Check if user is Faculty
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div>
      {/* Only show ModulesControls for Faculty */}
      {isFaculty ? (
        <>
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={() => {
              dispatch(addModule({ name: moduleName, course: cid }));
              setModuleName("");
            }}
          />
          <br />
          <br />
          <br />
          <br />
        </>
      ) : (
        // Add spacing for students
        <div style={{ marginTop: "60px" }}></div>
      )}

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module Title */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center flex-grow-1">
                  <BsGripVertical className="me-2 fs-3" />
                  {/* Show module name for everyone */}
                  {!module.editing && module.name}
                  {/* Only show edit input for Faculty */}
                  {module.editing && isFaculty && (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>
                {/* Only show edit/delete buttons for Faculty */}
                {isFaculty ? (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                ) : (
                  // For students, just show the non-interactive controls
                  <ModuleControlButtons />
                )}
              </div>

              {/* Lessons List */}
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                      </div>
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}