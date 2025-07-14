import "./globals.css";
import { UserProvider } from "@/context/UserContext";

// فونت اختصاصی با CSS Variable
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "صفحه ورود و داشبورد",
  description: "تسک احراز هویت با Next.js + TS + SCSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body className={`${inter.variable} font-sans bg-gray-50 min-h-screen`}>
        {/* پوشش دادن کل اپ با UserProvider */}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
