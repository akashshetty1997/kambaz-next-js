/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, FormControl, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments } from "./reducer";
import { useState, useEffect, useCallback } from "react";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchAssignments = useCallback(async () => {
    try {
      const assignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleDeleteClick = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await client.deleteAssignment(assignmentToDelete._id);
        dispatch(
          setAssignments(
            assignments.filter((a: any) => a._id !== assignmentToDelete._id)
          )
        );
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group" style={{ width: "300px" }}>
          <span className="input-group-text bg-white border-end-0">
            <CiSearch className="fs-5" />
          </span>
          <FormControl
            id="wd-search-assignment"
            placeholder="Search for Assignments"
            className="border-start-0"
          />
        </div>
        {isFaculty && (
          <div>
            <Button
              variant="secondary"
              size="lg"
              className="me-2"
              id="wd-add-assignment-group"
            >
              <FaPlus className="me-1" />
              Group
            </Button>
            <Link href={`/Courses/${cid}/Assignments/new`}>
              <Button variant="danger" size="lg" id="wd-add-assignment">
                <FaPlus className="me-1" />
                Assignment
              </Button>
            </Link>
          </div>
        )}
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-assignment-list-item list-group-item p-0 fs-5 border-gray">
          <div className="wd-title p-3 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge rounded-pill border border-dark text-dark me-2">
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments.map((assignment: any) => (
              <li
                key={assignment._id}
                className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start"
              >
                <div className="d-flex align-items-start w-100">
                  <BsGripVertical className="me-2 fs-3" />
                  <div
                    className="ms-2 flex-grow-1"
                    style={{
                      borderLeft: "4px solid green",
                      paddingLeft: "15px",
                    }}
                  >
                    <Link
                      className="wd-assignment-link text-dark text-decoration-none fw-bold"
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <div className="mt-1">
                      <span className="text-danger">Multiple Modules</span>
                      <span className="text-muted"> | </span>
                      <span className="fw-bold">Not available until</span>
                      <span className="text-muted">
                        {" "}
                        {assignment.availableDate}
                      </span>
                    </div>
                    <div className="text-muted">
                      <span className="fw-bold">Due</span> {assignment.dueDate}{" "}
                      | {assignment.points} pts
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {isFaculty && (
                      <FaTrash
                        className="text-danger me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClick(assignment)}
                        id="wd-delete-assignment-click"
                      />
                    )}
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to delete the assignment "${assignmentToDelete?.title}"?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
