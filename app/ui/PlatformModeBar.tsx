"use client";

import { useTheme } from "../theme/ThemeContext";
import { classicStyle } from "../theme/styles/classicStyle";
import { glassStyle } from "../theme/styles/glassStyle";
import { sphereStyle } from "../theme/styles/sphereStyle";

export type PlatformMode = "zen" | "general" | "speeddial";

export default function PlatformModeBar({
  active,
  onChange,
}: {
  active: PlatformMode;
  onChange: (m: PlatformMode) => void;
}) {
  const { theme } = useTheme();

  const themeEngine =
    theme === "glass"
      ? glassStyle
      : theme === "sphere"
      ? sphereStyle
      : classicStyle;

  const modes: { key: PlatformMode; label: string }[] = [
    { key: "zen", label: "Zen" },
    { key: "general", label: "General" },
    { key: "speeddial", label: "Speed Dial" },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "#020617",
        borderBottom: "1px solid #1f2933",
        padding: "4px 8px",
        gap: 6,
        justifyContent: "center",
      }}
    >
      {modes.map((m) => {
        const activeStyle =
          active === m.key ? themeEngine.tabActive : themeEngine.tabInactive;

        return (
          <button
            key={m.key}
            onClick={() => onChange(m.key)}
            style={{
              border: "none",
              padding: "4px 10px",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 11,
              transition: "all 0.2s ease",
              background: "transparent",
              ...activeStyle,
            }}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
