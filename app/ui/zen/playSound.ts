// app/ui/zen/playSound.ts
export function playClick() {
  if (typeof window === "undefined") return;

  const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as any;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = 650;
  gain.gain.value = 0.12;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}
