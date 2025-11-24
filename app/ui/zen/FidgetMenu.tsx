"use client";

export default function FidgetMenu({
  onSelect,
}: {
  onSelect: (v: "slider" | "ring") => void;
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <h2 className="text-2xl font-bold text-[#9fe8d6]">
        Zen Fidget Tools
      </h2>

      <button
        onClick={() => onSelect("slider")}
        className="w-64 py-3 bg-[#1f2937] rounded-xl text-white hover:scale-105 transition-all"
      >
        🟥 Rectangular Slider
      </button>

      <button
        onClick={() => onSelect("ring")}
        className="w-64 py-3 bg-[#1f2937] rounded-xl text-white hover:scale-105 transition-all"
      >
        ⭕ Ring Unlock
      </button>
    </div>
  );
}
