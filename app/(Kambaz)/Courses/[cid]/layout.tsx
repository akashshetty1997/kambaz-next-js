"use client";

import { ReactNode, use } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

function toTitle(s: string) {
  return s
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);

  const pathname = usePathname();
  const raw = pathname.split("/").filter(Boolean);
  const segments = raw.filter((s) => !s.startsWith("(") && !s.endsWith(")"));

  const items = segments.map((seg, i) => {
    const label = toTitle(decodeURIComponent(seg));
    const href = "/" + segments.slice(0, i + 1).join("/");
    return {
      label,
      href,
      isLast: i === segments.length - 1,
      isCourses: label.toLowerCase() === "courses",
    };
  });

  return (
    <div id="wd-courses" className="p-3">
      <div className="d-flex align-items-center mb-2">
        <FaAlignJustify className="text-danger fs-4 me-3" />
        <h2 className="mb-0">
          <Breadcrumb className="mb-0">
            <BreadcrumbItem
              linkAs={Link}
              href="/Dashboard"
              linkProps={{ className: "text-decoration-none text-danger" }}
            >
              Dashboard
            </BreadcrumbItem>

            {items.map((it, i) => {
              if (it.isCourses) {
                return null; 
              }

              return it.isLast ? (
                <BreadcrumbItem key={i} active>
                  <span className="text-danger">{it.label}</span>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem
                  key={i}
                  linkAs={Link}
                  href={it.href}
                  linkProps={{ className: "text-decoration-none text-danger" }}
                >
                  {it.label}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </h2>
      </div>

      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block me-4">
          <CourseNavigation cid={cid} />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
