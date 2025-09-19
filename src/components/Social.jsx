import React, { useEffect, useState } from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Social({ platform, username, url }) {
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode changes
  useEffect(() => {
    const updateDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    updateDarkMode();

    // Observe class changes on <html>
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

  const baseColor = isDark ? "#ddd" : "#333";
  const hoverColors = {
    Twitter: "#1DA1F2",
    GitHub: "#24292f",
    LinkedIn: "#0A66C2",
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: isDark ? "#333" : "#f0f0f0",
        color: baseColor,
        textDecoration: "none",
        transition: "background 0.3s, color 0.3s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverColors[platform] || "#000";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isDark ? "#333" : "#f0f0f0";
        e.currentTarget.style.color = baseColor;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {Icon && <Icon size={20} strokeWidth={1.8} />}
      <span style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: 0,
      }}>{platform}</span>
    </a>
  );
}
