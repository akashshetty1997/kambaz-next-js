"use client";
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
} from "react-bootstrap";

export default function Dashboard() {
  const courses = db.courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row className="g-4">
          {courses.map((course) => (
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
                    src={"/images/reactjs.jpg"}
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
