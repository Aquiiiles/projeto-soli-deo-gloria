'use client';

import { useT, useLang } from '@/lib/i18n';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import { images } from '@/lib/images';
import { Book, Settings, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CourseData {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  duration: string;
  durationEn: string;
}

const COURSES: CourseData[] = [
  {
    icon: <Book size={28} color="#fff" />,
    titleKey: 'theology',
    descKey: 'theologyDesc',
    duration: '12 meses',
    durationEn: '12 months',
  },
  {
    icon: <Settings size={28} color="#fff" />,
    titleKey: 'technology',
    descKey: 'technologyDesc',
    duration: '12 meses',
    durationEn: '12 months',
  },
  {
    icon: <Users size={28} color="#fff" />,
    titleKey: 'counseling',
    descKey: 'counselingDesc',
    duration: '6 meses',
    durationEn: '6 months',
  },
];

export default function CoursesPage() {
  const t = useT();
  const lang = useLang();

  return (
    <main className="page-enter">
      {/* Hero */}
      <Section bg="var(--primary)" style={{ paddingTop: 'calc(var(--nav-height) + 60px)' }}>
        <Container>
          <SectionTag light>{t('courses', 'sectionTag')}</SectionTag>
          <h1
            className="serif"
            style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 20 }}
          >
            {t('courses', 'title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, maxWidth: 640, lineHeight: 1.7 }}>
            {t('courses', 'desc')}
          </p>
        </Container>
      </Section>

      {/* Courses Grid */}
      <Section>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 32,
            }}
          >
            {COURSES.map((course, i) => (
              <div
                key={course.titleKey}
                className="card"
                style={{
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s forwards`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  {course.icon}
                </div>
                <h3 className="serif" style={{ fontSize: 24, marginBottom: 12 }}>
                  {t('courses', course.titleKey)}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 15,
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: 24,
                  }}
                >
                  {t('courses', course.descKey)}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 16,
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14 }}>
                    <Clock size={14} />
                    {lang === 'pt' ? course.duration : course.durationEn}
                  </div>
                  <Link href="/contact" className="btn btn-primary btn-sm">
                    {t('courses', 'enroll')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Institute */}
      <Section bg="var(--bg-warm)">
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <img
              src={images.institute}
              alt={lang === 'pt' ? 'Instituto de Tecnologia e Teologia' : 'Institute of Technology and Theology'}
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8 }}
              loading="lazy"
            />
            <div>
              <h2 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>
                {lang === 'pt' ? 'Instituto de Tecnologia e Teologia' : 'Institute of Technology and Theology'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
                {lang === 'pt'
                  ? 'Em parceria com a Liferay, o instituto oferece formação integrada que combina o estudo das Escrituras com capacitação em tecnologia. Nosso programa prepara jovens para servir a Deus com excelência tanto no ministério quanto no mercado de trabalho.'
                  : 'In partnership with Liferay, the institute offers integrated training that combines the study of Scripture with technology education. Our program prepares young people to serve God with excellence both in ministry and the marketplace.'}
              </p>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[
                  { value: '20', label: lang === 'pt' ? 'Alunos/ano' : 'Students/year' },
                  { value: '12', label: lang === 'pt' ? 'Meses' : 'Months' },
                  { value: '3', label: lang === 'pt' ? 'Turmas formadas' : 'Classes graduated' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="serif"
                      style={{
                        fontSize: 36,
                        fontWeight: 600,
                        color: 'var(--primary)',
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      {/* Video */}
      <Section>
        <Container narrow>
          <h2
            className="serif"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 24, textAlign: 'center' }}
          >
            {lang === 'pt' ? 'Turma 01 — Nossos Primeiros Alunos' : 'Class 01 — Our First Students'}
          </h2>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${images.videos.turma01}`}
              title={lang === 'pt' ? 'Turma 01' : 'Class 01'}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
