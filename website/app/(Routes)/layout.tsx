import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../_components/navbar";

import "./global.css";
import Footer from "../_components/footer";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graphic Era University",
  description: "Graphic Era Deemed to be University Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Box
          sx={{ minHeight: "calc(100vh - 12rem)", bgcolor: "#F5F5F5", py: 0 }}
        >
          {children}
        </Box>
        <Footer />
      </body>
    </html>
  );
}
