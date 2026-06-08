'use client';

import { useState, useCallback } from 'react';
import { useT, useLang } from '@/lib/i18n';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Toast from '@/components/Toast';
import { MapPin, MessageCircle, Mail, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const t = useT();
  const lang = useLang();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleCloseToast = useCallback(() => setShowToast(false), []);

  const contactItems = [
    {
      icon: <MapPin size={20} />,
      label: lang === 'pt' ? 'Endereço' : 'Address',
      value: 'Alameda Pau Ferro, 835\nGuabiraba, Recife - PE\n54789-770',
      href: 'https://maps.google.com/?q=Alameda+Pau+Ferro+835+Guabiraba+Recife+PE',
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      value: '+55 (81) 99999-0000',
      href: 'https://wa.me/5581999990000',
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'contato@solideogloria.com.br',
      href: 'mailto:contato@solideogloria.com.br',
    },
    {
      icon: <ExternalLink size={20} />,
      label: 'Instagram',
      value: '@projetosolideogloria',
      href: 'https://instagram.com/projetosolideogloria',
    },
  ];

  return (
    <main className="page-enter">
      {/* Hero */}
      <Section bg="var(--primary)" style={{ paddingTop: 'calc(var(--nav-height) + 60px)' }}>
        <Container>
          <SectionTag light>{t('contact', 'sectionTag')}</SectionTag>
          <h1
            className="serif"
            style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 20 }}
          >
            {t('contact', 'title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, maxWidth: 640, lineHeight: 1.7 }}>
            {t('contact', 'desc')}
          </p>
        </Container>
      </Section>

      {/* Form + Info */}
      <Section>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 48,
              alignItems: 'start',
            }}
          >
            {/* Contact Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">{t('contact', 'name')}</label>
                <input
                  id="name"
                  name="name"
                  className="form-input"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact', 'name')}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">{t('contact', 'email')}</label>
                <input
                  id="email"
                  name="email"
                  className="form-input"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('contact', 'email')}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">{t('contact', 'subject')}</label>
                <input
                  id="subject"
                  name="subject"
                  className="form-input"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t('contact', 'subject')}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">{t('contact', 'message')}</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contact', 'message')}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                {t('contact', 'send')}
              </button>
            </form>

            {/* Contact Info */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 16, textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 8,
                        background: 'var(--primary-50)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 15, whiteSpace: 'pre-line' }}>
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <ImagePlaceholder
                label={lang === 'pt' ? 'Mapa de localização' : 'Location map'}
                aspectRatio="16/9"
                style={{ borderRadius: 8 }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Toast */}
      {showToast && (
        <Toast
          message={t('contact', 'sent')}
          type="success"
          onClose={handleCloseToast}
        />
      )}
    </main>
  );
}
