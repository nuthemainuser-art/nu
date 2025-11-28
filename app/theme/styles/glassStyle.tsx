export const glassStyle = {
  panel: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
  },

  tabActive: {
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(10px)",
    color: "#9fe8d6",
    fontWeight: 700,
  },

  tabInactive: {
    background: "transparent",
    color: "rgba(200,220,240,0.65)",
    fontWeight: 500,
  },

  animationKey: "glassFadeSlide",
};
