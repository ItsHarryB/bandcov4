import React, { useEffect, useState } from "preact";
import { Twitter, Github, Linkedin } from "lucide-react";
import "../styles/global.css";

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

  let link = "#";
  let Icon = null;

  if (platform === "Twitter" && username) {
    link = `https://twitter.com/${username}`;
    Icon = Twitter;
  } else if (platform === "GitHub" && username) {
    link = `https://github.com/${username}`;
    Icon = Github;
  } else if (platform === "LinkedIn" && url) {
    link = url;
    Icon = Linkedin;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      className={`social-link ${platform.toLowerCase()} ${isDark ? "dark" : ""}`}
    >
      {Icon && <Icon size={20} strokeWidth={1.8} />}
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
