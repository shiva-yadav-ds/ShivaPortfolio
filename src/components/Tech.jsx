import React from "react";
import { Reveal, SectionTitle, Spotlight } from "./UI";
const groups = [
  {
    icon: "{ }",
    title: "Data & intelligence",
    caption: "From raw data to a clearer picture.",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Statistics"],
  },
  {
    icon: "</>",
    title: "Web & experiences",
    caption: "Making ideas useful and interactive.",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "HTML & CSS",
      "Tailwind CSS",
      "Node.js",
    ],
  },
  {
    icon: "⌘",
    title: "Tools & workflow",
    caption: "The toolkit behind the process.",
    skills: [
      "Git & GitHub",
      "MongoDB",
      "Docker",
      "Figma",
      "Streamlit",
      "Flask",
    ],
  },
];
export default function Tech() {
  return (
    <section id="expertise" className="section container">
      <SectionTitle
        number="03"
        label="MY TOOLKIT"
        title="The right tools."
        accent="An open mind."
      >
        A growing toolkit for asking better questions, building better systems,
        and learning along the way.
      </SectionTitle>
      <div className="toolkit-grid">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <Spotlight className="toolkit-card">
              <span className="toolkit-icon">{group.icon}</span>
              <h3>{group.title}</h3>
              <p>{group.caption}</p>
              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span key={skill}>
                    <i />
                    {skill}
                  </span>
                ))}
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
