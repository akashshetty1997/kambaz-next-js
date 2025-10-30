/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import { ReactNode, use, useState } from "react";
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
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

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
