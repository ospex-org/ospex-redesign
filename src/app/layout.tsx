import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from 'next/font/google';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import StatsBar from '@/components/layout/StatsBar'
import Header from '@/components/layout/Header'
import { Box } from '@chakra-ui/react'
import MenuBar from "@/components/layout/MenuBar";
import React from 'react';
import '../app/globals.css';

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Simple config object that won't cause serialization issues
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
} as const;

export const metadata: Metadata = {
  title: "ospex.org",
  description: "Open Speculation Exchange",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={atkinsonHyperlegible.className}>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <ChakraProvider>
          <Box bg="black" minHeight="100vh">
            <StatsBar />
            <Header />
            <MenuBar />
            {children}
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
