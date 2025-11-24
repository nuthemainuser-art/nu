"use client";

import { useState } from "react";
import SubTabBar from "../../ui/SubTabBar";
import ComicsPlugin from "../../ui/plugins/Comics";
import type { PlatformMode } from "../../ui/PlatformModeBar";

type ComicsTab = "comic" | "storytelling" | "digest" | "issue";

export default function ComicsPanel({ mode }: { mode: PlatformMode }) {
  const [tab, setTab] = useState<ComicsTab>("comic");

  const tabs: { key: ComicsTab; label: string }[] = [
    { key: "comic", label: "Comic" },
    { key: "storytelling", label: "Storytelling" },
    { key: "digest", label: "Digest" },
    { key: "issue", label: "Issue" },
  ];

  return (
    <div>
      <SubTabBar<ComicsTab> tabs={tabs} active={tab} onChange={setTab} />
      <div style={{ marginTop: 12, fontSize: 14, color: "#9fb0bf" }}>
        <div style={{ marginBottom: 6 }}>
          Mode: <strong>{mode}</strong>
        </div>
        {tab === "comic" && <>Single-strip comics coming soon.</>}
        {tab === "storytelling" && <>Storytelling arcs coming soon.</>}
        {tab === "digest" && <>Digest of multiple comics coming soon.</>}
        {tab === "issue" && <>Issue-level compilation coming soon.</>}
      </div>
      <div style={{ marginTop: 16 }}>
        <ComicsPlugin />
      </div>
    </div>
  );
}
