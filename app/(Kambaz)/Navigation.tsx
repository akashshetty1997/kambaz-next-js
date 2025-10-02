'use client';
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBook, FaFlask, FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const ITEM_CLASS = "text-decoration-none d-inline-block w-100 text-center py-2";
const ICON_CLASS = "fs-1 d-block mx-auto";

export default function KambazNavigation() {
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState<string>("dashboard");

  useEffect(() => {
    if (pathname === "/Dashboard" || pathname?.startsWith("/Dashboard/") || 
        pathname?.startsWith("/Courses/")) {
    } else if (pathname === "/Calendar" || pathname?.startsWith("/Calendar/")) {
      setActiveButton("calendar");
    } else if (pathname === "/Inbox" || pathname?.startsWith("/Inbox/")) {
      setActiveButton("inbox");
    } else if (pathname === "/Labs" || pathname?.startsWith("/Labs/")) {
      setActiveButton("labs");
    } else if (pathname === "/Account" || pathname?.startsWith("/Account/")) {
      setActiveButton("account");
    }
  }, [pathname]);

  const isActive = (buttonName: string) => {
    // For Dashboard/Courses, check if we're on Dashboard path AND the button matches
    if ((buttonName === "dashboard" || buttonName === "courses") && 
        (pathname === "/Dashboard" || pathname?.startsWith("/Dashboard/") || pathname?.startsWith("/Courses/"))) {
      return activeButton === buttonName;
    }
    // For other buttons, just check the pathname
    return activeButton === buttonName;
  };

  // Helper to compute classes per item
  const itemClasses = (active: boolean) =>
    active ? "bg-white" : "bg-black";

  const linkTextClasses = (active: boolean) =>
    active ? "text-danger" : "text-white";

  // Helper to compute icon color based on active state
  const iconColorClasses = (active: boolean) =>
    active ? "text-danger" : "text-danger"; // Icons stay red regardless of active state

  return (
    <ListGroup 
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" 
      style={{ width: 110 }}
      id="wd-kambaz-navigation">
      
      <ListGroupItem className="bg-black border-0 text-center" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Account" id="wd-account-link" className="text-white text-decoration-none"
              onClick={() => setActiveButton("account")}>
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>
      
      <ListGroupItem className={`border-0 ${itemClasses(isActive("dashboard"))} text-center`}>
        <Link href="/Dashboard" id="wd-dashboard-link" 
              className={`${ITEM_CLASS} ${linkTextClasses(isActive("dashboard"))}`}
              onClick={() => setActiveButton("dashboard")}>
          <AiOutlineDashboard className={`${ICON_CLASS} ${iconColorClasses(isActive("dashboard"))}`} />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 ${itemClasses(isActive("courses"))} text-center`}>
        <Link href="/Dashboard" id="wd-course-link" 
              className={`${ITEM_CLASS} ${linkTextClasses(isActive("courses"))}`}
              onClick={() => setActiveButton("courses")}>
          <FaBook className={`${ICON_CLASS} ${iconColorClasses(isActive("courses"))}`} />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 ${itemClasses(isActive("calendar"))} text-center`}>
        <Link href="/Calendar" id="wd-calendar-link" 
              className={`${ITEM_CLASS} ${linkTextClasses(isActive("calendar"))}`}
              onClick={() => setActiveButton("calendar")}>
          <FaCalendarAlt className={`${ICON_CLASS} ${iconColorClasses(isActive("calendar"))}`} />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 ${itemClasses(isActive("inbox"))} text-center`}>
        <Link href="/Inbox" id="wd-inbox-link" 
              className={`${ITEM_CLASS} ${linkTextClasses(isActive("inbox"))}`}
              onClick={() => setActiveButton("inbox")}>
          <FaInbox className={`${ICON_CLASS} ${iconColorClasses(isActive("inbox"))}`} />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 ${itemClasses(isActive("labs"))} text-center`}>
        <Link href="/Labs/Lab1" id="wd-labs-link" 
              className={`${ITEM_CLASS} ${linkTextClasses(isActive("labs"))}`}
              onClick={() => setActiveButton("labs")}>
          <FaFlask className={`${ICON_CLASS} ${iconColorClasses(isActive("labs"))}`} />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}