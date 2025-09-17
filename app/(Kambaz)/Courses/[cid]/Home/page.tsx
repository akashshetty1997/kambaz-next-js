export default function CourseHome({ params }: any) {
  return (
    <div id="wd-course-home">
      <h2>Home</h2>
      <div id="wd-course-status">Course Status: Published</div>
      <div id="wd-course-actions">
        <button>Import</button>
        <button>Export</button>
        <button>View</button>
      </div>
      <h3>Modules</h3>
      <ul>
        <li>
          Module 1
          <ul>
            <li>Lesson 1.1</li>
            <li>Lesson 1.2</li>
          </ul>
        </li>
        <li>
          Module 2
          <ul>
            <li>Lesson 2.1</li>
            <li>Lesson 2.2</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
