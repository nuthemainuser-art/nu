"use client";

import { useTheme } from "../theme/ThemeContext";
import { classicStyle } from "../theme/styles/classicStyle";
import { glassStyle } from "../theme/styles/glassStyle";
import { sphereStyle } from "../theme/styles/sphereStyle";

export type AccountTab =
  | "today"
  | "tasks"
  | "comics"
  | "social"
  | "assist"
  | "shop"
  | "lf"
  | "settings";

export default function PlatformAccountBar({
  active,
  onChange,
}: {
  active: AccountTab;
  onChange: (t: AccountTab) => void;
}) {
  const { theme } = useTheme();

  const themeEngine =
    theme === "glass"
      ? glassStyle
      : theme === "sphere"
      ? sphereStyle
      : classicStyle;

  const tabs: { key: AccountTab; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "tasks", label: "Tasks" },
    { key: "comics", label: "Comics" },
    { key: "social", label: "Social" },
    { key: "assist", label: "Assist" },
    { key: "shop", label: "Shop" },
    { key: "lf", label: "LF" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "#161b22",
        borderBottom: "1px solid #2d333b",
      }}
    >
      {tabs.map((t) => {
        const activeStyle = active === t.key ? themeEngine.tabActive : themeEngine.tabInactive;

        return (
          <div
            key={t.key}
            onClick={() => onChange(t.key)}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 0",
              cursor: "pointer",
              transition: "all 0.2s ease",
              ...activeStyle,
            }}
          >
            {t.label}
          </div>
        );
      })}
    </div>
  );
}
