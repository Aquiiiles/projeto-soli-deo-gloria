'use client';

import { useT, useLang } from '@/lib/i18n';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import { images } from '@/lib/images';

export default function AboutPage() {
  const t = useT();
  const lang = useLang();

  return (
    <main className="page-enter">
      {/* Hero */}
      <Section bg="var(--primary)" style={{ paddingTop: 'calc(var(--nav-height) + 60px)' }}>
        <Container>
          <SectionTag light>{t('about', 'sectionTag')}</SectionTag>
          <h1
            className="serif"
            style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 20 }}
          >
            {t('about', 'title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, maxWidth: 640, lineHeight: 1.7 }}>
            {t('about', 'desc')}
          </p>
        </Container>
      </Section>

      {/* Mission */}
      <Section>
        <Container narrow>
          <h2
            className="serif"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 24, textAlign: 'center' }}
          >
            {t('about', 'mission')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: 16, lineHeight: 1.8 }}>
            {t('about', 'missionText')}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            {t('about', 'missionText2')}
          </p>
        </Container>
      </Section>

      {/* Wide Image */}
      <Section style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Container>
          <img
            src={images.aboutPanorama}
            alt={lang === 'pt' ? 'Vista panorâmica do Monte Moriah' : 'Panoramic view of Monte Moriah'}
            style={{ width: '100%', aspectRatio: '21/9', objectFit: 'cover', borderRadius: 8 }}
            loading="lazy"
          />
        </Container>
      </Section>

      {/* Vision */}
      <Section>
        <Container narrow>
          <h2
            className="serif"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 24, textAlign: 'center' }}
          >
            {t('about', 'vision')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, textAlign: 'center' }}>
            {t('about', 'visionText')}
          </p>
        </Container>
      </Section>

      {/* Video */}
      <Section bg="var(--bg-warm)">
        <Container narrow>
          <h2
            className="serif"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 24, textAlign: 'center' }}
          >
            {lang === 'pt' ? 'Conheça o Projeto' : 'Meet the Project'}
          </h2>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${images.videos.turma03}`}
              title="Projeto Soli Deo Gloria"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Container>
      </Section>

      {/* Partnership */}
      <Section>
        <Container narrow style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>
            {lang === 'pt' ? 'Instituto de Tecnologia e Teologia' : 'Institute of Technology and Theology'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 12 }}>
            {lang === 'pt'
              ? 'Em parceria com a Liferay, estabelecemos um Instituto de Tecnologia e Teologia onde 20 jovens se envolvem em estudos em tempo integral ao longo do ano. Essa parceria única integra a formação teológica reformada com capacitação em tecnologia, preparando os alunos para servir a Deus em todas as áreas da vida.'
              : 'In partnership with Liferay, we established an Institute of Technology and Theology where 20 young men engage in full-time study throughout the year. This unique partnership integrates reformed theological training with technology education, preparing students to serve God in every area of life.'}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            {lang === 'pt'
              ? 'Os alunos recebem formação prática e acadêmica que os capacita não apenas no conhecimento das Escrituras, mas também em habilidades profissionais que servirão para o avanço do Reino de Deus.'
              : 'Students receive practical and academic training that equips them not only in knowledge of Scripture, but also in professional skills that will serve to advance the Kingdom of God.'}
          </p>
        </Container>
      </Section>
    </main>
  );
}
