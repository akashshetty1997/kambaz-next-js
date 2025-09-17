export default function Modules() {
  return (
    <div>
      <button>Collapse All</button>
      <button>View Progress</button>
      <button>Publish All</button>
      <button>Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn CSS fundamentals (selectors, properties, colors, fonts)
                </li>
                <li className="wd-content-item">
                  Apply layouts with Flexbox and Grid
                </li>
                <li className="wd-content-item">
                  {" "}
                  Practice styling HTML pages with responsive design principles
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Dive into JavaScript basics (variables, types, operators,
                  functions)
                </li>
                <li className="wd-content-item">
                  Work with DOM manipulation and event handling
                </li>
                <li className="wd-content-item">
                  Build simple interactive web pages combining HTML, CSS, and JS
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
