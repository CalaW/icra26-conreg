import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "From Swept Contact to Pose",
  description:
    "Project page for Probe-aware registration via complementary-shape docking, ICRA 2026.",
  openGraph: {
    title: "From Swept Contact to Pose",
    description:
      "Calibration-free contact registration through probe-aware complementary-shape docking.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
