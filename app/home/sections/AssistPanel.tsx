"use client";

import type { PlatformMode } from "../../ui/PlatformModeBar";

export default function AssistPanel({ mode }: { mode: PlatformMode }) {
  return (
    <div style={{ fontSize: 14, color: "#9fb0bf" }}>
      Assist module (similar to Tasks) coming soon. Mode: <strong>{mode}</strong>.
    </div>
  );
}
