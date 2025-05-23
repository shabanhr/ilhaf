import { Gulzar } from "next/font/google";
import localFont from "next/font/local";


export const gulzar = Gulzar({
    weight: ['400'],
    subsets: ['arabic'],
});



export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
