import React, { useEffect, useState, useRef } from "react";
import { Twitter, Github, Linkedin, Instagram, Cloud } from "lucide-react";
import "../styles/social.css";

export default function Social({ platform, username, url, iconOnly = false }) {
  const [isDark, setIsDark] = useState(false);
  const iconRef = useRef(null);
  const referenceRef = useRef(null);

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

  // Determine the URL
  let link = "#";
  switch (platform) {
    case "Twitter": link = username ? `https://twitter.com/${username}` : "#"; break;
    case "GitHub": link = username ? `https://github.com/${username}` : "#"; break;
    case "LinkedIn": link = url || (username ? `https://www.linkedin.com/in/${username}/` : "#"); break;
    case "Instagram": link = username ? `https://instagram.com/${username}` : "#"; break;
    case "Bluesky": link = username ? `https://${username}` : "#"; break;
    default: break;
  }

  // Determine the icon
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

  // Dynamic scaling for Instagram
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (platform === "Instagram" && iconRef.current && referenceRef.current) {
      const updateScale = () => {
        const referenceWidth = referenceRef.current.offsetWidth;
        const currentWidth = iconRef.current.offsetWidth;
        setScale(referenceWidth / currentWidth);
      };
      updateScale();

      const resizeObserver = new ResizeObserver(updateScale);
      resizeObserver.observe(iconRef.current.parentElement);
      resizeObserver.observe(referenceRef.current.parentElement);

      return () => resizeObserver.disconnect();
    }
  }, [platform]);

  const iconStyle = platform === "Instagram" ? { transform: `scale(${scale})` } : {};

  // Render only the icon for footers
  if (iconOnly) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`social-link ${platformClass} ${isDark ? "dark" : ""}`}
        data-platform={platformClass}
        ref={iconRef}
      >
        {Icon && <Icon size={24} strokeWidth={1.8} style={iconStyle} />}
      </a>
    );
  }

  // Render full card (default)
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="social-card"
      data-platform={platformClass}
    >
      {platform === "Instagram" && (
        <span
          ref={referenceRef}
          style={{ visibility: "hidden", position: "absolute", width: 0, height: 0 }}
        >
          <Twitter size={24} strokeWidth={1.8} />
        </span>
      )}

      <div
        className={`social-link ${platformClass} ${isDark ? "dark" : ""}`}
        ref={iconRef}
        data-platform={platformClass}
      >
        {Icon && <Icon size={24} strokeWidth={1.8} style={iconStyle} />}
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
      </div>

      <span className="social-label">{platform}</span>
    </a>
  );
}
