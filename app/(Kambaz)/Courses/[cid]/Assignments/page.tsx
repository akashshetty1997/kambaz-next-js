import { Button, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

export default function Assignments() {
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
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
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
            <li className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start w-100">
                <BsGripVertical className="me-2 fs-3" />
                <div
                  className="ms-2 flex-grow-1"
                  style={{ borderLeft: "4px solid green", paddingLeft: "15px" }}
                >
                  <Link
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="/Courses/1234/Assignments/1"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <div className="mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="text-muted"> | </span>
                    <span className="fw-bold">Not available until</span>
                    <span className="text-muted"> May 6 at 12:00am</span>
                  </div>
                  <div className="text-muted">
                    <span className="fw-bold">Due</span> May 13 at 11:59pm | 100
                    pts
                  </div>
                </div>
                <IoEllipsisVertical className="fs-4" />
              </div>
            </li>

            <li className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start w-100">
                <BsGripVertical className="me-2 fs-3" />
                <div
                  className="ms-2 flex-grow-1"
                  style={{ borderLeft: "4px solid green", paddingLeft: "15px" }}
                >
                  <Link
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="/Courses/1234/Assignments/2"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <div className="mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="text-muted"> | </span>
                    <span className="fw-bold">Not available until</span>
                    <span className="text-muted"> May 13 at 12:00am</span>
                  </div>
                  <div className="text-muted">
                    <span className="fw-bold">Due</span> May 20 at 11:59pm | 100
                    pts
                  </div>
                </div>
                <IoEllipsisVertical className="fs-4" />
              </div>
            </li>

            <li className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start w-100">
                <BsGripVertical className="me-2 fs-3" />
                <div
                  className="ms-2 flex-grow-1"
                  style={{ borderLeft: "4px solid green", paddingLeft: "15px" }}
                >
                  <Link
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="/Courses/1234/Assignments/3"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <div className="mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="text-muted"> | </span>
                    <span className="fw-bold">Not available until</span>
                    <span className="text-muted"> May 20 at 12:00am</span>
                  </div>
                  <div className="text-muted">
                    <span className="fw-bold">Due</span> May 27 at 11:59pm | 100
                    pts
                  </div>
                </div>
                <IoEllipsisVertical className="fs-4" />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
