/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import { ReactNode, use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Breadcrumb from "./Breadcrumb";

export default function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);
  const router = useRouter();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  // Check if user is enrolled in the course
  const isEnrolled = enrollments.some((enrollment: any) => {
    if (!enrollment || !enrollment.course || !enrollment.user) {
      return false;
    }

    // Handle both populated (object) and non-populated (string) course references
    const enrollmentCourseId =
      typeof enrollment.course === "object" && enrollment.course
        ? enrollment.course._id
        : enrollment.course;

    // Handle both populated (object) and non-populated (string) user references
    const enrollmentUserId =
      typeof enrollment.user === "object" && enrollment.user
        ? enrollment.user._id
        : enrollment.user;

    return enrollmentUserId === currentUser?._id && enrollmentCourseId === cid;
  });

  // Faculty can access any course without enrollment
  const isFaculty = currentUser?.role === "FACULTY";
  const canAccess = !currentUser || isFaculty || isEnrolled;

  // Debug logs (remove after fixing)
  useEffect(() => {
    console.log("=== ENROLLMENT DEBUG ===");
    console.log("Current User:", currentUser);
    console.log("Course ID:", cid);
    console.log("Enrollments:", enrollments);
    console.log("Is Enrolled:", isEnrolled);
    console.log("Is Faculty:", isFaculty);
    console.log("Can Access:", canAccess);
  }, [currentUser, cid, enrollments, isEnrolled, isFaculty, canAccess]);

  // Protect the route - redirect to Dashboard if not enrolled
  useEffect(() => {
    if (currentUser && !canAccess) {
      alert("You must be enrolled in this course to access it.");
      router.push("/Dashboard");
    }
  }, [currentUser, canAccess, router]);

  // Don't render course content if not enrolled
  if (currentUser && !canAccess) {
    return (
      <div className="p-3">
        <div className="alert alert-warning">
          You are not enrolled in this course. Redirecting to Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div id="wd-courses" className="p-3">
      <div className="d-flex align-items-center mb-2">
        <FaAlignJustify
          className="text-danger fs-4 me-3"
          style={{ cursor: "pointer" }}
          onClick={() => setShowNavigation(!showNavigation)}
        />
        <h2 className="mb-0 text-danger fs-4">
          <Breadcrumb course={course} />
        </h2>
      </div>

      <hr />

      <div className="d-flex">
        {showNavigation && (
          <div className="d-none d-md-block me-4">
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
