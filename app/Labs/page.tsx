import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <h2>Your Full Name - Section XX</h2>

      <h3>Lab Assignments</h3>
      <ul>
        <li>
          <Link href="/Labs/Lab1">Lab 1 - HTML</Link>
        </li>
        <li>
          <Link href="/Labs/Lab2">Lab 2 - CSS</Link>
        </li>
        <li>
          <Link href="/Labs/Lab3">Lab 3 - JavaScript</Link>
        </li>
      </ul>

      <h3>Kambaz Application</h3>
      <ul>
        <li>
          <Link href="/">Go to Kambaz</Link>
        </li>
        <li>
          <a href="https://kambaz-next-js-fawn.vercel.app" target="_blank">
            Kambaz on Vercel (Deployed)
          </a>
        </li>
      </ul>

      <h3>Source Code Repository</h3>
      <ul>
        <li>
          <a
            href="https://github.com/akashshetty1997/kambaz-next-js"
            id="wd-github"
            target="_blank"
          >
            GitHub Repository
          </a>
        </li>
      </ul>
    </div>
  );
}
