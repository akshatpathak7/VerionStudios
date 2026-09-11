import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Verion Studios — Video Editing & Digital Experiences",
 description: "Podcasts, reels, and stories that stick. Verion Studios brings your footage to life through video editing, and your ideas online through custom websites and dashboards.",
 icons: {icon:"/verion-mark.svg",shortcut:"/verion-mark.svg"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}
