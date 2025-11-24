"use client";

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
      {tabs.map((t) => (
        <div
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "8px 0",
            cursor: "pointer",
            color: active === t.key ? "#9fe8d6" : "#9fb0bf",
            background: active === t.key ? "#1f2937" : "transparent",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}
