/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import Link from "next/link";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter(); 

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      console.log("Signed in user:", user); 
      if (!user) {
        alert("Invalid username or password. Please try again!");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard"); 
    } catch (error: any) {
      console.error("Signin error:", error);
      alert(
        error.response?.data?.message ||
          "Unable to sign in. Please check your credentials or try again later."
      );
    }
  };

  return (
    <div
      id="wd-signin-screen"
      className="container mt-4"
      style={{ maxWidth: 400 }}
    >
      <h1>Sign In</h1>

      <FormControl
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="Username"
        id="wd-username"
      />

      <FormControl
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="Password"
        type="password"
        id="wd-password"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            signin();
          }
        }}
      />

      <Button
        onClick={signin}
        id="wd-signin-btn"
        className="w-100 btn-primary mb-2"
      >
        Sign In
      </Button>

      <div className="text-center">
        <Link id="wd-signup-link" href="/Account/Signup">
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
}