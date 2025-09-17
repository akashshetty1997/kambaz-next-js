import Link from "next/link";
import Image from "next/image";
import KambazNavigation from "../Navigation";

export default function Dashboard() {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top">
            <KambazNavigation />
          </td>
          <td valign="top" width="100%">
            <div id="wd-dashboard">
              <h1 id="wd-dashboard-title">Dashboard</h1>
              <hr />
              <h2 id="wd-dashboard-published">Published Courses (3)</h2>
              <hr />
              <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                  <Link
                    href="/Courses/1234"
                    className="wd-dashboard-course-link"
                  >
                    <Image
                      src="/images/reactjs.jpg"
                      width={200}
                      height={150}
                      alt="React"
                    />
                    <div>
                      <h5>CS1234 React JS</h5>
                      <p className="wd-dashboard-course-title">
                        Full Stack software developer
                      </p>
                      <button>Go</button>
                    </div>
                  </Link>
                </div>
                <div className="wd-dashboard-course">
                  <Link
                    href="/Courses/5678"
                    className="wd-dashboard-course-link"
                  >
                    <Image
                      src="/images/reactjs.jpg"
                      width={200}
                      height={150}
                      alt="Course"
                    />
                    <div>
                      <h5>CS5678 Next.js</h5>
                      <p>Web Development</p>
                      <button>Go</button>
                    </div>
                  </Link>
                </div>
                <div className="wd-dashboard-course">
                  <Link
                    href="/Courses/9012"
                    className="wd-dashboard-course-link"
                  >
                    <Image
                      src="/images/reactjs.jpg"
                      width={200}
                      height={150}
                      alt="Course"
                    />
                    <div>
                      <h5>CS9012 Databases</h5>
                      <p>SQL & NoSQL</p>
                      <button>Go</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
