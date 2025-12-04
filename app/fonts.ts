import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google"

// Configure Plus Jakarta Sans font with multiple weights
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
})

// Configure Instrument Serif font
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-instrument-serif",
})
