"use client";
import { useState } from "react";

export default function Tabs({ tabs }: { tabs: any }) {
  const [active, setActive] = useState(Object.keys(tabs)[0]);

  return (
    <>
      <div style={{
        display: "flex",
        background: "#161b22",
        borderBottom: "1px solid #2d333b"
      }}>
        {Object.keys(tabs).map(key => (
          <div
            key={key}
            onClick={() => setActive(key)}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "10px 0",
              cursor: "pointer",
              color: active === key ? "#9fe8d6" : "#9fb0bf",
              background: active === key ? "#1f2937" : "transparent",
              fontWeight: 600
            }}
          >
            {key}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {tabs[active]}
      </div>
    </>
  );
}
