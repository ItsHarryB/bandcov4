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

  // Determine URL
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

  if (iconOnly) {
    // For footer or standalone icon usage
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

  // Full card clickable
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-card ${platformClass} ${isDark ? "dark" : ""}`}
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

      <div className={`social-link ${platformClass}`} ref={iconRef}>
        {Icon && <Icon size={24} strokeWidth={1.8} style={iconStyle} />}
      </div>

      <span className="social-label">{platform}</span>
    </a>
  );
}
