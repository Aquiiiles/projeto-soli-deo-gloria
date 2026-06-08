'use client';

import { useT, useLang } from '@/lib/i18n';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useStore } from '@/lib/store';

const ROLE_LABELS_PT: Record<string, string> = {
  pastor: 'Pastor e Fundador',
  wife: 'Co-fundadora',
  coordinator: 'Coordenador(a)',
};

const ROLE_LABELS_EN: Record<string, string> = {
  pastor: 'Pastor & Founder',
  wife: 'Co-founder',
  coordinator: 'Coordinator',
};

export default function TeamPage() {
  const t = useT();
  const lang = useLang();
  const { team } = useStore();

  const roleLabels = lang === 'pt' ? ROLE_LABELS_PT : ROLE_LABELS_EN;

  return (
    <main className="page-enter">
      {/* Hero */}
      <Section bg="var(--primary)" style={{ paddingTop: 'calc(var(--nav-height) + 60px)' }}>
        <Container>
          <SectionTag light>{t('team', 'sectionTag')}</SectionTag>
          <h1
            className="serif"
            style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            {t('team', 'title')}
          </h1>
        </Container>
      </Section>

      {/* Team Grid */}
      <Section>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 32,
            }}
          >
            {team.map((member, i) => (
              <div
                key={member.name}
                className="card"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s forwards`,
                }}
              >
                <ImagePlaceholder
                  label={member.name}
                  height={260}
                  style={{ borderRadius: 0 }}
                />
                <div style={{ padding: 24 }}>
                  <h3
                    className="serif"
                    style={{ fontSize: 22, marginBottom: 4 }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--accent)',
                      marginBottom: 12,
                    }}
                  >
                    {roleLabels[member.role] || member.role}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
