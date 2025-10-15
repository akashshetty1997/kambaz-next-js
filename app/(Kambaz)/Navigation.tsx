"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* NEU Logo */}
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {/* Account link */}
      <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 ${
          pathname.includes("Account")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroupItem>

      {/* Navigation links */}
      {links.map((link) => {
        const active = pathname.startsWith(link.path);
        const Icon = link.icon;
        return (
          <ListGroupItem
            key={link.path}
            as={Link}
            href={link.path}
            className={`text-center border-0 ${
              active ? "bg-white text-danger" : "bg-black text-white"
            }`}
          >
            <Icon
              className={`fs-1 ${active ? "text-danger" : "text-danger"}`}
            />
            <br />
            {link.label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
