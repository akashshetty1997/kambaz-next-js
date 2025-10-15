"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  const currentSection = pathname.split("/").pop();

  return (
    <div id="wd-course-breadcrumb" className="text-danger mb-3">
       {course?.name} &gt; {currentSection}
    </div>
  );
}
