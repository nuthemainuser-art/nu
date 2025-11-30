"use client";

import { useState } from "react";

export default function Dashboard() {
  const [sheetId, setSheetId] = useState("");
  const [rows, setRows] = useState([]);

  const createSheet = async () => {
    const res = await fetch("/api/google/sheet/create", { method: "POST" });
    const j = await res.json();
    setSheetId(j.sheetId);
  };

  const insert = async () => {
    await fetch("/api/google/sheet/insert", {
      method: "POST",
      body: JSON.stringify({ sheetId, value: "Hello world" }),
    });
  };

  const list = async () => {
    const res = await fetch(`/api/google/sheet/list?sheetId=${sheetId}`);
    const j = await res.json();
    setRows(j.rows);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Google Sheet Manager</h1>

      <button onClick={createSheet}>Create Sheet</button>
      <button disabled={!sheetId} onClick={insert}>Insert Row</button>
      <button disabled={!sheetId} onClick={list}>List Rows</button>

      <p>Sheet ID: {sheetId}</p>

      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );
}
