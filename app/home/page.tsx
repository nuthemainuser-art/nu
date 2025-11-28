"use client";

import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";

import PlatformTopBar from "../ui/PlatformTopBar";
import PlatformModeBar from "../ui/PlatformModeBar";
import PlatformAccountBar from "../ui/PlatformAccountBar";
import { PlatformTab } from "../ui/PlatformTopBar";
import { PlatformMode } from "../ui/PlatformModeBar";
import { AccountTab } from "../ui/PlatformAccountBar";

import TodayPanel from "./sections/TodayPanel";
import TasksPanel from "./sections/TasksPanel";
import ComicsPanel from "./sections/ComicsPanel";
import SocialPanel from "./sections/SocialPanel";
import AssistPanel from "./sections/AssistPanel";
import ShopPanel from "./sections/ShopPanel";
import LfPanel from "./sections/LfPanel";
import AccountSettingsPanel from "./sections/AccountSettingsPanel";

import ZenDock from "../ui/zen/ZenDock";
import { classicStyle } from "../theme/styles/classicStyle";
import { glassStyle } from "../theme/styles/glassStyle";
import { sphereStyle } from "../theme/styles/sphereStyle";

export default function Home() {
  const [platformTab, setPlatformTab] = useState<PlatformTab>("home");
	const [mode, setMode] = useState<PlatformMode>("general");
	const [accountTab, setAccountTab] = useState<AccountTab>("today");


  const { theme, setTheme } = useTheme();
const themeEngine =
  theme === "glass"
    ? glassStyle
    : theme === "sphere"
    ? sphereStyle
    : classicStyle;

  const showAccountLayer = platformTab === "home";

  const animateClass =
    theme === "glass" ? "glass-animate" :
    theme === "sphere" ? "sphere-animate" :
    "fade-slide-in";

  const mainBackground =
    mode === "zen"
      ? "radial-gradient(circle at top, #0f172a, #020617)"
      : mode === "speeddial"
      ? "linear-gradient(135deg, #0f172a, #111827)"
      : "linear-gradient(135deg, #020617, #0b1120)";
	const safePanel = { ...themeEngine.panel };
	delete (safePanel as any).background;

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
		<PlatformTopBar active={platformTab} onChange={setPlatformTab} />

		<PlatformModeBar active={mode} onChange={setMode} />

		<PlatformAccountBar active={accountTab} onChange={setAccountTab} />


      {/* THEME BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "8px 12px",
          background: "rgba(15,23,42,0.5)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <button onClick={() => setTheme("classic")}>Classic</button>
        <button onClick={() => setTheme("glass")}>Glass</button>
        <button onClick={() => setTheme("sphere")}>Sphere</button>
      </div>

      {/* MAIN AREA */}
		<div
		  className={`transition-theme ${animateClass}`}
		  style={{
			  
			flex: 1,
			overflowY: "auto",
			padding: 12,

			// IMPORTANT: Only 1 background
			background: mainBackground,
			...safePanel,
			// Theme styling (blur, border, shadow etc.)
			...themeEngine.panel,
		  }}
		>

        {platformTab === "about" && (
          <div className={animateClass}>
            <h2>About Streamforge</h2>
          </div>
        )}

        {platformTab === "settings" && (
          <div className={animateClass}>
            <h2>Platform Settings</h2>
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
          </>
        )}
      </div>
    </div>
  );
}
