'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LanguageContext, type Lang } from '@/lib/i18n';
import { StoreProvider } from '@/lib/store';
import Nav from './Nav';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');
  const pathname = usePathname();

  const pageMap: Record<string, string> = {
    '/': 'home',
    '/about': 'about',
    '/team': 'team',
    '/space': 'space',
    '/events': 'events',
    '/cafe': 'cafe',
    '/courses': 'courses',
    '/contact': 'contact',
    '/admin': 'admin',
  };

  const currentPage = pageMap[pathname] || 'home';
  const isAdmin = pathname === '/admin';

  return (
    <LanguageContext.Provider value={lang}>
      <StoreProvider>
        <Nav currentPage={currentPage} lang={lang} onLangChange={() => setLang((l) => (l === 'pt' ? 'en' : 'pt'))} />
        <main className="page-enter">{children}</main>
        {!isAdmin && <Footer />}
      </StoreProvider>
    </LanguageContext.Provider>
  );
}
