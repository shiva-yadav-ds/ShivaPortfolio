import React, { useState } from "react";
import { Reveal, SectionTitle, Arrow, Spotlight } from "./UI";
import scholar from "../assets/projects/scholar-hub-960.webp";
import scholarSmall from "../assets/projects/scholar-hub-480.webp";
import scholarLarge from "../assets/projects/scholar-hub-1440.webp";
import clinical from "../assets/projects/clinical-suite-960.webp";
import clinicalSmall from "../assets/projects/clinical-suite-480.webp";
import clinicalLarge from "../assets/projects/clinical-suite-1440.webp";
import { profile } from "../constants/profile";
const projects = [
  {
    number: "01",
    title: "IITM Scholar Hub",
    type: "STUDENT TOOLS / WEB APPLICATION",
    description:
      "Less searching. More doing. A student toolkit that brings grade calculations, end-term predictions, and study resources into one thoughtful experience.",
    tags: ["React", "TypeScript", "Student experience"],
    image: scholar,
    imageSet: `${scholarSmall} 480w, ${scholar} 960w, ${scholarLarge} 1440w`,
    width: 1851,
    height: 966,
    url: "https://iitm-scholar-hub.vercel.app/",
    source: profile.github,
    sourceLabel: "GitHub profile",
    color: "scholar",
    note: "Built for the IITM community",
    details:
      "Designed around a student’s next step: estimate end-term marks, calculate grades and CGPA, and find learning resources from a single responsive interface. This project’s source repository is private.",
  },
  {
    number: "02",
    title: "AI Clinical Suite",
    type: "MACHINE LEARNING / HEALTH TECH",
    description:
      "Exploring how machine learning can make complex health data easier to understand, with an interactive interface for disease prediction and assessment.",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    image: clinical,
    imageSet: `${clinicalSmall} 480w, ${clinical} 960w, ${clinicalLarge} 1354w`,
    width: 1354,
    height: 876,
    url: "https://clinical-ai-diagnostic-suite.streamlit.app/",
    source: "https://github.com/shiva-yadav-ds/Prediction-of-Disease-Outbreaks",
    sourceLabel: "Source code",
    color: "clinical",
    note: "From data to an interactive application",
    details:
      "An educational machine learning project using Random Forest and SVM classifiers, with preprocessing and scaling through Pandas and Scikit-learn. Built to explore predictive modeling; it is not a medical diagnostic tool.",
  },
];
function Project({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Reveal delay={index * 0.1}>
      <Spotlight className={`project-card project-showcase ${project.color}`}>
        <a
          className="project-visual"
          data-cursor="EXPLORE"
          data-project-number={`0${index + 1}`}
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${project.title}`}
        >
          <div className="project-art-label">
            <span>{project.note}</span>
            <span>↗</span>
          </div>
          <div className="browser-frame">
            <div className="browser-chrome">
              <span>
                <i />
                <i />
                <i />
              </span>
              <span>{new URL(project.url).hostname}</span>
              <span>↗</span>
            </div>
            <img
              src={project.image}
              srcSet={project.imageSet}
              sizes="(max-width: 600px) 90vw, (max-width: 1400px) 50vw, 680px"
              decoding="async"
              alt={`${project.title} application preview`}
              loading="lazy"
              width={project.width}
              height={project.height}
            />
          </div>
          <span className="preview-hint">
            Explore live project <Arrow diagonal />
          </span>
        </a>
        <div className="project-body">
          <span className="project-kicker">
            {index === 0
              ? "BUILT FOR STUDENTS, BY A STUDENT"
              : "AN EXPLORATION IN APPLIED MACHINE LEARNING"}
          </span>
          <p className="eyebrow">
            <span>{project.number} /</span> {project.type}
          </p>
          <h3>
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.title}
              <Arrow diagonal />
            </a>
          </h3>
          <p className="project-description">{project.description}</p>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-links">
            <a href={project.url} target="_blank" rel="noreferrer">
              Live project <Arrow diagonal />
            </a>
            <a href={project.source} target="_blank" rel="noreferrer">
              {project.sourceLabel} <Arrow diagonal />
            </a>
            <button
              aria-expanded={expanded}
              aria-controls={`project-details-${index}`}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Less" : "Details"}{" "}
              <span>{expanded ? "−" : "+"}</span>
            </button>
          </div>
          {expanded && (
            <p className="project-details" id={`project-details-${index}`}>
              {project.details}
            </p>
          )}
        </div>
      </Spotlight>
    </Reveal>
  );
}
export default function Works() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionTitle
          number="02"
          label="SELECTED WORK"
          title="Ideas, put"
          accent="into practice."
        >
          A selection of things I’ve built while exploring the space between
          data and real-world problems.
        </SectionTitle>
        <div className="projects-grid project-showcases">
          {projects.map((project, index) => (
            <Project key={project.title} project={project} index={index} />
          ))}
        </div>
        <Reveal className="projects-footnote">
          <span>Each project is another question explored.</span>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub <Arrow diagonal />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
