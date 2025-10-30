/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollInCourse, unenrollFromCourse } from "./enrollmentsReducer";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  // Check if user is Faculty
  const isFaculty = currentUser?.role === "FACULTY";

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  // Handle enrollment/unenrollment
  const handleEnrollment = (courseId: string, event: any) => {
    event.preventDefault();
    if (!currentUser) {
      alert("Please sign in to enroll in courses");
      return;
    }

    if (isEnrolled(courseId)) {
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
    }
  };

  // Filter courses based on enrollment toggle
  const displayedCourses = !currentUser
    ? courses // Not logged in - show all courses
    : showAllCourses
    ? courses // Toggle is on - show all courses
    : courses.filter((course: any) => isEnrolled(course._id)); // Show only enrolled courses

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      {currentUser && (
        <Button
          variant="primary"
          className="float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
          id="wd-enrollments-btn"
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </Button>
      )}
      <hr />

      {/* Only show course creation form for Faculty */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All" : "Enrolled"} Courses ({displayedCourses.length}
        )
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row className="g-4">
          {displayedCourses.map((course: any) => (
            <Col
              key={course._id}
              xs={12}
              md={6}
              lg={4}
              xl={3}
              className="wd-dashboard-course"
            >
              <Card style={{ width: "100%" }}>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Image
                    className="card-img-top"
                    src={course.image || "/images/default_course.jpg"}
                    width={300}
                    height={160}
                    alt={course.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "160px",
                    }}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>

                    {/* Show Enroll/Unenroll button for all logged-in users */}
                    {currentUser && !isFaculty && (
                      <button
                        onClick={(event) => handleEnrollment(course._id, event)}
                        className={`btn ${
                          isEnrolled(course._id) ? "btn-danger" : "btn-success"
                        } float-end`}
                        id={`wd-${
                          isEnrolled(course._id) ? "unenroll" : "enroll"
                        }-course-click`}
                      >
                        {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                      </button>
                    )}

                    {/* Only show Edit and Delete buttons for Faculty */}
                    {isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
