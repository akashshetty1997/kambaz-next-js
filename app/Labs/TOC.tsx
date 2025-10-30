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
    { href: "/Labs/Lab3", label: "Lab 3" , id: "wd-lab3"},
    { href: "/Labs/Lab4", label: "Lab 4", id: "wd-lab4" },
    { href: "/", label: "Kambaz" },
    {
      href: "https://github.com/akashshetty1997/kambaz-next-js",
      label: "My GitHub",
      id: "wd-github",
    },
  ];

  return (
    <Nav variant="pills" className="mb-3">
      {links.map((link) => (
        <NavItem key={link.href}>
          <NavLink
            as={Link}
            href={link.href}
            className={`nav-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
