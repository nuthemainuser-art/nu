"use client";

import { useState } from "react";
import SubTabBar from "../../ui/SubTabBar";
import type { PlatformMode } from "../../ui/PlatformModeBar";

type TodayTab =
  | "reports"
  | "council"
  | "daily"
  | "weekly"
  | "sprintly"
  | "monthly"
  | "quarterly";

export default function TodayPanel({ mode }: { mode: PlatformMode }) {
  const [tab, setTab] = useState<TodayTab>("daily");

  const tabs: { key: TodayTab; label: string }[] = [
    { key: "reports", label: "Reports" },
    { key: "council", label: "Council of A" },
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "sprintly", label: "Sprintly" },
    { key: "monthly", label: "Monthly" },
    { key: "quarterly", label: "Quarterly" },
  ];

  return (
    <div>
      <SubTabBar<TodayTab> tabs={tabs} active={tab} onChange={setTab} />
      <div style={{ marginTop: 12, fontSize: 14, color: "#9fb0bf" }}>
        <div style={{ marginBottom: 6 }}>
          Mode: <strong>{mode}</strong>
        </div>
        {tab === "reports" && <>Reports view coming soon.</>}
        {tab === "council" && <>Council of A coming soon.</>}
        {tab === "daily" && <>Daily schedule / habits coming soon.</>}
        {tab === "weekly" && <>Weekly planning coming soon.</>}
        {tab === "sprintly" && <>Sprint-level planning coming soon.</>}
        {tab === "monthly" && <>Monthly retrospectives coming soon.</>}
        {tab === "quarterly" && <>Quarterly strategy coming soon.</>}
      </div>
    </div>
  );
}
