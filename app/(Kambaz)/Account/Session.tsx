import * as client from "./client";
import { useEffect, useState, useCallback } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";

interface SessionProps {
  children: ReactNode;
}

export default function Session({ children }: SessionProps) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: unknown) {
      // Type guard to check if error has response property
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { status?: number } };
        // Only log errors that aren't 401 (401 is expected when not logged in)
        if (error.response?.status !== 401) {
          console.error("Unexpected error fetching profile:", err);
        }
      } else {
        console.error("Unexpected error fetching profile:", err);
      }
      // Set current user to null when not authenticated
      dispatch(setCurrentUser(null));
    }
    setPending(false);
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (pending) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
