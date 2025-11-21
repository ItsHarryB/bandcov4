import React, { useState, useEffect, useRef } from "react";

export default function WebsiteSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const websites = [
    {
      name: "Brighton and Co",
      logo: "/webfavicon.png",
      url: "https://web.brightonandco.co.uk",
    },
    {
      name: "OLD Brighton and Co",
      logo: "/oldfavicon.png",
      url: "https://old.brightonandco.co.uk",
    },
  ];

  return (
    <div className="website-switcher" ref={dropdownRef}>
      <button
        className="switcher-toggle"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label="Switch between websites"
      >
        <span className="switcher-icon">
          <svg
            className={`chevron ${isOpen ? "rotated" : ""}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </span>
      </button>

      <div className={`switcher-dropdown ${isOpen ? "open" : ""}`}>
        <div className="dropdown-header">
          <span>Switch Website</span>
        </div>
        <ul className="website-list">
          {websites.map((site, index) => (
            <li key={index}>
              <a href={site.url} className="website-link">
                <img src={site.logo} alt={`${site.name} logo`} className="website-logo" />
                <span className="website-name">{site.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}