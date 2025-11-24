"use client";

import type { PlatformMode } from "../../ui/PlatformModeBar";

export default function AccountSettingsPanel({ mode }: { mode: PlatformMode }) {
  return (
    <div style={{ fontSize: 14, color: "#9fb0bf" }}>
      Account-level settings coming soon. Mode: <strong>{mode}</strong>.
    </div>
  );
}
