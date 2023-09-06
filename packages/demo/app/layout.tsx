import * as React from 'react';

import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';
import Providers from './providers/providers';
import AppBar from '@/app/components/Layout/AppBar/AppBar';
import ContentLayout from '@/app/components/Layout/ContentLayout';

export const metadata = {
  title: 'Lazy Mint Demo',
  description: 'Lazy Mint Demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <Providers>
            <AppBar />
            <ContentLayout>{children}</ContentLayout>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
