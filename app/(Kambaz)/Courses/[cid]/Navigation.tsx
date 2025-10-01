"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();

  const links = [
    { href: `/Courses/${cid}/Home`, label: "Home", id: "wd-course-home-link" },
    {
      href: `/Courses/${cid}/Modules`,
      label: "Modules",
      id: "wd-course-modules-link",
    },
    {
      href: `/Courses/${cid}/Piazza`,
      label: "Piazza",
      id: "wd-course-piazza-link",
    },
    { href: `/Courses/${cid}/Zoom`, label: "Zoom", id: "wd-course-zoom-link" },
    {
      href: `/Courses/${cid}/Assignments`,
      label: "Assignments",
      id: "wd-course-assignments-link",
    },
    {
      href: `/Courses/${cid}/Quizzes`,
      label: "Quizzes",
      id: "wd-course-quizzes-link",
    },
    {
      href: `/Courses/${cid}/People/Table`,
      label: "People",
      id: "wd-course-people-link",
    },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname.includes(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            id={link.id}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
