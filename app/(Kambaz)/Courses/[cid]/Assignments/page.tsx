import Link from "next/link";

export default function Assignments({ params }: any) {
  const { cid } = params;
  return (
    <div id="wd-assignments">
      <h2>Assignments</h2>
      <input placeholder="Search..." id="wd-assignments-search" />
      <br />
      <button>+ Group</button>
      <button>+ Assignment</button>
      <h3>Assignments</h3>
      <ul>
        <li>
          <Link href={`/Courses/${cid}/Assignments/123/Edit`}>
            A1 — HTML & Forms
          </Link>
        </li>
      </ul>
      <h3>Quizzes</h3>
      <ul>
        <li>Quiz 1 — HTML Basics</li>
      </ul>
      <h3>Exams</h3>
      <ul>
        <li>Midterm</li>
      </ul>
      <h3>Project</h3>
      <ul>
        <li>Final Project</li>
      </ul>
    </div>
  );
}
