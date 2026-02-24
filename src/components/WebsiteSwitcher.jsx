import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function WebsiteSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = document.getElementById("website-switcher-dropdown");
      
      if (
        dropdownElement && 
        !dropdownElement.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isOpen]);

  const updatePosition = () => {
    if (buttonRef.current && window.innerWidth >= 1300) {
      // On desktop, align with the button using fixed positioning
      const rect = buttonRef.current.getBoundingClientRect();
      
      // Get header bottom
      const header = document.querySelector('.site-header');
      const headerBottom = header ? header.getBoundingClientRect().bottom : 70;

      // Get site title width to match exactly
      const siteTitle = document.querySelector('.site-title');
      // Calculate width: siteTitle width + switcher button width + gap
      // Or just match the visual block of "Logo + Text"
      // The user wants to align left with switcher button, but expand width to match title
      
      let width = 'auto';
      if (siteTitle) {
        const titleRect = siteTitle.getBoundingClientRect();
        // Calculate total width from switcher left edge to title right edge
        const totalWidth = titleRect.right - rect.left;
        width = `${totalWidth}px`;
      }

      setDropdownStyle({
        position: 'fixed',
        top: `${headerBottom}px`,
        left: `${rect.left}px`,
        width: 'auto',    
        minWidth: width   
      });
    } else {
      // On mobile/tablet, use fixed positioning defined in CSS
      // 2. Ensure full width style is applied via CSS class
      setDropdownStyle({});
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      // Need to wait for render or force update, but calculating immediately usually works
      // We call updatePosition right before state change to ensure style is ready
      // However, since we render via Portal, we might need a slight delay or effect
      // But for now, calculating here is fine as the DOM elements (header/title) exist
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  // Update position when opening to ensure correct width calculation
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

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

  // Render the dropdown content
  const dropdownContent = (
    <div 
      id="website-switcher-dropdown"
      className={`switcher-dropdown ${isOpen ? "open" : ""}`}
      style={dropdownStyle}
    >
      {/* Removed "Switch Website" header as requested */}
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
  );

  return (
    <div className="website-switcher">
      <button
        ref={buttonRef}
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

      {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
    </div>
  );
}