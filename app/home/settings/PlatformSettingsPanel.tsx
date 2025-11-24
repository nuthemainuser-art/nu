"use client";

import { useTheme } from "../../ui/theme/ThemeProvider";
import { useState } from "react";

export default function PlatformSettingsPanel() {
  const { theme, setTheme } = useTheme();
  const [zenWidget, setZenWidget] = useState("both");

  return (
    <div className="text-[#9fb0bf] space-y-4">
      <h2 className="text-xl font-bold text-[#9fe8d6]">
        Platform Settings
      </h2>

      <div>
        <h3 className="font-semibold">Theme</h3>
        <select
          className="bg-[#1f2937] text-white px-3 py-2 rounded-xl"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="dark">Dark</option>
          <option value="amoled">AMOLED</option>
          <option value="light">Light</option>
          <option value="neon">Neon</option>
          <option value="cyberpunk">Cyberpunk</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold">Zen Mode Widget</h3>
        <select
          className="bg-[#1f2937] text-white px-3 py-2 rounded-xl"
          value={zenWidget}
          onChange={(e) => setZenWidget(e.target.value)}
        >
          <option value="slider">Slider Only</option>
          <option value="ring">Ring Only</option>
          <option value="both">Both</option>
        </select>
      </div>
    </div>
  );
}
