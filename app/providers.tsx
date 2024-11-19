'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  // This effect ensures that the theme is only applied on the client-side to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering until the client-side is ready
  }

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
