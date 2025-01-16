'use client'

import React, { useEffect } from 'react'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
} as const;

export default function ColorModeProvider({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chakra-ui-color-mode', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    }
  }, []);

  return (
    <>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </>
  );
} 