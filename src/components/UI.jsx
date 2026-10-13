import React, { useEffect, useRef } from "react";
import { useMotionPreference as useReducedMotion } from "../hooks/useMotionPreference";

export function Arrow({ diagonal = false, ...props }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      {...props}
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
let revealObserver;
function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.add("revealed");
            revealObserver.unobserve(target);
          }
        });
      },
      { rootMargin: "0px 0px -24px 0px", threshold: 0.05 },
    );
  }
  return revealObserver;
}
export function Reveal({
  children,
  className = "",
  delay = 0,
  eager = false,
  ...props
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (eager || reduced || !("IntersectionObserver" in window)) {
      node.classList.add("revealed");
      return;
    }
    const observer = getRevealObserver();
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [eager, reduced]);
  return (
    <div
      ref={ref}
      className={`${className} reveal${eager || reduced ? " revealed" : ""}`}
      style={{ "--reveal-delay": `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  );
}
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      ref.current.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
export function SectionTitle({ number, label, title, accent, children }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">
        <span>{number} /</span> {label}
      </p>
      <div className="heading-row">
        <h2>
          {title}
          <br />
          <span className="muted">{accent}</span>
        </h2>
        {children && <p className="section-intro">{children}</p>}
      </div>
    </Reveal>
  );
}
export function Spotlight({ children, className = "", ...props }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className={`spotlight ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export function Cursor() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer: fine)").matches) return;
    const cursor = ref.current;
    const move = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursor.classList.add("visible");
      cursor.classList.toggle(
        "interactive",
        Boolean(e.target.closest("a, button, input, textarea")),
      );
      const label = e.target.closest("[data-cursor]")?.dataset.cursor;
      cursor.classList.toggle("has-label", Boolean(label));
      cursor.querySelector("b").textContent = label || "";
    };
    const hide = () => cursor.classList.remove("visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [reduced]);
  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span />
      <b />
    </div>
  );
}
