import React, { useEffect, useState } from "react";
import Social from "./Social.jsx";
import ThemeIcon from "./ThemeIcon.jsx";
import "../styles/global.css";

export default function Footer() {
  const [wcbDark, setWcbDark] = useState(false);

  useEffect(() => {
    const getIsDark = () =>
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark";

    setWcbDark(getIsDark());

    let scriptInjected = false;

    const inject = () => {
      // Check if script already exists in DOM
      if (document.querySelector('script[data-carbon-badge]')) {
        return;
      }

      const s = document.createElement("script");
      s.src = "https://unpkg.com/website-carbon-badges@1.1.3/b.min.js";
      s.defer = true;
      s.setAttribute("data-carbon-badge", "true");
      
      // Add error handler for script loading
      s.onerror = () => {
        console.warn("Website Carbon Badge script failed to load");
      };
      
      document.body.appendChild(s);
      scriptInjected = true;
    };

    inject();

    let attempts = 0;
    const maxAttempts = 2; // Reduced from 3
    const timers = [];
    let badgeLoaded = false;

    const isLoaded = () => {
      const el = document.getElementById("wcb");
      return !!el?.querySelector("a[href*='websitecarbon.com'], svg") &&
             !/no result/i.test(el.textContent || "");
    };

    const retry = () => {
      if (badgeLoaded) return;

      const el = document.getElementById("wcb");
      if (!el) return;

      if (isLoaded()) {
        badgeLoaded = true;
        return;
      }

      if (attempts < maxAttempts) {
        attempts++;
        
        // Remove ALL scripts that might have been injected
        document
          .querySelectorAll('script[src*="website-carbon-badges"]')
          .forEach((n) => n.remove());
        
        el.innerHTML = "";
        scriptInjected = false;
        
        timers.push(
          setTimeout(() => {
            inject();
            timers.push(setTimeout(retry, 6000)); // Increased wait time
          }, 4000 * attempts)
        );
      } else {
        // After max attempts, hide the badge completely
        el.style.display = "none";
        // Optionally hide the entire footer-carbon-badge container
        el.closest('.footer-carbon-badge')?.style.setProperty('display', 'none');
      }
    };

    timers.push(setTimeout(retry, 8000)); // Increased initial wait

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
            &copy; {new Date().getFullYear()} Brighton and Co. <br />
            All rights reserved.
          </p>
        </div>

        {/* Middle section: Social icons */}
        <div className="footer-section footer-middle">
          <h4 id="social-heading">Follow Me:</h4>
          <div className="social-links" role="list" aria-labelledby="social-heading">
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
          <h4 id="quick-links-heading">Quick Links:</h4>
          <ul aria-labelledby="quick-links-heading">
            <li><a href="/">Home</a></li>
            <li><a href="/enquiries/">Enquiries</a></li>
            <li><a href="/about-me/">About Me</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/photography/">Photography</a></li>
            <li><a href="/links/">Links</a></li>
            <li><a href="/terms-and-conditions/">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Theme toggle centered below the columns */}
      <div className="footer-toggle" style={{ marginBottom: "0.5rem" }}>
        <h4 id="theme-toggle-heading">Toggle Theme:</h4>
        <div aria-labelledby="theme-toggle-heading">
          <ThemeIcon client:load />
        </div>
      </div>

      {/* Website Carbon Badge (centered, tight spacing) */}
      <div className="footer-carbon-badge">
        <div id="wcb" className={`carbonbadge${wcbDark ? " wcb-d" : ""}`}></div>
      </div>

      {/* Footer meta */}
      <div className="footer-meta" style={{ marginTop: "1.25rem" }}>
        <p>
          Brighton and Co Website – Made by Harry Brighton | Version 4.0.3 - 05/11/2025
        </p>
      </div>
    </footer>
  );
}
