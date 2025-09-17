import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS + Bootstrap
          </Link>
        </li>
      </ul>

      <h3>QUIZZES</h3>
      <ul>
        <li>Q1 - HTML</li>
        <li>Q2 - CSS</li>
      </ul>

      <h3>EXAMS</h3>
      <ul>
        <li>Midterm</li>
        <li>Final</li>
      </ul>

      <h3>PROJECT</h3>
      <ul>
        <li>Final Project</li>
      </ul>
    </div>
  );
}
