import React, { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/enquiries/", label: "Enquiries" },
  { href: "/about/", label: "About Me" },
  { href: "/blog/", label: "Blog" },
  { href: "/photography/", label: "Photography" },
  { href: "/links/", label: "Links" },
];

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <nav className={`nav-links ${expanded ? "expanded" : ""}`} aria-label="Main navigation">
      <ul>
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setExpanded(false)}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
