"use client";

export default function SubTabBar<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: T; label: string }[];
  active: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        background: "#020617",
        padding: "4px 4px 6px",
        borderRadius: 999,
        width: "fit-content",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            border: "none",
            background: active === t.key ? "#1f2937" : "transparent",
            color: active === t.key ? "#9fe8d6" : "#9fb0bf",
            padding: "4px 10px",
            borderRadius: 999,
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
