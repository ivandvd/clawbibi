import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";

export const metadata: Metadata = {
  title: "Clawbibi — Your Arab-Native AI Assistant in the Cloud",
  description: "Your personal AI assistant built for the Gulf. Clawbibi lives in the cloud, speaks Arabic, and handles your tasks, reminders, and daily life from WhatsApp, Telegram, or any messenger.",
  icons: {
    icon: "/clawbibi-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var l=localStorage.getItem('clawbibi-lang');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}}catch(e){}` }} />
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
