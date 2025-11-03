import React, { useEffect, useState } from "react";
import Social from "./Social.jsx";
import ThemeIcon from "./ThemeIcon.jsx"; // Import your toggle
import "../styles/global.css";

export default function Footer() {
  const [wcbDark, setWcbDark] = useState(false);

  useEffect(() => {
    const getIsDark = () =>
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark";

    setWcbDark(getIsDark());

    const inject = () => {
      if (!document.querySelector('script[data-carbon-badge]')) {
        const s = document.createElement("script");
        s.src = "https://unpkg.com/website-carbon-badges@1.1.3/b.min.js";
        s.defer = true;
        s.setAttribute("data-carbon-badge", "true");
        document.body.appendChild(s);
      }
    };

    inject();

    // Retry a few times if the badge fails (e.g., API 503) without spamming
    let attempts = 0;
    const maxAttempts = 3;
    const timers = [];
    const retry = () => {
      const el = document.getElementById("wcb");
      if (!el) return;
      const hasSVG = !!el.querySelector("svg");
      const showsNoResult = /no result/i.test(el.textContent || "");
      if ((showsNoResult || !hasSVG) && attempts < maxAttempts) {
        attempts++;
        // remove script to force a clean re-run, clear container
        document
          .querySelectorAll('script[src*="website-carbon-badges"]')
          .forEach((n) => n.remove());
        el.innerHTML = "";
        // staggered backoff
        timers.push(
          setTimeout(() => {
            inject();
            // schedule next check
            timers.push(setTimeout(retry, 5000));
          }, 3000 * attempts)
        );
      }
    };
    // first check after initial load
    timers.push(setTimeout(retry, 6000));

    const onThemeChange = (e) => {
      setWcbDark((e?.detail?.theme || (getIsDark() ? "dark" : "light")) === "dark");
    };
    document.addEventListener("themechange", onThemeChange);

    return () => {
      document.removeEventListener("themechange", onThemeChange);
      timers.forEach(clearTimeout);
    };
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
            <li><a href="/">Home</a></li>
            <li><a href="/enquiries/">Enquiries</a></li>
            <li><a href="/about-me/">About Me</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/photography/">Photography</a></li>
            <li><a href="/links/">Links</a></li>
          </ul>
        </div>
      </div>

      {/* Theme toggle centered below the columns */}
      <div className="footer-toggle" style={{ marginBottom: "0.5rem" }}>
        <h4>Toggle Theme:</h4>
        <ThemeIcon client:load />
      </div>

      {/* Website Carbon Badge (centered, tight spacing) */}
      <div className="footer-carbon-badge">
        <div id="wcb" className={`carbonbadge${wcbDark ? " wcb-d" : ""}`}></div>
      </div>

      {/* Footer meta */}
      <div className="footer-meta" style={{ marginTop: "1.25rem" }}>
        <p>
          TEST: Brighton and Co Website – Made by Harry Brighton | Version 0.8.5b - 03/11/2025
        </p>
      </div>
    </footer>
  );
}
