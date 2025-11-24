// app/home/zen/page.tsx
import SliderUnlock from "@/app/ui/zen/SliderUnlock";
import RingUnlock from "@/app/ui/zen/RingUnlock";

export default function ZenPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
        color: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Zen Fidget Tools</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <SliderUnlock />
        <RingUnlock />
      </div>
    </div>
  );
}
