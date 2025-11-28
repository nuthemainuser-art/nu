export const themes = {
  classic: { id: "classic", label: "Classic" },
  glass: { id: "glass", label: "Glass" },
  sphere: { id: "sphere", label: "Sphere" }
};

export type ThemeID = keyof typeof themes;
