import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Social({ platform, username, url }) {
  let link = "#";
  let Icon = null;
  let extraClass = "";

  if (platform === "Twitter" && username) {
    link = `https://twitter.com/${username}`;
    Icon = Twitter;
    extraClass = "twitter";
  } else if (platform === "GitHub" && username) {
    link = `https://github.com/${username}`;
    Icon = Github;
    extraClass = "github";
  } else if (platform === "LinkedIn" && url) {
    link = url;
    Icon = Linkedin;
    extraClass = "linkedin";
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      className={`social-link ${extraClass}`}
    >
      {Icon && <Icon size={20} className="icon" />}
      <span className="sr-only">{platform}</span>
    </a>
  );
}
