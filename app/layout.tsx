import "./globals.css";
import { ThemeProvider } from "./theme/ThemeContext";

export const metadata = {
  title: "Nu / Streamforge",
  description: "Multi-layer Experience Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
