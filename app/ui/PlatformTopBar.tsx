"use client";

export type PlatformTab = "home" | "about" | "settings";

export default function PlatformTopBar({
  active,
  onChange,
}: {
  active: PlatformTab;
  onChange: (t: PlatformTab) => void;
}) {
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
      <TopChip
        label="About Us"
        active={active === "about"}
        onClick={() => onChange("about")}
      />
      <TopChip
        label="Settings"
        active={active === "settings"}
        onClick={() => onChange("settings")}
      />
      <TopChip
        label="Home"
        active={active === "home"}
        onClick={() => onChange("home")}
      />
    </div>
  );
}

function TopChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: active ? "#1f2937" : "transparent",
        color: active ? "#9fe8d6" : "#9fb0bf",
        padding: "4px 10px",
        borderRadius: 999,
        cursor: "pointer",
        fontSize: 12,
      }}
    >
      {label}
    </button>
  );
}
