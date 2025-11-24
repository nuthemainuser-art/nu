"use client";

import { useState } from "react";
import SubTabBar from "../../ui/SubTabBar";
import type { PlatformMode } from "../../ui/PlatformModeBar";

type ShopTab = "payments" | "store" | "settings";

export default function ShopPanel({ mode }: { mode: PlatformMode }) {
  const [tab, setTab] = useState<ShopTab>("payments");

  const tabs: { key: ShopTab; label: string }[] = [
    { key: "payments", label: "Payments" },
    { key: "store", label: "Store" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div>
      <SubTabBar<ShopTab> tabs={tabs} active={tab} onChange={setTab} />
      <div style={{ marginTop: 12, fontSize: 14, color: "#9fb0bf" }}>
        <div style={{ marginBottom: 6 }}>
          Mode: <strong>{mode}</strong>
        </div>
        {tab === "payments" && <>Payments hub coming soon.</>}
        {tab === "store" && <>Store / digital goods coming soon.</>}
        {tab === "settings" && <>Shop-specific settings coming soon.</>}
      </div>
    </div>
  );
}
