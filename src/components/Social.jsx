import React, { useEffect, useState } from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Social({ platform, username, url }) {
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Initialize state
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  let link = "#";
  let Icon = null;
  let brandClass = "";

  if (platform === "Twitter" && username) {
    link = `https://twitter.com/${username}`;
    Icon = Twitter;
    brandClass = "twitter";
  } else if (platform === "GitHub" && username) {
    link = `https://github.com/${username}`;
    Icon = Github;
    brandClass = "github";
  } else if (platform === "LinkedIn" && url) {
    link = url;
    Icon = Linkedin;
    brandClass = "linkedin";
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      className={`social-link ${brandClass}`}
    >
      {Icon && <Icon className="icon" size={20} />}
      <span className="sr-only">{platform}</span>
    </a>
  );
}
