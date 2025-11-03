import React, { useEffect } from "react";
import Social from "./Social.jsx";
import ThemeIcon from "./ThemeIcon.jsx";
import "../styles/global.css";

export default function Footer() {
  useEffect(() => {
    // ensure script is added only once
    const src = "https://unpkg.com/website-carbon-badges@1.1.3/b.min.js";
    const already = Array.from(document.scripts).some((s) => s.src === src);
    if (!already) {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      document.body.appendChild(s);
    }

    // Map subdomains to apex so Carbon has a result in test environments
    const mapToMeasuredHost = (host) => {
      // If it's any subdomain of brightonandco.co.uk, use the apex
      return host.endsWith(".brightonandco.co.uk")
        ? "brightonandco.co.uk"
        : host.replace(/^www\./, "");
    };

    // Set data-site on the badge before initializing
    const badgeEl = document.getElementById("wcb");
    if (badgeEl) {
      const currentHost = window.location.hostname;
      badgeEl.setAttribute("data-site", mapToMeasuredHost(currentHost));
    }

    // Re-initialize if script already present
    if (already && window.wcb) {
      try { window.wcb(); } catch {}
    }

    // set dark-mode class on the badge based on current theme
    const syncBadgeTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const el = document.getElementById("wcb");
      if (!el) return;
      el.classList.toggle("wcb-d", isDark);
    };
    syncBadgeTheme();

    // observe theme changes (html.dark toggled by ThemeIcon)
    const mo = new MutationObserver(syncBadgeTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);

  return (
    <footer className="site-footer">
      {/* Sitemap link */}
      <link rel="sitemap" href="/sitemap-index.xml" />

      <div className="footer-container">
        {/* Left section */}
        <div className="footer-section footer-left">
          <p>
            &copy; {new Date().getFullYear()} TEST: Brighton and Co. <br />
            All rights reserved.
          </p>
        </div>

        {/* Middle section: Social icons */}
        <div className="footer-section footer-middle">
          <h4>Follow Me:</h4>
          <div className="social-links">
            <Social platform="Twitter" username="ItsHarryB_" iconOnly />
            <Social platform="GitHub" username="ItsHarryB" iconOnly />
            <Social
              platform="LinkedIn"
              url="https://www.linkedin.com/in/harry-brighton-8a2b971a4/"
              iconOnly
            />
          </div>
        </div>

        {/* Right section: Quick links */}
        <div className="footer-section footer-right">
          <h4>Quick Links:</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/enquiries/">Enquiries</a>
            </li>
            <li>
              <a href="/about-me/">About Me</a>
            </li>
            <li>
              <a href="/blog/">Blog</a>
            </li>
            <li>
              <a href="/photography/">Photography</a>
            </li>
            <li>
              <a href="/links/">Links</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Theme toggle centered below the columns */}
      <div className="footer-toggle">
        <h4>Toggle Theme:</h4>
        <ThemeIcon client:load />
      </div>

      {/* Website Carbon Badge (below toggle, above meta) */}
      <div className="footer-carbon" aria-label="Website Carbon Badge">
        {/* data-site is set/overridden in useEffect at runtime */}
        <div id="wcb" className="carbonbadge"></div>
      </div>

      {/* Footer meta */}
      <div className="footer-meta">
        <p>
          TEST: Brighton and Co Website – Made by Harry Brighton | Version 0.8.4a - 03/11/2025
        </p>
      </div>
    </footer>
  );
}
