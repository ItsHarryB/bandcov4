import React, { useEffect, useState } from "react";
import { Twitter, Github, Linkedin, Instagram, Cloud } from "lucide-react";
import "../styles/social.css";

export default function Social({ platform, username, url }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateDarkMode();

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Determine link
  let link = "#";
  switch (platform) {
    case "Twitter":
      if (username) link = `https://twitter.com/${username}`;
      break;
    case "GitHub":
      if (username) link = `https://github.com/${username}`;
      break;
    case "LinkedIn":
      if (url) link = url;
      break;
    case "Instagram":
      if (username) link = `https://instagram.com/${username}`;
      break;
    case "Bluesky":
      if (username) link = `https://${username}`;
      break;
    default:
      break;
  }

  // Determine icon
  let Icon = null;
  switch (platform) {
    case "Twitter":
      Icon = Twitter;
      break;
    case "GitHub":
      Icon = Github;
      break;
    case "LinkedIn":
      Icon = Linkedin;
      break;
    case "Instagram":
      Icon = Instagram;
      break;
    case "Bluesky":
      Icon = Cloud;
      break;
    default:
      break;
  }

  // Platform class for CSS
  const platformClass = platform.toLowerCase();

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      className={`social-link ${platformClass} ${isDark ? "dark" : ""}`}
      data-platform={platformClass}
    >
      {Icon && (
        <Icon
          size={24}
          strokeWidth={1.8}
          style={
            platform === "Instagram"
              ? {
                  borderRadius: "50%",
                  padding: "6px",
                  // The gradient will be applied via CSS on hover
                }
              : {}
          }
        />
      )}
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {platform}
      </span>
    </a>
  );
}
