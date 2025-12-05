import type { Metadata, Viewport } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SettingsProvider } from "@/context/SettingsContext";
import { UserDataProvider } from "@/context/UserDataContext";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "Quran App",
  description: "Read the Holy Quran",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${amiri.variable} font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>


        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <UserDataProvider>
              {children}
            </UserDataProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
