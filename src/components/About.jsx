import React from "react";
import { Reveal, SectionTitle, Spotlight, Arrow } from "./UI";
const capabilities = [
  [
    "01",
    "Uncover the story.",
    "Data analysis",
    "Making sense of complex datasets with Python, Pandas, and a healthy dose of curiosity.",
    "↗",
  ],
  [
    "02",
    "Model the possibilities.",
    "Machine learning",
    "Exploring patterns, testing hypotheses, and turning data into predictive models.",
    "⌘",
  ],
  [
    "03",
    "Bring it to life.",
    "Full-stack development",
    "Building intuitive web experiences that make useful ideas accessible to people.",
    "</>",
  ],
];
export default function About() {
  return (
    <section id="about" className="section container">
      <SectionTitle
        number="01"
        label="A LITTLE ABOUT ME"
        title="Curiosity is the start."
        accent="Building is the next step."
      />
      <div className="about-story">
        <Reveal className="about-marker">
          <span>SY.</span>
          <p>
            ANALYTICAL MIND.
            <br />
            CREATIVE APPROACH.
          </p>
        </Reveal>
        <Reveal className="about-copy">
          <p>
            I’m Shiva, a <em>data science student at IIT Madras</em> and a
            Python developer who enjoys finding clarity in complexity.
          </p>
          <p>
            My work sits at the intersection of data, machine learning, and the
            web. From exploring a dataset to shipping an interactive
            application, I like taking an idea all the way to something people
            can use.
          </p>
          <a className="text-link" href="#work">
            Get to know my journey <Arrow diagonal />
          </a>
        </Reveal>
      </div>
      <div className="capability-grid">
        {capabilities.map(([n, title, tag, desc, icon], i) => (
          <Reveal key={n} delay={i * 0.08}>
            <Spotlight className="capability-card">
              <div className="card-top">
                <span>{n}</span>
                <span className="capability-icon">{icon}</span>
              </div>
              <p className="eyebrow">{tag}</p>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
