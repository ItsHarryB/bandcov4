import React, { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/enquiries/", label: "Enquiries" },
  { href: "/about-me/", label: "About Me" },
  { href: "/blog/", label: "Blog" },
  { href: "/photography/", label: "Photography" },
  { href: "/links/", label: "Links" },
];

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  const normalizePath = (path) => path.replace(/\/+$/, "") || "/";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Lock scroll and add shadow when menu is expanded
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
      document.querySelector(".site-header")?.classList.add("menu-shadow");
    } else {
      document.body.style.overflow = "";
      document.querySelector(".site-header")?.classList.remove("menu-shadow");
    }

    // Cleanup in case component unmounts
    return () => {
      document.body.style.overflow = "";
      document.querySelector(".site-header")?.classList.remove("menu-shadow");
    };
  }, [expanded]);

  const path = normalizePath(currentPath);

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
        {links.map((link) => {
          const isActive = path === normalizePath(link.href);
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setExpanded(false)}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Optional overlay for mobile */}
      <div
        className={`nav-overlay ${expanded ? "active" : ""}`}
        onClick={() => setExpanded(false)}
      />
    </>
  );
}
