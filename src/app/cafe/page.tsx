'use client';

import { useT, useLang } from '@/lib/i18n';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CafePage() {
  const t = useT();
  const lang = useLang();

  return (
    <main className="page-enter">
      {/* Hero */}
      <Section bg="var(--primary)" style={{ paddingTop: 'calc(var(--nav-height) + 60px)' }}>
        <Container>
          <SectionTag light>{t('cafe', 'sectionTag')}</SectionTag>
          <h1
            className="serif"
            style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            {t('cafe', 'title')}
          </h1>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container narrow>
          <ImagePlaceholder
            label={lang === 'pt' ? 'Café Soli Deo Gloria' : 'Café Soli Deo Gloria'}
            aspectRatio="21/9"
            style={{ borderRadius: 8, marginBottom: 40 }}
          />
          <p
            style={{
              fontSize: 18,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {t('cafe', 'desc')}
          </p>
          <p
            style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            {lang === 'pt'
              ? 'O café tem crescido como um ponto de encontro especial para a comunidade, oferecendo bebidas artesanais, bolos caseiros e um ambiente acolhedor que reflete os valores do projeto. Cada visita é uma oportunidade de comunhão e apoio ao ministério.'
              : 'The café has grown as a special meeting point for the community, offering artisan beverages, homemade cakes, and a welcoming atmosphere that reflects the project\'s values. Each visit is an opportunity for fellowship and support of the ministry.'}
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link
              href="https://instagram.com/cafesolideogloria"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              <ExternalLink size={16} />
              {lang === 'pt' ? 'Siga no Instagram' : 'Follow on Instagram'}
            </Link>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {[
              { pt: 'Ambiente interno', en: 'Interior' },
              { pt: 'Bebidas artesanais', en: 'Artisan beverages' },
              { pt: 'Bolos e doces', en: 'Cakes and sweets' },
            ].map((item) => (
              <ImagePlaceholder
                key={item.pt}
                label={lang === 'pt' ? item.pt : item.en}
                aspectRatio="4/3"
                style={{ borderRadius: 8 }}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
