"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  const links = [
    { href: "/Labs", label: "Labs" },
    { href: "/Labs/Lab1", label: "Lab 1" },
    { href: "/Labs/Lab2", label: "Lab 2" },
    { href: "/Labs/Lab3", label: "Lab 3" },
    { href: "/", label: "Kambaz" },
    {
      href: "https://github.com/akashshetty1997/kambaz-next-js",
      label: "My GitHub",
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
