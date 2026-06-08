'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@/lib/i18n';
import Container from './Container';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

export default function Footer() {
  const t = useT();

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

  const socials = [
    { icon: InstagramIcon, url: 'https://www.instagram.com/projeto.solideogloria/' },
    { icon: FacebookIcon, url: 'https://www.facebook.com/espacomontemoriah/' },
    { icon: YoutubeIcon, url: 'https://www.youtube.com/@projetosolideogloria' },
  ];

  return (
    <footer style={{ background: 'var(--primary)', color: '#fff', padding: '80px 0 40px' }}>
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Image src="/assets/logo-branco.png" alt="SDG" width={44} height={44} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600 }}>
                Soli Deo Gloria
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 280 }}>
              {t('footer', 'desc')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 20,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {t('footer', 'links')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => window.scrollTo(0, 0)}
                  style={{ textAlign: 'left', fontSize: 14, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                >
                  {t('nav', l.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 20,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {t('footer', 'social')}
            </h4>
            <div style={{ display: 'flex', gap: 16 }}>
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#fff';
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 20,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {t('footer', 'contact')}
            </h4>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {t('footer', 'address')}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            textAlign: 'center',
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {t('footer', 'rights')}
        </div>
      </Container>
    </footer>
  );
}
