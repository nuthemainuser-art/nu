"use client";

import { useTheme } from "../theme/ThemeContext";
import { classicStyle } from "../theme/styles/classicStyle";
import { glassStyle } from "../theme/styles/glassStyle";
import { sphereStyle } from "../theme/styles/sphereStyle";

export type PlatformTab = "home" | "about" | "settings";

export default function PlatformTopBar({
  active,
  onChange,
}: {
  active: PlatformTab;
  onChange: (t: PlatformTab) => void;
}) {
  const { theme } = useTheme();

  const themeEngine =
    theme === "glass"
      ? glassStyle
      : theme === "sphere"
      ? sphereStyle
      : classicStyle;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#020617",
        borderBottom: "1px solid #111827",
        padding: "6px 12px",
        gap: 12,
      }}
    >
      <div style={{ fontWeight: 700, color: "#9fe8d6" }}>Nu / Streamforge</div>
      <div style={{ flex: 1 }} />

      {(["about", "settings", "home"] as PlatformTab[]).map((tab) => {
        const isActive = active === tab;

        // theme-aware tab styles
        const themedStyle = isActive
          ? themeEngine.tabActive ?? {}
          : themeEngine.tabInactive ?? {};

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              border: "none",
              padding: "4px 10px",
              borderRadius: 999,
              cursor: "pointer",

              /* Spread theme styles safely */
              ...themedStyle,

              /* SAFE fallbacks — bracket notation avoids TS errors */
              background:
                themedStyle["background"] ??
                (isActive ? "#1f2937" : "transparent"),

              color:
                themedStyle["color"] ??
                (isActive ? "#9fe8d6" : "#9fb0bf"),

              transition: "all 0.2s ease",
            }}
          >
            {tab === "about"
              ? "About Us"
              : tab === "settings"
              ? "Settings"
              : "Home"}
          </button>
        );
      })}
    </div>
  );
}
