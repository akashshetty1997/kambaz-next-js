/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import { useState, useEffect, useCallback } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setModules, editModule, updateModule } from "./reducer";
import { setCurrentUser } from "../../../Account/reducer"; 
import * as coursesClient from "../../client";
import * as accountClient from "../../../Account/client"; 

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchProfile = useCallback(async () => {
    if (!currentUser) {
      try {
        const user = await accountClient.profile();
        dispatch(setCurrentUser(user));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
  }, [currentUser, dispatch]);

  const fetchModules = useCallback(async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchProfile(); 
    fetchModules();
  }, [fetchProfile, fetchModules]);

  // Updated function to create module on server
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await coursesClient.createModuleForCourse(
      cid as string,
      newModule
    );
    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!cid || Array.isArray(cid)) return;
    await coursesClient.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  // New function to update module on server
  const onUpdateModule = async (module: any) => {
    if (!cid || Array.isArray(cid)) return;
    await coursesClient.updateModule(cid, module);
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };

  return (
    <div>
      {isFaculty ? (
        <>
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={onCreateModuleForCourse}
          />
          <br />
          <br />
          <br />
          <br />
        </>
      ) : (
        <div style={{ marginTop: "60px" }}></div>
      )}

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((moduleItem: any) => (
          <ListGroupItem
            key={moduleItem._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center flex-grow-1">
                <BsGripVertical className="me-2 fs-3" />
                {!moduleItem.editing && moduleItem.name}
                {moduleItem.editing && isFaculty && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={moduleItem.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...moduleItem, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...moduleItem, editing: false });
                      }
                    }}
                  />
                )}
              </div>
              {isFaculty ? (
                <ModuleControlButtons
                  moduleId={moduleItem._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              ) : (
                <ModuleControlButtons />
              )}
            </div>

            {moduleItem.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {moduleItem.lessons.map((lesson: any) => (
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