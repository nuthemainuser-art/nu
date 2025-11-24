"use client";

import type { PlatformMode } from "../../ui/PlatformModeBar";

export default function LfPanel({ mode }: { mode: PlatformMode }) {
  return (
    <div style={{ fontSize: 14, color: "#9fb0bf" }}>
      LF space at the account level coming soon. Mode: <strong>{mode}</strong>.
    </div>
  );
}
