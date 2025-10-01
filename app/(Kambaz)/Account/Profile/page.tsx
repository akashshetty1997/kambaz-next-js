import { FormControl, FormLabel } from "react-bootstrap";
import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormLabel htmlFor="wd-username">Username</FormLabel>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />
      <FormLabel htmlFor="wd-password">Password</FormLabel>
      <FormControl
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <FormLabel htmlFor="wd-firstname">First Name</FormLabel>
      <FormControl
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="first name"
        className="mb-2"
      />
      <FormLabel htmlFor="wd-lastname">Last Name</FormLabel>
      <FormControl
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="last name"
        className="mb-2"
      />
      <FormLabel htmlFor="wd-dob">Date of Birth</FormLabel>
      <FormControl
        id="wd-dob"
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
      />
      <FormLabel htmlFor="wd-email">Email</FormLabel>
      <FormControl
        id="wd-email"
        defaultValue="alice@wonderland.com"
        placeholder="email"
        type="email"
        className="mb-2"
      />
      <FormLabel htmlFor="wd-role">Role</FormLabel>
      <select id="wd-role" className="form-select mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link
        id="wd-signout-btn"
        href="/Account/Signin"
        className="btn btn-danger w-100"
      >
        Sign out
      </Link>
    </div>
  );
}
