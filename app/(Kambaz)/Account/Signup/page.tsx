/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter(); 

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div
      id="wd-signup-screen"
      className="container mt-4"
      style={{ maxWidth: 400 }}
    >
      <h1>Sign up</h1>

      {error && (
        <div className="alert alert-danger mb-2" id="wd-signup-error">
          {error}
        </div>
      )}

      <FormControl
        id="wd-username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mb-2"
        placeholder="Username"
      />

      <FormControl
        id="wd-password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-2"
        placeholder="Password"
        type="password"
      />

      <Button
        onClick={signup}
        id="wd-signup-btn"
        className="w-100 btn-primary mb-2"
      >
        Sign up
      </Button>

      <div className="text-center">
        <Link id="wd-signin-link" href="/Account/Signin">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}