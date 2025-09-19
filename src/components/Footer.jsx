import { h } from "preact";
import Social from "./Social.jsx";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "2rem 1rem",
        backgroundColor: "#f8f8f8",
        color: "#333",
        textAlign: "center",
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Sitemap link */}
      <div style={{ marginBottom: "1rem" }}>
        <a
          href="/sitemap-index.xml"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Sitemap
        </a>
      </div>

      {/* Social media links */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Social platform="Twitter" username="ItsHarryB" />
        <Social platform="GitHub" username="ItsHarryB_" />
        <Social
          platform="LinkedIn"
          url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/"
        />
      </div>

      {/* Copyright / info */}
      <div style={{ fontSize: "0.875rem", color: "#666" }}>
        TEST: Brighton and Co Website – Made by Harry Brighton | Version 0.0.1 / 19/09/2025
      </div>
    </footer>
  );
}
