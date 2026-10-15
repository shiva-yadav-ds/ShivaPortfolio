import React, { useState } from "react";
import { Reveal, Arrow, Spotlight } from "./UI";
import { profile } from "../constants/profile";
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Email copied!");
    } catch {
      setCopyStatus(
        "Select the email above to copy it, or click it to write to me.",
      );
    }
  }
  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status !== "sending") setStatus("idle");
  };
  async function submit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        "service_jpcmyr8",
        "template_gkelals",
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          to_name: "Shiva Yadav",
          to_email: profile.email,
          message: form.message.trim(),
        },
        "Y7GaFJP8CSRwkPWcI",
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      // EmailJS returns 412 when its connected mail provider needs to be
      // re-authorized. Keep the message intact for the email-app fallback.
      setStatus(error?.status === 412 ? "service-error" : "error");
    }
  }
  const fallbackEmail = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio message from ${form.name.trim() || "a visitor"}`,
  )}&body=${encodeURIComponent(
    `${form.message.trim()}\n\nFrom: ${form.name.trim()}\nEmail: ${form.email.trim()}`,
  )}`;
  return (
    <section id="contact" className="section container contact-section">
      <Reveal className="contact-copy">
        <p className="eyebrow">
          <span>05 /</span> WHAT’S NEXT?
        </p>
        <h2>
          Good things start
          <br />
          with a <span className="serif-word">conversation.</span>
        </h2>
        <p>
          Have an interesting problem, an opportunity, or an idea to explore?
          I’d love to hear about it.
        </p>
        <a className="email-link" href={`mailto:${profile.email}`}>
          {profile.email}
          <Arrow diagonal />
        </a>
        <div className="copy-email-row">
          <button type="button" className="copy-email" onClick={copyEmail}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 8V4H4v12h4" />
            </svg>
            Copy email
          </button>
          <span aria-live="polite">{copyStatus}</span>
        </div>
        <div className="contact-socials">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <Arrow diagonal />
          </a>
        </div>
        <div className="contact-note">
          <span className="tiny-dot" /> Let’s make something meaningful.
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <Spotlight className="contact-card">
          <form onSubmit={submit}>
            <div className="form-heading">
              <h3>Say hello.</h3>
              <span>↗</span>
            </div>
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={update}
                placeholder="How should I call you?"
                maxLength={100}
                required
                pattern=".*\S.*"
                disabled={status === "sending"}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                maxLength={254}
                required
                disabled={status === "sending"}
              />
            </label>
            <label>
              What’s on your mind?
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                placeholder="Tell me a little about your idea…"
                rows={4}
                minLength={10}
                maxLength={5000}
                required
                disabled={status === "sending"}
              />
            </label>
            <button
              className="button button-primary"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <Arrow diagonal />
            </button>
            <div
              className={`form-status ${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" ? (
                "Thanks for reaching out! Your message has been sent."
              ) : status === "service-error" || status === "error" ? (
                <div className="form-fallback">
                  <span>
                    The online form is temporarily unavailable. Your message is
                    still here.
                  </span>
                  <a className="fallback-link" href={fallbackEmail}>
                    Open it in your email app <Arrow diagonal />
                  </a>
                </div>
              ) : (
                "Your message goes straight to my inbox."
              )}
            </div>
          </form>
        </Spotlight>
      </Reveal>
    </section>
  );
}
