import React from "react";
import Social from "./Social.jsx";

export default function Footer() {
  return (
    <footer className="site-footer" style={{ padding: "2rem 1rem", textAlign: "center", background: "#f8f8f8", transition: "background 0.5s ease, color 0.5s ease" }}>
      {/* Sitemap link */}
      <link rel="sitemap" href="/sitemap-index.xml" />

      {/* Social links */}
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", gap: "12px" }}>
        <Social platform="Twitter" username="ItsHarryB" />
        <Social platform="GitHub" username="ItsHarryB_" />
        <Social platform="LinkedIn" url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/" />
      </div>

      {/* Footer text */}
      <div style={{ fontSize: "0.875rem", color: "#666" }}>
        &copy; {new Date().getFullYear()} TEST: Brighton and Co Website - Made by Harry Brighton | Version 0.0.1 / 19/09/2025
      </div>
    </footer>
  );
}
