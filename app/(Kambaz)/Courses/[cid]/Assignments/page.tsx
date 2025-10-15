"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assignments } from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  // defaults for missing fields
  const defaultDueDate = "2025-10-20";
  const defaultAvailableDate = "2025-10-10";
  const defaultPoints = 100;

  return (
    <div id="wd-assignments">
      {/* --- header --- */}
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

        <div>
          <Button variant="secondary" size="lg" className="me-2">
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button variant="danger" size="lg">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* --- assignments list --- */}
      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 fs-5 border-gray">
          {/* section header */}
          <div className="p-3 bg-secondary d-flex justify-content-between align-items-center">
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

          {/* dynamic assignment list */}
          <ListGroup className="rounded-0">
            {courseAssignments.map((a: any) => {
              const title = a.title || "Untitled Assignment";
              const dueDate = a.dueDate || defaultDueDate;
              const availableDate = a.availableDate || defaultAvailableDate;
              const points = a.points ?? defaultPoints;

              return (
                <ListGroupItem
                  key={a._id}
                  className="p-3 d-flex justify-content-between align-items-start"
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
                        href={`/Courses/${cid}/Assignments/${a._id}`}
                        className="text-dark text-decoration-none fw-bold"
                      >
                        {title}
                      </Link>
                      <div className="mt-1">
                        <span className="text-danger">Multiple Modules</span>
                        <span className="text-muted"> | </span>
                        <span className="fw-bold">Available</span>
                        <span className="text-muted"> {availableDate}</span>
                      </div>
                      <div className="text-muted">
                        <span className="fw-bold">Due</span> {dueDate} |{" "}
                        {points} pts
                      </div>
                    </div>
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </li>
      </ul>
    </div>
  );
}
