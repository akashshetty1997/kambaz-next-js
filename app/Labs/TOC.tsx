"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  const links = [
    { href: "/Labs", label: "Labs", id: "wd-labs" },
    { href: "/Labs/Lab1", label: "Lab 1", id: "wd-lab1" },
    { href: "/Labs/Lab2", label: "Lab 2", id: "wd-lab2" },
    { href: "/Labs/Lab3", label: "Lab 3", id: "wd-lab3" },
    { href: "/", label: "Kambaz", id: "wd-kambaz" },
  ];

  return (
    <Nav variant="pills" className="mb-3">
      {links.map((link) => (
        <NavItem key={link.href}>
          <NavLink
            href={link.href}
            as={Link}
            active={pathname === link.href}
            id={link.id}
          >
            {link.label}
          </NavLink>
        </NavItem>
      ))} 
    </Nav>
  );
}