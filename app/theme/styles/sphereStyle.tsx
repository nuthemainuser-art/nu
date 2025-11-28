export const sphereStyle = {
  panel: {
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 0 40px rgba(30,60,120,0.35)",
    transform: "perspective(900px) rotateX(8deg)",
    transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
  },

  tabActive: {
    color: "#9fe8d6",
    fontWeight: 800,
    transform: "scale(1.15) translateZ(20px)",
    textShadow: "0 0 20px rgba(159,232,214,0.6)",
  },

  tabInactive: {
    color: "rgba(160,170,190,0.45)",
    transform: "scale(0.9) translateZ(0)",
    opacity: 0.65,
  },

  animationKey: "sphereFloat",
};
