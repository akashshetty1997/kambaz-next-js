/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import {
  setEnrollments,
  enrollInCourse,
  unenrollFromCourse,
} from "./enrollmentsReducer";
import * as client from "../Courses/client";
import * as accountClient from "../Account/client";
import { setCurrentUser } from "../Account/reducer";
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
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  // ✅ Wrap in useCallback
  const fetchCourses = useCallback(async () => {
    try {
      let courses;
      if (showAllCourses) {
        courses = await client.fetchAllCourses();
      } else {
        courses = await client.findMyCourses();
      }
      dispatch(setCourses(courses));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [showAllCourses, dispatch]);

  // ✅ Wrap in useCallback
  const fetchEnrollments = useCallback(
    async (userId: string) => {
      try {
        const userEnrollments = await client.findEnrollmentsForUser(userId);
        console.log("Fetched enrollments:", userEnrollments);
        dispatch(setEnrollments(userEnrollments));
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    },
    [dispatch]
  );

  const initializeDashboard = useCallback(async () => {
    setLoading(true);
    try {
      let user = currentUser;
      if (!user) {
        try {
          user = await accountClient.profile();
          dispatch(setCurrentUser(user));
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false);
          return;
        }
      }

      if (user) {
        await fetchCourses();
        await fetchEnrollments(user._id);
      }
    } catch (error) {
      console.error("Error initializing dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser, dispatch, fetchCourses, fetchEnrollments]); // ✅ Added dependencies

  useEffect(() => {
    initializeDashboard();
  }, [initializeDashboard]);

  const isFaculty = currentUser?.role === "FACULTY";

  const isEnrolled = (courseId: string) => {
    return enrollments.some((enrollment: any) => {
      if (!enrollment || !enrollment.course || !enrollment.user) {
        return false;
      }

      const enrollmentCourseId =
        typeof enrollment.course === "object" && enrollment.course
          ? enrollment.course._id
          : enrollment.course;

      const enrollmentUserId =
        typeof enrollment.user === "object" && enrollment.user
          ? enrollment.user._id
          : enrollment.user;

      return (
        enrollmentUserId === currentUser?._id && enrollmentCourseId === courseId
      );
    });
  };

  const handleEnrollment = async (courseId: string, event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (!currentUser) {
      alert("Please sign in to enroll in courses");
      return;
    }

    try {
      if (isEnrolled(courseId)) {
        await client.unenrollFromCourse(currentUser._id, courseId);
        dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
      } else {
        await client.enrollIntoCourse(currentUser._id, courseId);
        dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
      }

      await fetchEnrollments(currentUser._id);

      if (!showAllCourses) {
        await fetchCourses();
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("Failed to update enrollment");
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((course: any) => course._id !== courseId))
    );
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1>Dashboard</h1>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>

      {currentUser && !isFaculty && (
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

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
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
        {showAllCourses ? "All Courses" : "My Courses"} ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row className="g-4">
          {courses
            .filter((course: any) => course != null)
            .map((course: any) => (
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

                      {currentUser && !isFaculty && showAllCourses && (
                        <button
                          onClick={(event) =>
                            handleEnrollment(course._id, event)
                          }
                          className={`btn ${
                            isEnrolled(course._id)
                              ? "btn-danger"
                              : "btn-success"
                          } float-end ms-2`}
                          id={`wd-${
                            isEnrolled(course._id) ? "unenroll" : "enroll"
                          }-course-click`}
                        >
                          {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                        </button>
                      )}

                      {isFaculty && (
                        <>
                          <button
                            className="btn btn-danger float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
                            }}
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
