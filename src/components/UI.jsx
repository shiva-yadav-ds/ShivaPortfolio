import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
export function Reveal({ children, className = "", delay = 0, ...props }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
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
    </div>
  );
}
