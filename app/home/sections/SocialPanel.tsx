"use client";

import { useState } from "react";
import SubTabBar from "../../ui/SubTabBar";
import SocialPlugin from "../../ui/plugins/Social";
import type { PlatformMode } from "../../ui/PlatformModeBar";

type SocialTab = "community" | "accountability" | "games" | "payments";

export default function SocialPanel({ mode }: { mode: PlatformMode }) {
  const [tab, setTab] = useState<SocialTab>("community");

  const tabs: { key: SocialTab; label: string }[] = [
    { key: "community", label: "Community" },
    { key: "accountability", label: "Accountability" },
    { key: "games", label: "Games" },
    { key: "payments", label: "Payments" },
  ];

  return (
    <div>
      <SubTabBar<SocialTab> tabs={tabs} active={tab} onChange={setTab} />
      <div style={{ marginTop: 12, fontSize: 14, color: "#9fb0bf" }}>
        <div style={{ marginBottom: 6 }}>
          Mode: <strong>{mode}</strong>
        </div>
        {tab === "community" && (
          <>
            <div>Community streams coming soon.</div>
            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
              <li>Substack</li>
              <li>Reddit</li>
              <li>Reels</li>
              <li>Shorts</li>
              <li>Comics</li>
            </ul>
          </>
        )}
        {tab === "accountability" && <>Accountability circles coming soon.</>}
        {tab === "games" && (
          <>
            Games hub coming soon.
            <div style={{ marginTop: 6 }}>First game: Mau.</div>
          </>
        )}
        {tab === "payments" && <>Social payments & tipping coming soon.</>}
      </div>
      <div style={{ marginTop: 16 }}>
        <SocialPlugin />
      </div>
    </div>
  );
}
