import React from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import Tech from "./components/Tech";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Cursor } from "./components/UI";
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
      aria-hidden="true"
    />
  );
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <div className="discipline-strip" aria-hidden="true">
          <div>
            <span>CURIOUS BY NATURE</span>
            <i>✳</i>
            <span>DRIVEN BY DATA</span>
            <i>✳</i>
            <span>BUILT WITH PURPOSE</span>
            <i>✳</i>
            <span>ALWAYS EXPLORING</span>
            <i>✳</i>
          </div>
        </div>
        <About />
        <Works />
        <Tech />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
