import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Verion Studios | Video Editing & Web Development",
 description: "Video editing for podcasts, reels, and long-form content, plus custom website and dashboard development for creators and businesses.",
 icons: {icon: [{url:"/verion-favicon-v2.png",type:"image/png",sizes:"64x64"}],shortcut:"/verion-favicon-v2.png"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}
