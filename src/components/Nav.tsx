'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useT, useLang } from '@/lib/i18n';
import Container from './Container';

interface NavProps {
  currentPage: string;
  lang: string;
  onLangChange: () => void;
}

export default function Nav({ currentPage, lang, onLangChange }: NavProps) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'team', href: '/team' },
    { key: 'space', href: '/space' },
    { key: 'events', href: '/events' },
    { key: 'cafe', href: '/cafe' },
    { key: 'courses', href: '/courses' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height)',
          background: 'rgba(255,255,255,0.97)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}>
            <Image src="/assets/logo-azul.png" alt="SDG" width={40} height={40} />
            <span
              className="hidden sm:block"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--primary)',
                letterSpacing: '-0.01em',
              }}
            >
              Soli Deo Gloria
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 28 }}>
            {links.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                onClick={() => window.scrollTo(0, 0)}
                style={{
                  padding: '4px 0',
                  fontSize: 14,
                  fontWeight: 500,
                  color: currentPage === l.key ? 'var(--primary)' : 'var(--text-secondary)',
                  borderBottom: currentPage === l.key ? '2px solid var(--primary)' : '2px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {t('nav', l.key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={onLangChange}
              style={{
                padding: '5px 10px',
                fontSize: 12,
                fontWeight: 600,
                border: '1.5px solid var(--border)',
                borderRadius: 4,
                color: 'var(--text-secondary)',
                background: 'transparent',
                cursor: 'pointer',
                letterSpacing: '0.03em',
              }}
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>

            <Link href="/admin" className="btn btn-primary btn-sm hidden lg:inline-flex" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: 12 }}>
              {t('nav', 'admin')}
            </Link>

            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ padding: 8, display: 'flex' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            zIndex: 99,
            padding: '32px 24px',
            animation: 'fadeIn 0.2s ease-out',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {links.map((l, i) => (
            <Link
              key={l.key}
              href={l.href}
              onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}
              style={{
                padding: '16px 0',
                fontSize: 18,
                fontWeight: 500,
                fontFamily: 'var(--font-serif)',
                color: currentPage === l.key ? 'var(--primary)' : 'var(--text)',
                textAlign: 'left',
                borderBottom: '1px solid var(--border-light)',
                animation: `fadeInUp 0.3s ease-out ${i * 0.04}s forwards`,
              }}
            >
              {t('nav', l.key)}
            </Link>
          ))}
          <Link
            href="/admin"
            className="btn btn-primary"
            onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}
            style={{ marginTop: 24, width: '100%' }}
          >
            {t('nav', 'admin')}
          </Link>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 'var(--nav-height)' }} />
    </>
  );
}
