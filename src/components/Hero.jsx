import React from "react";
import DataLab from "./DataLab";
import { Arrow, Reveal } from "./UI";
import resume from "../assets/Resume.pdf";

export default function Hero() {
  return (
    <section id="home" className="hero container">
      <div className="hero-copy">
        <Reveal eager>
          <p className="availability">
            <span className="tiny-dot" /> DATA SCIENCE STUDENT AT IIT MADRAS
          </p>
          <p className="hero-hello">
            Hey, I’m Shiva Yadav <span>✳</span>
          </p>
          <h1>
            <span className="hero-line">Turning data</span>
            <span className="hero-line">
              into <span className="serif-word">meaning.</span>
            </span>
            <span className="hero-line">
              Ideas into <span className="outline-word">impact.</span>
            </span>
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
      <Reveal className="hero-visual" eager>
        <DataLab />
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
