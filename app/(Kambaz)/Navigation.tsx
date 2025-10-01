"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    {
      href: "/Account",
      icon: FaRegCircleUser,
      label: "Account",
      id: "wd-account-link",
    },
    {
      href: "/Dashboard",
      icon: AiOutlineDashboard,
      label: "Dashboard",
      id: "wd-dashboard-link",
    },
    {
      href: "/Courses",
      icon: LiaBookSolid,
      label: "Courses",
      id: "wd-courses-link",
    },
    {
      href: "/Calendar",
      icon: IoCalendarOutline,
      label: "Calendar",
      id: "wd-calendar-link",
    },
    { href: "/Inbox", icon: FaInbox, label: "Inbox", id: "wd-inbox-link" },
    { href: "/Labs", icon: LiaCogSolid, label: "Labs", id: "wd-labs-link" },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <Image 
          src="/images/NEU.png" 
          width={75} 
          height={75} 
          alt="Northeastern University" 
        />
      </ListGroupItem>
      <br />

      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname.startsWith(link.href);

        return (
          <div key={link.href}>
            <ListGroupItem
              className={`border-0 text-center ${
                isActive ? "bg-white" : "bg-black"
              }`}
            >
              <Link
                href={link.href}
                id={link.id}
                className="text-decoration-none"
              >
                <Icon
                  className={`fs-1 ${
                    isActive
                      ? "text-danger"
                      : link.href === "/Account"
                      ? "text-white"
                      : "text-danger"
                  }`}
                />
                <br />
                <span className={isActive ? "text-danger" : "text-white"}>
                  {link.label}
                </span>
              </Link>
            </ListGroupItem>
            <br />
          </div>
        );
      })}
    </ListGroup>
  );
}
