import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Nasib Dompet - Prediksi Nasib Sial Berdasarkan Isi Dompet",
  description: "Website fun untuk memprediksi nasib sial berdasarkan jumlah uang di dompet menggunakan AI Gemini Flash 2.0. Cocok untuk hiburan dan candaan!",
  keywords: ["nasib dompet", "prediksi nasib", "AI gemini", "fun website", "fortune teller", "indonesia"],
  authors: [{ name: "Nasib Dompet Team" }],
  creator: "Nasib Dompet",
  openGraph: {
    title: "Nasib Dompet - Prediksi Nasib Sial",
    description: "Tebak nasib sial berdasarkan isi dompet kamu dengan AI Gemini Flash 2.0",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasib Dompet - Prediksi Nasib Sial",
    description: "Tebak nasib sial berdasarkan isi dompet kamu dengan AI Gemini Flash 2.0",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
