import '@styles/globals.css';
import { ReactNode, Suspense } from 'react';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Loading from '../components/Loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promptmania',
  description: 'Discover & Share AI Prompts',
  icons: {
    icon: '/assets/images/logo.svg',
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
