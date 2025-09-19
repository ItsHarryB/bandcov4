import React from "react";
import Social from "./Social.jsx";

export default function Footer() {
  return (
    <footer style={{ padding: "1rem", textAlign: "center", marginTop: "2rem" }}>
      <p style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#666" }}>
        TEST: Brighton and Co Website - Made by Harry Brighton | Version 0.0.1 / 19/09/2025
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <Social platform="Twitter" username="ItsHarryB" />
        <Social platform="GitHub" username="ItsHarryB_" />
        <Social platform="LinkedIn" url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/" />
      </div>

      <div>
        <a href="/sitemap-index.xml" style={{ fontSize: "0.85rem", color: "#0094b6", textDecoration: "underline" }}>
          Sitemap
        </a>
      </div>
    </footer>
  );
}
