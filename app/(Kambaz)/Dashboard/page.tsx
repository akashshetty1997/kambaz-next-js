"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import Link from "next/link";
import Image from "next/image";
import * as db from "../Database";
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
  const dispatch = useDispatch();
  const { enrollments } = db;

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  // Filter courses based on user enrollment
  const filteredCourses = currentUser
    ? courses.filter((course: any) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )
      )
    : courses; // Show all courses if no user is logged in

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
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
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row className="g-4">
          {filteredCourses.map((course: any) => (
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
