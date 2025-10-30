"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
    } else {
      redirect("/Account/Profile");
    }
  }, [currentUser]);

  return null;
}
