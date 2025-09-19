import React from "react";
import Social from "./Social.jsx";

export default function Footer() {
  return (
    <footer style={{
      padding: "2rem 1rem",
      textAlign: "center",
      borderTop: "1px solid #ccc",
      marginTop: "2rem",
    }}>
      {/* Social links */}
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        <Social platform="Twitter" username="ItsHarryB" />
        <Social platform="GitHub" username="ItsHarryB_" />
        <Social platform="LinkedIn" url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/" />
      </div>

      {/* Sitemap */}
      <div style={{ marginBottom: "1rem" }}>
        <a href="/sitemap-index.xml" style={{ textDecoration: "underline", color: "inherit" }}>Sitemap</a>
      </div>

      {/* Footer text */}
      <div style={{ fontSize: "0.85rem", color: "inherit" }}>
        TEST: Brighton and Co Website - Made by Harry Brighton | Version 0.0.1 / 19/09/2025
      </div>
    </footer>
  );
}
