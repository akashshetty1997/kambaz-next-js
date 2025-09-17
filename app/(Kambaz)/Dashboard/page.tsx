import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
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
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
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
          <Link href="/Courses/9012" className="wd-dashboard-course-link">
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
        <div className="wd-dashboard-course">
          <Link href="/Courses/3456" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="Course"
            />
            <div>
              <h5>CS3456 Node.js</h5>
              <p>Backend Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/7890" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="Course"
            />
            <div>
              <h5>CS7890 Python</h5>
              <p>Data Science & ML</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2345" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="Course"
            />
            <div>
              <h5>CS2345 Angular</h5>
              <p>Frontend Framework</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/6789" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="Course"
            />
            <div>
              <h5>CS6789 Cloud Computing</h5>
              <p>AWS & Azure</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
