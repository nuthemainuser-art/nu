"use client";

import { useState } from "react";
import PlatformTopBar, { PlatformTab } from "../ui/PlatformTopBar";
import PlatformModeBar, { PlatformMode } from "../ui/PlatformModeBar";
import PlatformAccountBar, { AccountTab } from "../ui/PlatformAccountBar";

import TodayPanel from "./sections/TodayPanel";
import TasksPanel from "./sections/TasksPanel";
import ComicsPanel from "./sections/ComicsPanel";
import SocialPanel from "./sections/SocialPanel";
import AssistPanel from "./sections/AssistPanel";
import ShopPanel from "./sections/ShopPanel";
import LfPanel from "./sections/LfPanel";
import AccountSettingsPanel from "./sections/AccountSettingsPanel";
import ZenDock from "../ui/zen/ZenDock";

export default function Home() {
  const [platformTab, setPlatformTab] = useState<PlatformTab>("home");
  const [mode, setMode] = useState<PlatformMode>("general");
  const [accountTab, setAccountTab] = useState<AccountTab>("today");

  const showAccountLayer = platformTab === "home";

  // Background reacts softly to mode + account tab (subtle, like "water" mood)
  const mainBackground =
    mode === "zen"
      ? "radial-gradient(circle at top, #0f172a, #020617)"
      : mode === "speeddial"
      ? "linear-gradient(135deg, #0f172a, #111827)"
      : "linear-gradient(135deg, #020617, #0b1120)";

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        background: "#020617",
        color: "#e6edf3",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top platform bar */}
      <PlatformTopBar active={platformTab} onChange={setPlatformTab} />

      {/* Mode bar (now only changes internal mode, no routing) */}
      <PlatformModeBar active={mode} onChange={setMode} />

      {/* Account layer (only in Home platform tab) */}
      {showAccountLayer && (
        <PlatformAccountBar active={accountTab} onChange={setAccountTab} />
      )}

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 12,
          background: mainBackground,
          transition: "background 0.25s ease",
        }}
      >
        {/* PLATFORM-TAB VIEWS */}
        {platformTab === "about" && (
          <div className="fade-slide-in" style={{ padding: 12, color: "#9fb0bf" }}>
            <h2 style={{ marginTop: 0 }}>About Nu / Streamforge</h2>
            <p style={{ fontSize: 14 }}>
              Multi-layer platform: platform modes at the top, account spaces in the
              middle, and modules like Today, Tasks, Comics, Social, Assist, Shop,
              LF, and Settings. Currently read-only; data backends (Sheets, Postgres,
              microservices) will plug in later.
            </p>
          </div>
        )}

        {platformTab === "settings" && (
          <div className="fade-slide-in" style={{ padding: 12, color: "#9fb0bf" }}>
            <h2 style={{ marginTop: 0 }}>Platform Settings</h2>
            <p style={{ fontSize: 14 }}>Platform-level settings coming soon.</p>
          </div>
        )}

        {platformTab === "home" && (
          <div className="fade-slide-in">
            {/* ACCOUNT-TAB VIEWS */}
            {accountTab === "today" && <TodayPanel mode={mode} />}
            {accountTab === "tasks" && <TasksPanel mode={mode} />}
            {accountTab === "comics" && <ComicsPanel mode={mode} />}
            {accountTab === "social" && <SocialPanel mode={mode} />}
            {accountTab === "assist" && <AssistPanel mode={mode} />}
            {accountTab === "shop" && <ShopPanel mode={mode} />}
            {accountTab === "lf" && <LfPanel mode={mode} />}
            {accountTab === "settings" && <AccountSettingsPanel mode={mode} />}

            {/* ZEN DOCK – appears when Zen mode is selected, integrated into UI */}
            {mode === "zen" && (
              <div
                style={{
                  marginTop: 24,
                  padding: 12,
                  borderRadius: 16,
                  background: "rgba(15,23,42,0.7)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <ZenDock />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
