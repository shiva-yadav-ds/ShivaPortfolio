import React from "react";
import { Reveal, SectionTitle } from "./UI";
const journey = [
  [
    "2025 — PRESENT",
    "IIT Madras",
    "BS in Data Science and Applications",
    "Building a foundation in mathematics, statistics, computational thinking, and Python. Connecting theory with practice through hands-on projects.",
    "IN PROGRESS",
  ],
  [
    "COMPLETED 2024",
    "PW Skills",
    "Full Stack Web Development",
    "Learning to build and deploy web applications with React and Node.js, and bring data to life through interactive visualizations.",
    "COURSEWORK",
  ],
  [
    "2022 — 2024",
    "Learning by building",
    "Independent projects & exploration",
    "Exploring predictive modeling, data analysis, and interactive applications with Scikit-learn, Pandas, Streamlit, and Flask.",
    "SELF-DIRECTED",
  ],
];
export default function Experience() {
  return (
    <section id="work" className="section journey-section">
      <div className="container">
        <SectionTitle
          number="04"
          label="THE JOURNEY SO FAR"
          title="Always a student."
          accent="Always moving forward."
        />
        <div className="timeline">
          {journey.map(([date, title, role, description, badge], i) => (
            <Reveal className="timeline-row" key={title} delay={i * 0.08}>
              <div className="timeline-date">
                <span
                  className={i === 0 ? "timeline-dot current" : "timeline-dot"}
                />
                {date}
              </div>
              <div className="timeline-content">
                <div>
                  <h3>{title}</h3>
                  <span className="timeline-badge">{badge}</span>
                </div>
                <h4>{role}</h4>
                <p>{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
