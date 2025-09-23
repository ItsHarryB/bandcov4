import React, { useState, useEffect } from "react";

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
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${expanded ? "active" : ""}`}
        aria-label="Toggle navigation menu"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </button>

      {/* Navigation Links */}
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

      {/* Optional overlay */}
      <div
        className={`nav-overlay ${expanded ? "active" : ""}`}
        onClick={() => setExpanded(false)}
      ></div>
    </>
  );
}
