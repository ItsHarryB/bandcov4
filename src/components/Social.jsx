import React, { useEffect, useState } from "react";
import { Twitter, Github, Linkedin, Instagram, Cloud } from "lucide-react";
import { TbBrandVinted } from "react-icons/tb"; // Vinted icon
import { SiEbay } from "react-icons/si";       // eBay icon
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
    case "Vinted": link = url || "#"; break;
    case "eBay": link = username ? `https://www.ebay.co.uk/usr/${username}` : "#"; break;
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
    case "Vinted": Icon = TbBrandVinted; break; // Official Vinted icon
    case "eBay": Icon = SiEbay; break;         // Official eBay icon
    default: break;
  }

  const platformClass = platform.toLowerCase();

  if (iconOnly) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`social-link ${platformClass} ${isDark ? "dark" : ""}`}
        data-platform={platformClass}
      >
        {Icon && <Icon size={24} />}
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
        {Icon && <Icon size={24} />}
      </div>
      <span className="social-label">{platform}</span>
    </a>
  );
}
