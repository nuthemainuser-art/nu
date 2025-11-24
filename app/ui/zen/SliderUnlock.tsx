// app/ui/zen/SliderUnlock.tsx
"use client";

import { useState, useRef } from "react";
import { playClick } from "./playSound";

export default function SliderUnlock() {
  const [pos, setPos] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  function onStart(e: React.MouseEvent | React.TouchEvent) {
    dragging.current = true;

    const isTouch = "touches" in e;
    const clientX = isTouch
      ? (e as React.TouchEvent).touches[0].clientX
      : (e as React.MouseEvent).clientX;

    startX.current = clientX;
  }

  function onMove(e: MouseEvent | TouchEvent) {
    if (!dragging.current || !sliderRef.current) return;

    const isTouch = "touches" in e;
    const clientX = isTouch
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;

    const max = sliderRef.current.clientWidth - 52;
    let delta = clientX - startX.current;

    if (delta < 0) delta = 0;
    if (delta > max) delta = max;

    setPos(delta);
  }

  function onEnd() {
    if (!dragging.current) return;
    dragging.current = false;

    const threshold = (sliderRef.current?.clientWidth ?? 0) - 80;

    if (pos >= threshold) {
      playClick();
    }

    setPos(4);
    setTimeout(() => setPos(0), 60);
  }

  if (typeof window !== "undefined") {
    window.onmouseup = onEnd;
    window.ontouchend = onEnd;

    window.onmousemove = (e) => onMove(e);
    window.ontouchmove = (e) => onMove(e);
  }

  return (
    <div
      style={{
        width: 220,
        padding: 10,
        background: "#020617",
        borderRadius: 12,
        border: "1px solid rgba(148,163,184,0.5)",
      }}
    >
      <div style={{ fontSize: 11, marginBottom: 6, color: "#9fb0bf" }}>
        Slider
      </div>

      <div
        ref={sliderRef}
        style={{
          width: "100%",
          height: 40,
          background: "rgba(15,23,42,0.9)",
          borderRadius: 20,
          position: "relative",
        }}
      >
        <div
          onMouseDown={onStart}
          onTouchStart={onStart}
          style={{
            position: "absolute",
            width: 32,
            height: 32,
            borderRadius: "999px",
            background: "linear-gradient(#e5e7eb, #9ca3af)",
            top: 4,
            left: pos + 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111827",
            fontSize: 14,
            fontWeight: 700,
            cursor: "grab",
            transition: dragging.current ? "none" : "left 0.12s ease-out",
            boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
          }}
        >
          ➤
        </div>
      </div>
    </div>
  );
}
