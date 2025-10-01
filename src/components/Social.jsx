import React, { useEffect, useState, useRef } from "react";
import { Twitter, Github, Linkedin, Instagram, Cloud } from "lucide-react";
import "../styles/social.css";

export default function Social({ platform, username, url }) {
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

  // Determine link
  let link = "#";
  switch (platform) {
    case "Twitter": if (username) link = `https://twitter.com/${username}`; break;
    case "GitHub": if (username) link = `https://github.com/${username}`; break;
    case "LinkedIn": if (url) link = url; break;
    case "Instagram": if (username) link = `https://instagram.com/${username}`; break;
    case "Bluesky": if (username) link = `https://${username}`; break;
    default: break;
  }

  // Determine icon
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

  return (
    <>
      {/* Hidden reference icon for measuring size */}
      {platform === "Instagram" && (
        <span ref={referenceRef} style={{ visibility: "hidden", position: "absolute", width: 0, height: 0 }}>
          <Twitter size={24} strokeWidth={1.8} />
        </span>
      )}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={platform}
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
      </a>
    </>
  );
}
