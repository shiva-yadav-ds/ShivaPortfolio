import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Arrow, Reveal } from "./UI";
import resume from "../assets/Resume.pdf";

function DataOrbit() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const move = (e) => {
    if (reduced || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    ref.current.style.transform = `rotateX(${-(e.clientY - r.top - r.height / 2) / 45}deg) rotateY(${(e.clientX - r.left - r.width / 2) / 45}deg)`;
  };
  return (
    <div
      className="orbit-stage"
      onPointerMove={move}
      onPointerLeave={() => {
        ref.current.style.transform = "";
      }}
    >
      <div className="orbit-content" ref={ref}>
        <div className="orbit-coordinate coordinate-top">
          FIG. 01 — THE POSSIBILITY ENGINE
        </div>
        <svg
          className="orbit-art"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="orbGlow">
              <stop stopColor="#c1ef80" stopOpacity=".17" />
              <stop offset="1" stopColor="#c1ef80" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="orbLine" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ddf8b9" />
              <stop offset=".55" stopColor="#b4c49a" />
              <stop offset="1" stopColor="#766b95" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="300" r="275" fill="url(#orbGlow)" />
          <g className="orbit-outer">
            <ellipse
              cx="300"
              cy="300"
              rx="279"
              ry="100"
              stroke="#7d8274"
              strokeOpacity=".36"
              transform="rotate(-32 300 300)"
            />
            <circle cx="69" cy="452" r="5" fill="#d2f69c" />
            <circle cx="531" cy="148" r="4" fill="#c5b9eb" />
          </g>
          <g
            transform="rotate(-28 300 300)"
            stroke="url(#orbLine)"
            strokeWidth=".8"
            opacity=".8"
          >
            {Array.from({ length: 19 }, (_, i) => (
              <ellipse key={i} cx="300" cy="300" rx={14 + i * 9.7} ry="186" />
            ))}
            {Array.from({ length: 13 }, (_, i) => {
              const y = 128 + i * 28.6;
              const width = Math.sqrt(Math.max(0, 186 ** 2 - (y - 300) ** 2));
              return (
                <ellipse key={i} cx="300" cy={y} rx={width} ry={width * 0.22} />
              );
            })}
          </g>
          <path
            d="M28 300h42m460 0h42M300 28v42m0 460v42"
            stroke="#818777"
            strokeOpacity=".5"
          />
          <circle
            cx="300"
            cy="300"
            r="236"
            stroke="#909981"
            strokeDasharray="2 12"
            strokeOpacity=".22"
          />
        </svg>
        <div className="orbit-chip chip-data">
          <span className="chip-symbol">⌘</span>
          <div>
            Data → decisions<small>CONNECTING THE DOTS</small>
          </div>
          <span className="tiny-dot" />
        </div>
        <div className="code-card">
          <div className="code-card-head">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span>possibilities.py</span>
          </div>
          <code>
            <span className="code-purple">def</span>{" "}
            <span className="code-lime">build_something</span>():
            <br />
            &nbsp; curiosity = <span className="code-lime">True</span>
            <br />
            &nbsp; <span className="code-purple">return</span>{" "}
            ideas.into_impact()
          </code>
          <div className="code-output">
            <span>↳</span> Always learning. Always building.
            <i />
          </div>
        </div>
        <div className="orbit-coordinate coordinate-bottom">
          <span className="tiny-dot" /> SYSTEM: CURIOUS BY DEFAULT{" "}
          <span>23.8°</span>
        </div>
      </div>
    </div>
  );
}
export default function Hero() {
  return (
    <section id="home" className="hero container">
      <div className="hero-copy">
        <Reveal>
          <p className="availability">
            <span className="tiny-dot" /> DATA SCIENCE STUDENT AT IIT MADRAS
          </p>
          <p className="hero-hello">
            Hey, I’m Shiva Yadav <span>✳</span>
          </p>
          <h1>
            Turning data
            <br />
            into <span className="serif-word">meaning.</span>
            <br />
            Ideas into <span className="outline-word">impact.</span>
          </h1>
          <p className="hero-description">
            Data science student at IIT Madras.
            <br />I connect analytical thinking with thoughtful engineering to
            build things that make a difference.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Explore my work <Arrow diagonal />
            </a>
            <a
              href={resume}
              className="button button-quiet"
              download="Shiva-Yadav-Resume.pdf"
            >
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-specialties">
            <span>DATA SCIENCE</span>
            <i />
            <span>MACHINE LEARNING</span>
            <i />
            <span>WEB DEVELOPMENT</span>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-visual" delay={0.15}>
        <DataOrbit />
      </Reveal>
      <div className="hero-bottom">
        <a href="#about">
          <span className="scroll-icon">↓</span> SCROLL TO EXPLORE
        </a>
        <span>
          BASED IN INDIA <span className="lime">↗</span> BUILDING FOR EVERYWHERE
        </span>
      </div>
    </section>
  );
}
