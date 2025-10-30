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
  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );

  // Protect the route - redirect to Dashboard if not enrolled
  useEffect(() => {
    if (currentUser && !isEnrolled) {
      alert("You must be enrolled in this course to access it.");
      router.push("/Dashboard");
    }
  }, [currentUser, isEnrolled, router]);

  // Don't render course content if not enrolled
  if (currentUser && !isEnrolled) {
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
