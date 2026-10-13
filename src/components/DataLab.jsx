import React, { useEffect, useRef, useState } from "react";
import { useMotionPreference as useReducedMotion } from "../hooks/useMotionPreference";

const modes = [
  {
    name: "Data",
    verb: "Explore.",
    caption: "Every observation is a place to begin.",
    code: "signals = explore(data)",
    color: "#cff798",
  },
  {
    name: "Connections",
    verb: "Connect.",
    caption: "Find the relationships beneath the surface.",
    code: "patterns = connect(signals)",
    color: "#c9bee8",
  },
  {
    name: "Possibilities",
    verb: "Create.",
    caption: "Give an idea a shape people can use.",
    code: "product = build(patterns)",
    color: "#e8c99a",
  },
];
// Deterministic geometry: this is an illustrative sketch, not a live dataset.
function createShapes(count) {
  const ringSize = count / 6;
  return [0, 1, 2].map((mode) =>
    Array.from({ length: count }, (_, i) => {
      const a = i * Math.PI * (3 - Math.sqrt(5));
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      if (mode === 0)
        return {
          x: Math.cos(a) * r * 162,
          y: y * 162,
          z: Math.sin(a) * r * 162,
        };
      if (mode === 1) {
        const layer = Math.floor(i / ringSize),
          angle = ((i % ringSize) / ringSize) * Math.PI * 2;
        return {
          x: (layer - 2.5) * 57,
          y: Math.cos(angle) * 100,
          z: Math.sin(angle) * 100,
        };
      }
      const u = ((i % ringSize) / ringSize) * Math.PI * 2,
        v = (Math.floor(i / ringSize) / 6) * Math.PI * 2;
      return {
        x: (119 + 48 * Math.cos(v)) * Math.cos(u),
        y: (119 + 48 * Math.cos(v)) * Math.sin(u),
        z: 48 * Math.sin(v),
      };
    }),
  );
}
const fullShapes = createShapes(192);
const compactShapes = createShapes(96);

function ParticleCanvas({ mode, paused }) {
  const canvasRef = useRef(null);
  const modeRef = useRef(mode);
  const pausedRef = useRef(paused);
  const reduced = useReducedMotion();
  const redraw = useRef(() => {});
  useEffect(() => {
    modeRef.current = mode;
    redraw.current();
  }, [mode]);
  useEffect(() => {
    pausedRef.current = paused;
    redraw.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current,
      context = canvas.getContext("2d");
    if (!context) return;
    const compact =
      window.matchMedia("(pointer: coarse), (max-width: 600px)").matches ||
      (navigator.hardwareConcurrency || 8) <= 4;
    const shapes = compact ? compactShapes : fullShapes;
    const count = shapes[0].length;
    const ringSize = count / 6;
    const frameInterval = 1000 / (compact ? 30 : 45);
    let frame = 0,
      width = 1,
      height = 1,
      visible = false,
      previous = 0,
      rotation = 0.38;
    const pointer = { x: 0, y: 0 },
      smoothPointer = { x: 0, y: 0 };
    const points = shapes[modeRef.current].map((p) => ({ ...p }));
    const projected = points.map((_, i) => ({
      x: 0,
      y: 0,
      depth: 0,
      perspective: 1,
      i,
    }));
    const drawOrder = projected.slice();
    const draw = (time) => {
      frame = 0;
      const staticFrame = reduced || pausedRef.current;
      if (!staticFrame && previous && time - previous < frameInterval - 1) {
        if (visible && !document.hidden) frame = requestAnimationFrame(draw);
        return;
      }
      const delta = previous ? Math.min(time - previous, 40) : 16;
      previous = time;
      if (!staticFrame) rotation += delta * 0.00009;
      const blend = staticFrame ? 1 : 1 - Math.exp(-delta * 0.005);
      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.045;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.045;
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) / 450;
      const angle = rotation + (staticFrame ? 0 : smoothPointer.x * 0.25);
      const tilt = -0.28 + (staticFrame ? 0 : smoothPointer.y * 0.2);
      const cosAngle = Math.cos(angle),
        sinAngle = Math.sin(angle),
        cosTilt = Math.cos(tilt),
        sinTilt = Math.sin(tilt);
      points.forEach((p, i) => {
        const target = shapes[modeRef.current][i];
        p.x += (target.x - p.x) * blend;
        p.y += (target.y - p.y) * blend;
        p.z += (target.z - p.z) * blend;
        const x = p.x * cosAngle - p.z * sinAngle;
        const z = p.x * sinAngle + p.z * cosAngle;
        const y = p.y * cosTilt - z * sinTilt;
        const depth = p.y * sinTilt + z * cosTilt;
        const perspective = 600 / (600 + depth);
        const point = projected[i];
        point.x = width / 2 + x * scale * perspective;
        point.y = height / 2 + y * scale * perspective;
        point.depth = depth;
        point.perspective = perspective;
      });
      const color = modes[modeRef.current].color;
      context.strokeStyle = color;
      if (modeRef.current !== 0) {
        projected.forEach((p, i) => {
          const neighbors =
            modeRef.current === 1
              ? [i + 1, i + ringSize]
              : [
                  Math.floor(i / ringSize) * ringSize + ((i + 1) % ringSize),
                  (i + ringSize) % count,
                ];
          neighbors.forEach((n) => {
            if (n >= count) return;
            const q = projected[n];
            context.globalAlpha = Math.max(
              0.045,
              0.19 - (p.depth + q.depth) / 2400,
            );
            context.lineWidth = 0.6;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.stroke();
          });
        });
      }
      drawOrder
        .sort((a, b) => b.depth - a.depth)
        .forEach((p) => {
          const alpha = Math.max(0.2, Math.min(1, 0.64 - p.depth / 460));
          context.globalAlpha = alpha;
          context.fillStyle = p.i % 13 === 0 ? "#f2eee0" : color;
          context.beginPath();
          context.arc(
            p.x,
            p.y,
            Math.max(0.9, (p.i % 11 === 0 ? 2.6 : 1.5) * scale * p.perspective),
            0,
            Math.PI * 2,
          );
          context.fill();
          if (p.i % 19 === 0) {
            context.globalAlpha = alpha * 0.12;
            context.beginPath();
            context.arc(p.x, p.y, 7 * scale * p.perspective, 0, Math.PI * 2);
            context.fill();
          }
        });
      context.globalAlpha = 1;
      if (!staticFrame && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const requestDraw = () => {
      if (!frame && visible && !document.hidden) {
        previous = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    redraw.current = requestDraw;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      requestDraw();
    };
    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width - 0.5;
      pointer.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const reset = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestDraw();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestDraw();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      redraw.current = () => {};
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [reduced]);
  return <canvas ref={canvasRef} className="lab-canvas" aria-hidden="true" />;
}

export default function DataLab() {
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  return (
    <div
      className="data-lab"
      data-paused={paused || reduced}
      style={{ "--lab-color": modes[mode].color }}
    >
      <div className="lab-topline">
        <span>
          <i /> THE CURIOSITY LAB
        </span>
        <span>INTERACTIVE / 001</span>
      </div>
      <div className="lab-stage">
        <div className="lab-grid" aria-hidden="true" />
        <div className="lab-orbit-ring" aria-hidden="true" />
        <span className="lab-axis axis-x" aria-hidden="true">
          X
        </span>
        <span className="lab-axis axis-y" aria-hidden="true">
          Y
        </span>
        <ParticleCanvas mode={mode} paused={paused} />
        <div className="lab-word" aria-hidden="true" key={mode}>
          {modes[mode].verb}
        </div>
        <div className="lab-annotation">
          <span className="tiny-dot" />{" "}
          {mode === 0
            ? "A world of observations"
            : mode === 1
              ? "Patterns in the complexity"
              : "An idea, taking shape"}
        </div>
        <div className="lab-code" aria-hidden="true">
          <span>↳</span> {modes[mode].code}
          <i />
        </div>
        {!reduced && (
          <button
            className="lab-pause"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play visualization" : "Pause visualization"}
            aria-pressed={paused}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        )}
      </div>
      <div
        className="lab-controls"
        role="group"
        aria-label="Explore the visualization"
      >
        {modes.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setMode(index)}
            aria-pressed={mode === index}
            aria-controls="lab-description"
          >
            <span>0{index + 1}</span>
            {item.name}
            <span aria-hidden="true">{mode === index ? "↗" : "·"}</span>
          </button>
        ))}
      </div>
      <p id="lab-description" className="lab-description" aria-live="polite">
        {modes[mode].caption}
      </p>
      <p className="lab-hint">
        An interactive sketch of how I think. Try a different view ↑
      </p>
    </div>
  );
}
