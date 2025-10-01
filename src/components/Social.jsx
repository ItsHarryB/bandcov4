import React, { useEffect, useState } from "react";
import { Twitter, Github, Linkedin, Instagram, Cloud } from "lucide-react";
import "../styles/social.css";

export default function Social({ platform, username, url, iconOnly = false }) {
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
    case "Twitter": link = username ? `https://twitter.com/${username}` : "#"; break;
    case "GitHub": link = username ? `https://github.com/${username}` : "#"; break;
    case "LinkedIn": link = url || (username ? `https://www.linkedin.com/in/${username}/` : "#"); break;
    case "Instagram": link = username ? `https://instagram.com/${username}` : "#"; break;
    case "Bluesky": link = username ? `https://${username}` : "#"; break;
    default: break;
  }

  // Determine Icon
  let Icon = null;
  switch (platform) {
    case "Twitter": Icon = Twitter; break;
    case "GitHub": Icon = Github; break;
    case "LinkedIn": Icon = Linkedin; break;
    case "Instagram": Icon = Instagram; break;
    case "Bluesky": Icon = Cloud; break;
    default: break;
  }

  const platformClass = platform.toLowerCase();

  if (iconOnly) {
    // For footer or standalone icon usage
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`social-link ${platformClass} ${isDark ? "dark" : ""}`}
        data-platform={platformClass}
      >
        {Icon && <Icon size={24} strokeWidth={1.8} />}
      </a>
    );
  }

  // Full card clickable
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-card ${platformClass} ${isDark ? "dark" : ""}`}
      data-platform={platformClass}
    >
      <div className={`social-link ${platformClass}`}>
        {Icon && <Icon size={24} strokeWidth={1.8} />}
      </div>
      <span className="social-label">{platform}</span>
    </a>
  );
}
