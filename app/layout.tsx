import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Verion Studios — Video Editing & Digital Experiences",
 description: "Podcasts, reels, and stories that stick. Verion Studios brings your footage to life through video editing, and your ideas online through custom websites and dashboards.",
 icons: {icon: [{url:"/verion-favicon-v2.png",type:"image/png",sizes:"64x64"}],shortcut:"/verion-favicon-v2.png"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}
