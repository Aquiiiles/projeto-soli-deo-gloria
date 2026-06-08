'use client';

import { useT, useLang } from '@/lib/i18n';
import { getCategoryStyle, getCategoryLabel } from '@/lib/data';
import { useStore } from '@/lib/store';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin, Coffee, ImageIcon, Book, Users } from 'lucide-react';

const MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatEventDate(dateStr: string, lang: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const months = lang === 'pt' ? MONTHS_PT : MONTHS_EN;
  return { day: d.getDate(), month: months[d.getMonth()], year: d.getFullYear() };
}

export default function Home() {
  const t = useT();
  const lang = useLang();
  const { events: allEvents } = useStore();

  const events = allEvents.slice(0, 3);

  const areas = [
    { num: '01', icon: Book, title: t('areas', 'education'), desc: t('areas', 'educationDesc') },
    { num: '02', icon: Users, title: t('areas', 'camps'), desc: t('areas', 'campsDesc') },
    { num: '03', icon: Calendar, title: t('areas', 'events'), desc: t('areas', 'eventsDesc') },
  ];

  return (
    <main className="page-enter">
      {/* ===== Hero ===== */}
      <section
        style={{
          minHeight: 'calc(100vh - var(--nav-height))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          padding: '40px 24px',
        }}
      >
        {/* Decorative vertical line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 1,
            height: 80,
            background: 'var(--primary-200)',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            marginTop: 40,
            animation: 'fadeIn 0.8s ease-out forwards',
          }}
        >
          <Image
            src="/logo.png"
            alt="Soli Deo Gloria"
            width={100}
            height={100}
            style={{ margin: '0 auto', objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: 500,
            color: 'var(--primary)',
            marginTop: 24,
            lineHeight: 1.1,
            opacity: 0,
            animation: 'fadeInUp 0.7s ease-out 0.2s forwards',
          }}
        >
          {t('hero', 'title')}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'var(--text-secondary)',
            marginTop: 16,
            maxWidth: 520,
            opacity: 0,
            animation: 'fadeInUp 0.7s ease-out 0.4s forwards',
          }}
        >
          {t('hero', 'subtitle')}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 36,
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: 0,
            animation: 'fadeInUp 0.7s ease-out 0.6s forwards',
          }}
        >
          <Link href="/about" onClick={() => window.scrollTo(0, 0)} className="btn btn-primary btn-lg">
            {t('hero', 'cta')}
          </Link>
          <Link href="/events" onClick={() => window.scrollTo(0, 0)} className="btn btn-outline btn-lg">
            {t('hero', 'cta2')}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 0,
            animation: 'fadeIn 1s ease-out 1s forwards',
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, var(--primary-200), transparent)',
            }}
          />
        </div>
      </section>

      {/* ===== About Preview ===== */}
      <Section bg="var(--bg-warm)">
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'center',
            }}
          >
            <div>
              <SectionTag>{t('about', 'sectionTag')}</SectionTag>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  color: 'var(--primary)',
                  marginBottom: 20,
                }}
              >
                {t('about', 'title')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                {t('about', 'desc')}
              </p>
              <Link href="/about" onClick={() => window.scrollTo(0, 0)} className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {t('about', 'learnMore')} <ArrowRight size={16} />
              </Link>
            </div>
            <ImagePlaceholder label="SDG Aldeia" aspectRatio="4/3" style={{ borderRadius: 8 }} />
          </div>
        </Container>
      </Section>

      {/* ===== Areas ===== */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag>{t('areas', 'sectionTag')}</SectionTag>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--primary)' }}>
              {t('areas', 'title')}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {areas.map((area, i) => (
              <div
                key={area.num}
                className="card"
                style={{
                  padding: 36,
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s forwards`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: 'var(--primary-50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <area.icon size={22} color="var(--primary)" />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 48,
                    fontWeight: 300,
                    color: 'var(--border)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {area.num}
                </span>
                <h3 style={{ fontSize: 20, color: 'var(--primary)', marginBottom: 10 }}>
                  {area.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== Events Preview ===== */}
      <Section bg="var(--primary)">
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <SectionTag light>{t('eventsList', 'sectionTag')}</SectionTag>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff' }}>
                {t('eventsList', 'title')}
              </h2>
            </div>
            <Link href="/events" onClick={() => window.scrollTo(0, 0)} className="btn btn-white btn-sm">
              {t('eventsList', 'viewAll')} <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {events.map((ev, i) => {
              const catStyle = getCategoryStyle(ev.category);
              const { day, month } = formatEventDate(ev.date, lang);
              const evName = lang === 'en' ? ev.nameEn : ev.name;
              const evSubtitle = lang === 'en' ? ev.subtitleEn : ev.subtitle;

              return (
                <div
                  key={ev.id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: 0,
                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s forwards`,
                  }}
                >
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Category badge + spots */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span
                        className="badge"
                        style={{ background: catStyle.bg, color: catStyle.color }}
                      >
                        {getCategoryLabel(ev.category, lang)}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {ev.spotsLeft > 0
                          ? `${ev.spotsLeft} ${t('eventsList', 'spotsLeft')}`
                          : t('eventsList', 'soldOut')}
                      </span>
                    </div>

                    {/* Title + subtitle */}
                    <h3 style={{ fontSize: 20, color: 'var(--primary)', marginBottom: 6 }}>
                      {evName}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
                      {evSubtitle}
                    </p>

                    {/* Date + location */}
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={13} /> {day} {month} - {ev.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={13} /> {ev.location}
                      </span>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Price */}
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--primary)' }}>
                        {ev.price === 0 ? t('eventsList', 'free') : `R$ ${ev.price}`}
                      </span>
                      {/* Register button */}
                      <Link
                        href={`/events/${ev.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="btn btn-primary btn-sm"
                      >
                        {t('eventsList', 'register')}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ===== Cafe Preview ===== */}
      <Section>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'center',
            }}
          >
            <ImagePlaceholder label="Cafe SDG" aspectRatio="4/3" style={{ borderRadius: 8 }} />
            <div>
              <SectionTag>{t('cafe', 'sectionTag')}</SectionTag>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  color: 'var(--primary)',
                  marginBottom: 20,
                }}
              >
                {t('cafe', 'title')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                {t('cafe', 'desc')}
              </p>
              <Link href="/cafe" onClick={() => window.scrollTo(0, 0)} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Coffee size={16} /> {t('cafe', 'learnMore')}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== Space Preview ===== */}
      <Section bg="var(--bg-warm)">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <SectionTag>{t('space', 'sectionTag')}</SectionTag>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--primary)', marginBottom: 16 }}>
              {t('space', 'title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
              {t('space', 'desc')}
            </p>
          </div>

          {/* Gallery grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 200px)',
              gap: 16,
              marginBottom: 40,
            }}
          >
            <ImagePlaceholder label="Espaco 1" style={{ borderRadius: 8, height: '100%' }} height="100%" />
            <ImagePlaceholder label="Espaco 2" style={{ borderRadius: 8, height: '100%' }} height="100%" />
            <ImagePlaceholder label="Espaco 3" style={{ borderRadius: 8, height: '100%' }} height="100%" />
            <ImagePlaceholder label="Espaco 4" style={{ borderRadius: 8, height: '100%', gridColumn: 'span 2' }} height="100%" />
            <ImagePlaceholder label="Espaco 5" style={{ borderRadius: 8, height: '100%' }} height="100%" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <Link href="/space" onClick={() => window.scrollTo(0, 0)} className="btn btn-primary">
              <ImageIcon size={16} /> {t('space', 'gallery')}
            </Link>
            <a
              href="https://maps.google.com/?q=Alameda+Pau+Ferro+835+Guabiraba+Recife+PE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <MapPin size={16} /> {t('space', 'howToGet')}
            </a>
          </div>
        </Container>
      </Section>

      {/* ===== CTA Strip ===== */}
      <Section bg="var(--accent)" style={{ padding: '64px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 400,
                color: '#fff',
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              {lang === 'pt'
                ? '"Quer comais, quer bebais ou façais outra qualquer coisa, fazei tudo para glória de Deus."'
                : '"Whether you eat or drink, or whatever you do, do all to the glory of God."'}
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.75)',
                marginTop: 16,
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              1 Coríntios 10:31
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
