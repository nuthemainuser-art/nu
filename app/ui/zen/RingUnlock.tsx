// app/ui/zen/RingUnlock.tsx
"use client";

import { useState, useRef } from "react";
import { playClick } from "./playSound";

export default function RingUnlock() {
  const [offset, setOffset] = useState(0);
  const dragging = useRef(false);
  const startY = useRef(0);

  // --------------------
  // Start Drag
  // --------------------
  function onStart(e: React.MouseEvent | React.TouchEvent) {
    dragging.current = true;
    const isTouch = "touches" in e;

    const clientY = isTouch
      ? (e as React.TouchEvent).touches[0].clientY
      : (e as React.MouseEvent).clientY;

    startY.current = clientY;
  }

  // --------------------
  // Move Drag
  // --------------------
  function onMove(e: MouseEvent | TouchEvent) {
    if (!dragging.current) return;

    const isTouch = "touches" in e;
    const clientY = isTouch
      ? (e as TouchEvent).touches[0].clientY
      : (e as MouseEvent).clientY;

    let delta = clientY - startY.current;
    if (delta > 0) delta = 0; // Only upward movement
    if (delta < -40) delta = -40;

    setOffset(delta);
  }

  // --------------------
  // End Drag
  // --------------------
  function onEnd() {
    if (!dragging.current) return;
    dragging.current = false;

    if (offset <= -32) {
      playClick();
    }

    setOffset(0);
  }

  // Attach listeners in browser only
  if (typeof window !== "undefined") {
    window.onmouseup = onEnd;
    window.ontouchend = onEnd;

    window.onmousemove = (e) => onMove(e);
    window.ontouchmove = (e) => onMove(e);
  }

  return (
    <div
      style={{
        width: 120,
        padding: 10,
        background: "#020617",
        borderRadius: 12,
        border: "1px solid rgba(148,163,184,0.5)",
      }}
    >
      <div style={{ fontSize: 11, marginBottom: 6, color: "#9fb0bf" }}>
        Ring
      </div>

      <div
        onMouseDown={onStart}
        onTouchStart={onStart}
        style={{
          width: 60,
          height: 60,
          margin: "0 auto",
          borderRadius: "999px",
          border: "3px solid #9ca3af",
          background: "radial-gradient(circle, #e5e7eb, #9ca3af)",
          transform: `translateY(${offset}px)`,
          transition: dragging.current ? "none" : "transform 0.12s ease-out",
          cursor: "grab",
        }}
      />
    </div>
  );
}
