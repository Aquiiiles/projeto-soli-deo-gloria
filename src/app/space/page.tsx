'use client';

import { useState } from 'react';
import { useT, useLang } from '@/lib/i18n';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { ChevronLeft, ChevronRight, X, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  label: string;
  labelEn: string;
  span?: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { label: 'Vista aérea do Monte Moriah', labelEn: 'Aerial view of Monte Moriah', span: 2 },
  { label: 'Capela', labelEn: 'Chapel' },
  { label: 'Plantações e horta', labelEn: 'Plantations and garden' },
  { label: 'Rio e natureza', labelEn: 'River and nature' },
  { label: 'Área de convivência', labelEn: 'Common area' },
  { label: 'Trilha na mata', labelEn: 'Forest trail' },
  { label: 'Alojamentos', labelEn: 'Lodging' },
  { label: 'Campo e atividades ao ar livre', labelEn: 'Field and outdoor activities', span: 2 },
];

export default function SpacePage() {
  const t = useT();
  const lang = useLang();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? GALLERY_ITEMS.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === GALLERY_ITEMS.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <main className="page-enter">
      {/* Hero */}
      <Section bg="var(--primary)" style={{ paddingTop: 'calc(var(--nav-height) + 60px)' }}>
        <Container>
          <SectionTag light>{t('space', 'sectionTag')}</SectionTag>
          <h1
            className="serif"
            style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 20 }}
          >
            {t('space', 'title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, maxWidth: 640, lineHeight: 1.7 }}>
            {t('space', 'desc')}
          </p>
        </Container>
      </Section>

      {/* Gallery */}
      <Section>
        <Container>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 32, textAlign: 'center' }}>
            {t('space', 'gallery')}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.label}
                style={{
                  gridColumn: item.span ? `span ${item.span}` : undefined,
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedIndex(i)}
              >
                <ImagePlaceholder
                  label={lang === 'pt' ? item.label : item.labelEn}
                  aspectRatio="16/9"
                  style={{ borderRadius: 8 }}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIndex(null);
          }}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: '#fff',
              zIndex: 1001,
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>

          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: 20,
              color: '#fff',
              zIndex: 1001,
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <div style={{ maxWidth: '80vw', maxHeight: '80vh', position: 'relative' }}>
            <ImagePlaceholder
              label={lang === 'pt' ? GALLERY_ITEMS[selectedIndex].label : GALLERY_ITEMS[selectedIndex].labelEn}
              aspectRatio="16/9"
              style={{ borderRadius: 8, minWidth: 320, maxWidth: '80vw' }}
            />
            <p
              style={{
                textAlign: 'center',
                color: '#fff',
                marginTop: 16,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {selectedIndex + 1} / {GALLERY_ITEMS.length}
            </p>
          </div>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: 20,
              color: '#fff',
              zIndex: 1001,
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Address */}
      <Section bg="var(--bg-warm)">
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 48,
              alignItems: 'start',
            }}
          >
            <div>
              <h2 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>
                {t('space', 'address')}
              </h2>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24 }}>
                <MapPin size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {t('space', 'addressText')}
                </p>
              </div>
              <Link
                href="https://maps.google.com/?q=Alameda+Pau+Ferro+835+Guabiraba+Recife+PE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {t('space', 'howToGet')}
                <ArrowRight size={16} />
              </Link>
            </div>
            <ImagePlaceholder
              label={lang === 'pt' ? 'Mapa de localização' : 'Location map'}
              aspectRatio="4/3"
              style={{ borderRadius: 8 }}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
