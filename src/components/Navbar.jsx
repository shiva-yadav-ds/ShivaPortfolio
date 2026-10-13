import React, { useEffect, useState } from "react";
import { Arrow } from "./UI";
import resume from "../assets/Resume.pdf";
const links = [
  ["about", "About"],
  ["projects", "Projects"],
  ["expertise", "Expertise"],
  ["work", "Journey"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", close);
    };
  }, []);
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a
          className="wordmark"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="Shiva Yadav home"
        >
          shiva<span>↗</span>
          <small>PORTFOLIO</small>
        </a>
        <div className="desktop-nav">
          {links.map(([id, title]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {title}
            </a>
          ))}
        </div>
        <a className="nav-contact" href="#contact">
          Let’s talk <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        {open && (
          <div id="mobile-menu" className="mobile-nav">
            {[...links, ["contact", "Contact"]].map(([id, title]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {title}
                <Arrow diagonal />
              </a>
            ))}
            <a
              href={resume}
              download="Shiva-Yadav-Resume.pdf"
              onClick={() => setOpen(false)}
            >
              Download résumé <Arrow />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
