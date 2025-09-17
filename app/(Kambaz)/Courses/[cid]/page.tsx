import { redirect } from "next/navigation";

export default async function CourseIndex({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  redirect(`/Courses/${cid}/Home`);
}
