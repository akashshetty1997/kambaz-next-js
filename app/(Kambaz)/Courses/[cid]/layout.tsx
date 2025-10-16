"use client";

import { ReactNode, use } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";

export default function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);

  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses" className="p-3">
      {/* Header with icon and breadcrumb styled as heading */}
      <div className="d-flex align-items-center mb-2">
        <FaAlignJustify className="text-danger fs-4 me-3" />
        <h2 className="mb-0 text-danger fs-4">
          <Breadcrumb course={course} />
        </h2>
      </div>

      <hr />

      {/* Main layout: sidebar + content */}
      <div className="d-flex">
        <div className="d-none d-md-block me-4">
          <CourseNavigation cid={cid} />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
