"use client";

import TasksPlugin from "../ui/plugins/Tasks";
import ComicsPlugin from "../ui/plugins/Comics";
import SocialPlugin from "../ui/plugins/Social";
import Tabs from "../ui/Tabs";

export default function Home() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        background: "#0d1117",
        color: "#e6edf3",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Tabs
        tabs={{
          Today: (
            <div style={{ padding: "12px", color: "#9fb0bf" }}>
              Today view coming soon!
            </div>
          ),
          Tasks: <TasksPlugin />,
          Comics: <ComicsPlugin />,
          Social: <SocialPlugin />
        }}
      />
    </div>
  );
}
