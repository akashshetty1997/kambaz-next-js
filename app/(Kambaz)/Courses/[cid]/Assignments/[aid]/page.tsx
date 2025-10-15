"use client";
import {
  FormControl,
  FormLabel,
  FormSelect,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assignments } from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((a: any) => a._id === aid);

  // graceful defaults if properties not in database
  const title = assignment?.title || "Untitled Assignment";
  const description =
    assignment?.description ||
    `The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`;

  const points = assignment?.points ?? 100;
  const dueDate = assignment?.dueDate || "2025-10-20";
  const availableDate = assignment?.availableDate || "2025-10-10";

  if (!assignment) {
    return <div className="p-3 text-danger">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container p-3">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl id="wd-name" defaultValue={title} className="mb-3" />

      <FormLabel htmlFor="wd-description">Description</FormLabel>
      <Form.Control
        as="textarea"
        id="wd-description"
        rows={10}
        className="mb-3"
        defaultValue={description}
      />

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl id="wd-points" defaultValue={points} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
            <option>Percentage</option>
            <option>Points</option>
            <option>Complete/Incomplete</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </Col>
        <Col md={9}>
          <div className="border p-3">
            <FormSelect id="wd-submission-type" className="mb-3">
              <option>Online</option>
              <option>Paper</option>
              <option>External Tool</option>
            </FormSelect>

            <FormLabel className="d-block mb-2">Online Entry Options</FormLabel>
            <Form.Check type="checkbox" label="Text Entry" />
            <Form.Check type="checkbox" label="Website URL" />
            <Form.Check type="checkbox" label="Media Recordings" />
            <Form.Check type="checkbox" label="Student Annotation" />
            <Form.Check type="checkbox" label="File Uploads" />
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel>Assign</FormLabel>
        </Col>
        <Col md={9}>
          <div className="border p-3">
            <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
            <FormControl
              id="wd-assign-to"
              defaultValue="Everyone"
              className="mb-3"
            />

            <FormLabel htmlFor="wd-due-date">Due</FormLabel>
            <FormControl
              type="date"
              id="wd-due-date"
              defaultValue={dueDate}
              className="mb-3"
            />

            <Row>
              <Col md={6}>
                <FormLabel htmlFor="wd-available-from">
                  Available from
                </FormLabel>
                <FormControl
                  type="date"
                  id="wd-available-from"
                  defaultValue={availableDate}
                />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  type="date"
                  id="wd-available-until"
                  defaultValue="2025-10-30"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end">
        <Link
          href={`/Courses/${cid}/Assignments`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
          Save
        </Link>
      </div>
    </div>
  );
}
