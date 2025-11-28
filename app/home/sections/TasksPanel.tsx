"use client";

import type { PlatformMode } from "../../ui/PlatformModeBar";
import TasksPlugin from "../../ui/plugins/Tasks";

export default function TasksPanel({ mode }: { mode: PlatformMode }) {
  return (
    <div>
      <div  className="sphere-animate transition-theme" style={{ marginBottom: 8, fontSize: 13, color: "#9fb0bf" }}>
        Account-level Tasks (read-only). Mode: <strong>{mode}</strong>.
        Later this will plug into Tasks microservices / Sheets.
      </div>
      <TasksPlugin />
    </div>
  );
}