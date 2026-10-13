import React from "react";
import { Arrow } from "./UI";
import { profile } from "../constants/profile";
export default function Footer() {
  return (
    <footer className="container site-footer">
      <a className="wordmark" href="#home">
        shiva<span>↗</span>
      </a>
      <p>© {new Date().getFullYear()} Shiva Yadav. Crafted with curiosity.</p>
      <div>
        <a href={profile.instagram} target="_blank" rel="noreferrer">
          Instagram <Arrow diagonal />
        </a>
        {profile.youtube && (
          <a href={profile.youtube} target="_blank" rel="noreferrer">
            YouTube <Arrow diagonal />
          </a>
        )}
        <a href="#home" className="back-top" aria-label="Back to top">
          ↑
        </a>
      </div>
    </footer>
  );
}
