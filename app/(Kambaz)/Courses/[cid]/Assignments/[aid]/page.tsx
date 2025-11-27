/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import {
  FormControl,
  FormLabel,
  FormSelect,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { setCurrentUser } from "../../../../Account/reducer";
import * as client from "../../../client";
import * as accountClient from "../../../../Account/client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const isNew = aid === "new";

  // Initial state matching your database structure
  const [assignment, setAssignment] = useState<any>({
    _id: aid,
    title: "New Assignment",
    description: "",
    course: cid,
    points: 100,
    dueDate: "2025-10-20",
    availableFrom: "2025-10-10",
    availableUntil: "2025-10-30",
    assignmentGroup: "ASSIGNMENTS",
    displayGradeAs: "Percentage",
    submissionType: "Online",
    assignTo: "Everyone",
  });

  // ✅ Fetch current user profile on mount
  const fetchProfile = useCallback(async () => {
    if (!currentUser) {
      try {
        const user = await accountClient.profile();
        dispatch(setCurrentUser(user));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    fetchProfile(); // ✅ Fetch profile first
  }, [fetchProfile]);

  useEffect(() => {
    if (!isNew && cid && aid) {
      // Fetch the assignment from server
      const fetchAssignment = async () => {
        try {
          const existingAssignment = await client.findAssignmentById(
            cid as string,
            aid as string
          );
          if (existingAssignment) {
            setAssignment(existingAssignment);
          }
        } catch (error) {
          console.error("Error fetching assignment:", error);
        }
      };
      fetchAssignment();
    }
  }, [aid, cid, isNew]);

  const handleSave = async () => {
    try {
      if (isNew) {
        // Create new assignment on server
        await client.createAssignment(cid as string, assignment);
      } else {
        // Update existing assignment on server
        await client.updateAssignment(cid as string, assignment);
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment");
    }
  };

  // Only faculty can edit
  if (currentUser?.role !== "FACULTY") {
    return (
      <div className="p-3">
        <div className="alert alert-warning">
          You don&apos;t have permission to edit assignments.
        </div>
        <Link
          href={`/Courses/${cid}/Assignments`}
          className="btn btn-secondary"
        >
          Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="container p-3">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        className="mb-3"
      />

      <FormLabel htmlFor="wd-description">Description</FormLabel>
      <Form.Control
        as="textarea"
        id="wd-description"
        rows={10}
        className="mb-3"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value) || 0,
              })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect
            id="wd-group"
            value={assignment.assignmentGroup}
            onChange={(e) =>
              setAssignment({ ...assignment, assignmentGroup: e.target.value })
            }
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect
            id="wd-display-grade-as"
            value={assignment.displayGradeAs}
            onChange={(e) =>
              setAssignment({ ...assignment, displayGradeAs: e.target.value })
            }
          >
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Complete/Incomplete">Complete/Incomplete</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </Col>
        <Col md={9}>
          <div className="border p-3">
            <FormSelect
              id="wd-submission-type"
              className="mb-3"
              value={assignment.submissionType}
              onChange={(e) =>
                setAssignment({ ...assignment, submissionType: e.target.value })
              }
            >
              <option value="Online">Online</option>
              <option value="Paper">Paper</option>
              <option value="External Tool">External Tool</option>
            </FormSelect>

            <FormLabel className="d-block mb-2">Online Entry Options</FormLabel>
            <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
            <Form.Check
              type="checkbox"
              label="Website URL"
              id="wd-website-url"
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              id="wd-media-recordings"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              id="wd-student-annotation"
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
              value={assignment.assignTo}
              onChange={(e) =>
                setAssignment({ ...assignment, assignTo: e.target.value })
              }
              className="mb-3"
            />

            <FormLabel htmlFor="wd-due-date">Due</FormLabel>
            <FormControl
              type="date"
              id="wd-due-date"
              value={assignment.dueDate}
              onChange={(e) =>
                setAssignment({ ...assignment, dueDate: e.target.value })
              }
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
                  value={assignment.availableFrom}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      availableFrom: e.target.value,
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  type="date"
                  id="wd-available-until"
                  value={assignment.availableUntil || "2025-10-30"}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      availableUntil: e.target.value,
                    })
                  }
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
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}