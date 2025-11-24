"use client";

export type PlatformMode = "zen" | "general" | "speeddial";

export default function PlatformModeBar({
  active,
  onChange,
}: {
  active: PlatformMode;
  onChange: (m: PlatformMode) => void;
}) {
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
      <ModeChip
        label="Zen mode"
        active={active === "zen"}
        onClick={() => onChange("zen")}
      />
      <ModeChip
        label="General mode"
        active={active === "general"}
        onClick={() => onChange("general")}
      />
      <ModeChip
        label="Speed dial"
        active={active === "speeddial"}
        onClick={() => onChange("speeddial")}
      />
    </div>
  );
}

function ModeChip({
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
        background: active ? "#111827" : "#020617",
        color: active ? "#9fe8d6" : "#9fb0bf",
        padding: "4px 10px",
        borderRadius: 999,
        cursor: "pointer",
        fontSize: 11,
      }}
    >
      {label}
    </button>
  );
}
