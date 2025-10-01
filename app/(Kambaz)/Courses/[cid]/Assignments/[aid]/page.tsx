import {
  FormControl,
  FormLabel,
  FormSelect,
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Link from "next/link";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = await params;

  return (
    <div id="wd-assignments-editor" className="container">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        defaultValue="A1 - ENV + HTML"
        className="mb-3"
      />

      <FormLabel htmlFor="wd-description">Description</FormLabel>
      <Form.Control
        as="textarea"
        id="wd-description"
        rows={10}
        className="mb-3"
        defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`}
      />

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl id="wd-points" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect id="wd-group">
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
          <FormSelect id="wd-display-grade-as">
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
            <Form.Check
              type="checkbox"
              label="Text Entry"
              id="wd-text-entry"
              className="mb-1"
            />
            <Form.Check
              type="checkbox"
              label="Website URL"
              id="wd-website-url"
              className="mb-1"
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              id="wd-media-recordings"
              className="mb-1"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              id="wd-student-annotation"
              className="mb-1"
            />
            <Form.Check
              type="checkbox"
              label="File Uploads"
              id="wd-file-upload"
            />
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
              type="datetime-local"
              id="wd-due-date"
              defaultValue="2024-05-13T23:59"
              className="mb-3"
            />

            <Row>
              <Col md={6}>
                <FormLabel htmlFor="wd-available-from">
                  Available from
                </FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue="2024-05-06T00:00"
                />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue="2024-05-20T23:59"
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
