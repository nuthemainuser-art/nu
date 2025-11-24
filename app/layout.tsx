export const metadata = {
  title: "Nu",
  description: "NuV1 Minimal Auth App"
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif" }}>{children}</body>
    </html>
  );
}
