import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Background Remover, Transformer, and Generator | ImageGen",
  description: "Effortlessly remove backgrounds, transform images, and generate new visuals using AI. Enhance your creativity with our powerful image editing tools.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables:{colorPrimary:'#6C47FF'}
    }}>
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
