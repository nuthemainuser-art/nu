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

export default function Home() {
  const [platformTab, setPlatformTab] = useState<PlatformTab>("home");
  const [mode, setMode] = useState<PlatformMode>("general");
  const [accountTab, setAccountTab] = useState<AccountTab>("today");

  const showAccountLayer = platformTab === "home";

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        background: "#0d1117",
        color: "#e6edf3",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top platform bar (About, Settings, Home) */}
      <PlatformTopBar
        active={platformTab}
        onChange={setPlatformTab}
      />

      {/* Mode bar (Zen / General / Speed Dial) */}
      <PlatformModeBar
        active={mode}
        onChange={setMode}
      />

      {/* Account bar (Today / Tasks / Comics / Social / Assist / Shop / LF / Settings) */}
      {showAccountLayer && (
        <PlatformAccountBar
          active={accountTab}
          onChange={setAccountTab}
        />
      )}

      {/* Main content area */}
      <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
        {platformTab === "about" && (
          <div style={{ padding: 12, color: "#9fb0bf" }}>
            <h2 style={{ marginTop: 0 }}>About Nu / Streamforge</h2>
            <p style={{ fontSize: 14 }}>
              This is your multi-layer platform: modes at the top, account spaces in
              the middle, and modules like Today, Tasks, Comics, Social, Assist, Shop,
              LF, and Settings. Everything is read-only for now; data backends will
              plug in later (Sheets, Postgres, microservices, etc.).
            </p>
          </div>
        )}

        {platformTab === "settings" && (
          <div style={{ padding: 12, color: "#9fb0bf" }}>
            <h2 style={{ marginTop: 0 }}>Platform Settings</h2>
            <p style={{ fontSize: 14 }}>Platform-level settings coming soon.</p>
          </div>
        )}

        {platformTab === "home" && (
          <>
            {accountTab === "today" && <TodayPanel mode={mode} />}
            {accountTab === "tasks" && <TasksPanel mode={mode} />}
            {accountTab === "comics" && <ComicsPanel mode={mode} />}
            {accountTab === "social" && <SocialPanel mode={mode} />}
            {accountTab === "assist" && <AssistPanel mode={mode} />}
            {accountTab === "shop" && <ShopPanel mode={mode} />}
            {accountTab === "lf" && <LfPanel mode={mode} />}
            {accountTab === "settings" && <AccountSettingsPanel mode={mode} />}
          </>
        )}
      </div>
    </div>
  );
}
