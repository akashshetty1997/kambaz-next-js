import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row className="g-4">
          <Col xs={12} md={6} lg={4} xl={3} className="wd-dashboard-course">
            <Card style={{ width: "100%" }}>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Image
                  className="card-img-top"
                  src="/images/reactjs.jpg"
                  width={300}
                  height={160}
                  alt="React JS"
                  style={{ objectFit: "cover", width: "100%", height: "160px" }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} className="wd-dashboard-course">
            <Card style={{ width: "100%" }}>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Image
                  className="card-img-top"
                  src="/images/node-js.jpg"
                  width={300}
                  height={160}
                  alt="Node JS"
                  style={{ objectFit: "cover", width: "100%", height: "160px" }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS2345 Node JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Backend development with Node.js
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} className="wd-dashboard-course">
            <Card style={{ width: "100%" }}>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Image
                  className="card-img-top"
                  src="/images/mongodb.jpg"
                  width={300}
                  height={160}
                  alt="MongoDB"
                  style={{ objectFit: "cover", width: "100%", height: "160px" }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS3456 MongoDB
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    NoSQL database fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} className="wd-dashboard-course">
            <Card style={{ width: "100%" }}>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Image
                  className="card-img-top"
                  src="/images/python.jpg"
                  width={300}
                  height={160}
                  alt="Python"
                  style={{ objectFit: "cover", width: "100%", height: "160px" }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS4567 Python
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Introduction to Python programming
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} className="wd-dashboard-course">
            <Card style={{ width: "100%" }}>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Image
                  className="card-img-top"
                  src="/images/java.jpg"
                  width={300}
                  height={160}
                  alt="Java"
                  style={{ objectFit: "cover", width: "100%", height: "160px" }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5678 Java
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Object-oriented programming in Java
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} className="wd-dashboard-course">
            <Card style={{ width: "100%" }}>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Image
                  className="card-img-top"
                  src="/images/typescript.jpg"
                  width={300}
                  height={160}
                  alt="TypeScript"
                  style={{ objectFit: "cover", width: "100%", height: "160px" }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS6789 TypeScript
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Typed JavaScript development
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} className="wd-dashboard-course">
            <Card style={{ width: "100%" }}>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Image
                  className="card-img-top"
                  src="/images/angular.jpg"
                  width={300}
                  height={160}
                  alt="Angular"
                  style={{ objectFit: "cover", width: "100%", height: "160px" }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS7890 Angular
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Building apps with Angular framework
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
