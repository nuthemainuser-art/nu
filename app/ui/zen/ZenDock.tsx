// app/ui/zen/ZenDock.tsx
"use client";

import SliderUnlock from "./SliderUnlock";
import RingUnlock from "./RingUnlock";

export default function ZenDock() {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 13, color: "#9fb0bf", maxWidth: 220 }}>
        <div style={{ marginBottom: 4 }}>Zen fidget dock</div>
        <div>
          Use the slider and ring as micro-interactions while you move between Today,
          Tasks, Comics, Social, etc.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <SliderUnlock />
        <RingUnlock />
      </div>
    </div>
  );
}
