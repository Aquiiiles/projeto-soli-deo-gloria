'use client';

import { useState, useEffect, useRef } from 'react';
import { useT, useLang } from '@/lib/i18n';
import { MOCK_EVENTS, getCategoryStyle, getCategoryLabel, type SDGEvent } from '@/lib/data';
import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionTag from '@/components/SectionTag';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {
  Calendar, MapPin, Clock, Users, Filter,
  ChevronLeft, ChevronRight, ArrowRight, ArrowLeft,
  X, Check, Copy,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Registration Modal                                                 */
/* ------------------------------------------------------------------ */

interface RegistrationModalProps {
  event: SDGEvent;
  onClose: () => void;
  onComplete: () => void;
}

function RegistrationModal({ event, onClose, onComplete }: RegistrationModalProps) {
  const t = useT();
  const lang = useLang();

  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [copied, setCopied] = useState(false);
  const [cardToken, setCardToken] = useState('');
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string } | null>(null);
  const [boletoUrl, setBoletoUrl] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', church: '', age: '', notes: '',
  });

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const handleFormSubmit = () => {
    if (!form.name || !form.email || !form.phone) return;
    if (event.price === 0) {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const startPolling = (id: number) => {
    setPolling(true);
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/status?id=${id}`);
        const data = await res.json();
        if (data.status === 'approved') {
          clearInterval(interval);
          pollingRef.current = null;
          setPolling(false);
          setStep(3);
        } else if (data.status === 'cancelled' || data.status === 'rejected') {
          clearInterval(interval);
          pollingRef.current = null;
          setPolling(false);
          setPaymentError(lang === 'pt' ? 'Pagamento não aprovado.' : 'Payment not approved.');
        }
      } catch {
        // Ignore polling errors
      }
    }, 5000);

    pollingRef.current = interval;

    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(interval);
      if (pollingRef.current === interval) pollingRef.current = null;
      setPolling(false);
    }, 600000);
  };

  const handleCheckStatus = async () => {
    if (!paymentId) return;
    setProcessing(true);
    try {
      const res = await fetch(`/api/payments/status?id=${paymentId}`);
      const data = await res.json();
      if (data.status === 'approved') {
        if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
        setPolling(false);
        setStep(3);
      } else if (data.status === 'cancelled' || data.status === 'rejected') {
        if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
        setPolling(false);
        setPaymentError(lang === 'pt' ? 'Pagamento não aprovado.' : 'Payment not approved.');
      }
    } catch {
      // ignore
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    setPaymentError(null);

    try {
      const payload: Record<string, unknown> = {
        method: paymentMethod === 'card' ? 'credit_card' : paymentMethod,
        eventName: lang === 'en' ? event.nameEn : event.name,
        amount: event.price,
        eventId: event.id,
        payer: {
          email: form.email,
          name: form.name,
        },
        registrationData: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          church: form.church,
        },
      };

      // For credit card, add token (requires MP.js SDK in production)
      if (paymentMethod === 'card') {
        payload.token = cardToken;
        payload.installments = 1;
      }

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento');
      }

      setPaymentId(data.id);

      if (paymentMethod === 'pix' && data.pix) {
        setPixData(data.pix);
        startPolling(data.id);
      } else if (paymentMethod === 'boleto' && data.boleto) {
        setBoletoUrl(data.boleto.external_resource_url);
        setStep(3);
      } else if (data.status === 'approved') {
        setStep(3);
      } else if (data.status === 'rejected') {
        setPaymentError(lang === 'pt' ? 'Pagamento recusado. Tente outro método.' : 'Payment rejected. Try another method.');
      } else {
        // For pending statuses
        setStep(3);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao processar pagamento';
      setPaymentError(message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCopyPix = () => {
    const pixCode = pixData?.qr_code || '';
    navigator.clipboard?.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepBarStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    height: 3,
    borderRadius: 2,
    background: active ? 'var(--primary)' : 'var(--border)',
    transition: 'background var(--transition)',
  });

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ padding: 0 }} onClick={e => e.stopPropagation()}>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, padding: '20px 24px 0' }}>
          <div style={stepBarStyle(step >= 1)} />
          <div style={stepBarStyle(step >= 2)} />
        </div>

        <div style={{ padding: 24 }}>
          {/* Step 1: Form */}
          {step === 1 && (
            <>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 20 }}>
                {t('registration', 'title')} &mdash; {lang === 'en' ? event.nameEn : event.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">{t('registration', 'name')} *</label>
                  <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('registration', 'email')} *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('registration', 'phone')} *</label>
                  <input className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('registration', 'church')}</label>
                  <input className="form-input" value={form.church} onChange={e => setForm({ ...form, church: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">{t('registration', 'age')}</label>
                    <input className="form-input" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('registration', 'notes')}</label>
                  <textarea className="form-input" rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>
                  {t('registration', 'close')}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleFormSubmit}
                  disabled={!form.name || !form.email || !form.phone}
                  style={{ flex: 1, opacity: (!form.name || !form.email || !form.phone) ? 0.5 : 1 }}
                >
                  {event.price === 0 ? t('registration', 'close') : t('registration', 'continue')}
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 8 }}>
                {t('registration', 'payment')}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
                {t('eventsList', 'price')}: <strong style={{ color: 'var(--primary)', fontSize: 18 }}>R$ {event.price}</strong>
              </p>

              {/* Payment method tabs */}
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                {t('registration', 'paymentMethod')}
              </p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {(['pix', 'card', 'boleto'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: 4,
                      border: `1.5px solid ${paymentMethod === m ? 'var(--primary)' : 'var(--border)'}`,
                      background: paymentMethod === m ? 'var(--primary-50)' : 'transparent',
                      color: paymentMethod === m ? 'var(--primary)' : 'var(--text-secondary)',
                      transition: 'all var(--transition)',
                    }}
                  >
                    {m === 'pix' ? t('registration', 'pix') : m === 'card' ? t('registration', 'creditCard') : t('registration', 'boleto')}
                  </button>
                ))}
              </div>

              {/* PIX */}
              {paymentMethod === 'pix' && (
                <div style={{ textAlign: 'center' }}>
                  {!pixData ? (
                    <>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
                        {t('registration', 'pixInstructions')}
                      </p>
                      <button className="btn btn-primary" onClick={handlePayment} disabled={processing} style={{ width: '100%' }}>
                        {processing ? t('registration', 'processing') : (lang === 'en' ? 'Generate PIX' : 'Gerar PIX')}
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
                        {t('registration', 'pixInstructions')}
                      </p>
                      {/* Real QR Code */}
                      <div style={{ margin: '0 auto 16px', display: 'flex', justifyContent: 'center' }}>
                        <img
                          src={`data:image/png;base64,${pixData.qr_code_base64}`}
                          alt="PIX QR Code"
                          style={{ width: 180, height: 180, borderRadius: 8 }}
                        />
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                        {t('registration', 'pixKey')}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                        <code style={{
                          padding: '8px 14px', background: 'var(--bg-warm)', borderRadius: 4,
                          fontSize: 12, color: 'var(--text)', wordBreak: 'break-all', maxWidth: 280,
                        }}>
                          {pixData.qr_code}
                        </code>
                        <button
                          onClick={handleCopyPix}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '8px 12px',
                            fontSize: 13, fontWeight: 500, borderRadius: 4, flexShrink: 0,
                            border: '1.5px solid var(--border)', color: copied ? 'var(--success)' : 'var(--primary)',
                            background: copied ? '#E8F5EE' : 'transparent',
                            transition: 'all var(--transition)',
                          }}
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? t('registration', 'copied') : t('registration', 'copy')}
                        </button>
                      </div>

                      {/* Polling indicator */}
                      {polling && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, color: 'var(--text-secondary)', fontSize: 14 }}>
                          <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                          {lang === 'en' ? 'Waiting for payment...' : 'Aguardando pagamento...'}
                        </div>
                      )}

                      {/* Manual check button */}
                      <button
                        className="btn btn-outline"
                        onClick={handleCheckStatus}
                        disabled={processing}
                        style={{ marginTop: 16, width: '100%' }}
                      >
                        {processing ? t('registration', 'processing') : (lang === 'en' ? 'I already paid' : 'Ja paguei')}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Credit Card */}
              {paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ padding: '10px 14px', background: 'var(--bg-warm)', borderRadius: 6, fontSize: 13, color: 'var(--text-secondary)', borderLeft: '3px solid var(--primary)' }}>
                    {lang === 'en'
                      ? 'Card integration requires additional SDK setup'
                      : 'Integração com cartão requer configuração adicional do SDK'}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('registration', 'cardNumber')}</label>
                    <input className="form-input" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('registration', 'cardName')}</label>
                    <input className="form-input" />
                  </div>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">{t('registration', 'cardExpiry')}</label>
                      <input className="form-input" placeholder="MM/AA" />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">{t('registration', 'cardCvv')}</label>
                      <input className="form-input" placeholder="000" />
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={handlePayment} disabled={processing} style={{ marginTop: 8, width: '100%' }}>
                    {processing ? t('registration', 'processing') : `${t('registration', 'pay')} R$ ${event.price}`}
                  </button>
                </div>
              )}

              {/* Boleto */}
              {paymentMethod === 'boleto' && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
                    {lang === 'en'
                      ? 'A boleto will be generated and sent to your email. Payment can take up to 3 business days to be confirmed.'
                      : 'Um boleto sera gerado e enviado para seu e-mail. O pagamento pode levar ate 3 dias uteis para ser confirmado.'}
                  </p>
                  <button className="btn btn-primary" onClick={handlePayment} disabled={processing} style={{ width: '100%' }}>
                    {processing ? t('registration', 'processing') : (lang === 'en' ? 'Generate Boleto' : 'Gerar Boleto')}
                  </button>
                </div>
              )}

              <button
                className="btn btn-ghost"
                onClick={() => setStep(1)}
                style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <ArrowLeft size={14} /> {t('registration', 'back')}
              </button>
            </>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: '#E8F5EE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Check size={32} color="var(--success)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 8 }}>
                {t('registration', 'success')}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
                {t('registration', 'successMsg')}
              </p>
              <button className="btn btn-primary" onClick={() => { onComplete(); onClose(); }} style={{ width: '100%' }}>
                {t('registration', 'close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Events Page                                                        */
/* ------------------------------------------------------------------ */

const MONTH_NAMES_PT = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT_MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const SHORT_MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const DAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CategoryFilter = 'all' | 'conference' | 'camp' | 'workshop' | 'cafe';

export default function EventsPage() {
  const t = useT();
  const lang = useLang();

  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selectedEvent, setSelectedEvent] = useState<SDGEvent | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const now = new Date();
  const [calMonth, setCalMonth] = useState({ year: now.getFullYear(), month: now.getMonth() });

  const monthNames = lang === 'en' ? MONTH_NAMES_EN : MONTH_NAMES_PT;
  const shortMonths = lang === 'en' ? SHORT_MONTHS_EN : SHORT_MONTHS_PT;
  const dayNames = lang === 'en' ? DAY_NAMES_EN : DAY_NAMES_PT;

  const filteredEvents = filter === 'all' ? MOCK_EVENTS : MOCK_EVENTS.filter(e => e.category === filter);

  const formatDateRange = (ev: SDGEvent) => {
    const s = new Date(ev.date + 'T00:00:00');
    const e = new Date(ev.endDate + 'T00:00:00');
    const sm = shortMonths[s.getMonth()];
    if (ev.date === ev.endDate) return `${s.getDate()} ${sm}`;
    const em = shortMonths[e.getMonth()];
    if (sm === em) return `${s.getDate()}-${e.getDate()} ${sm}`;
    return `${s.getDate()} ${sm} - ${e.getDate()} ${em}`;
  };

  /* Calendar helpers */
  const firstDayOfMonth = new Date(calMonth.year, calMonth.month, 1).getDay();
  const daysInMonth = new Date(calMonth.year, calMonth.month + 1, 0).getDate();

  const getEventsForDay = (day: number) => {
    const dateStr = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(ev => dateStr >= ev.date && dateStr <= ev.endDate);
  };

  const prevMonth = () => {
    setCalMonth(prev => prev.month === 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: prev.month - 1 });
  };
  const nextMonth = () => {
    setCalMonth(prev => prev.month === 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: prev.month + 1 });
  };

  const filters: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t('eventsList', 'filterAll') },
    { key: 'camp', label: t('eventsList', 'filterCamp') },
    { key: 'workshop', label: t('eventsList', 'filterWorkshop') },
    { key: 'conference', label: t('eventsList', 'filterConference') },
    { key: 'cafe', label: t('eventsList', 'filterCafe') },
  ];

  return (
    <main className="page-enter">
      {/* ============ Hero ============ */}
      <Section bg="var(--primary)" style={{ paddingBottom: 48, paddingTop: 'calc(var(--nav-height) + 48px)' }}>
        <Container>
          <SectionTag light>{t('eventsList', 'sectionTag')}</SectionTag>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 48px)', color: '#fff', marginBottom: 24 }}>
            {t('eventsList', 'allEvents')}
          </h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className={`btn btn-sm ${view === 'list' ? 'btn-white' : ''}`}
              onClick={() => setView('list')}
              style={view !== 'list' ? { color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.2)' } : {}}
            >
              {t('eventsList', 'list')}
            </button>
            <button
              className={`btn btn-sm ${view === 'calendar' ? 'btn-white' : ''}`}
              onClick={() => setView('calendar')}
              style={view !== 'calendar' ? { color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.2)' } : {}}
            >
              <Calendar size={14} />
              {t('eventsList', 'calendar')}
            </button>
          </div>
        </Container>
      </Section>

      {/* ============ Filter Bar ============ */}
      <div style={{
        position: 'sticky', top: 'var(--nav-height)', zIndex: 100,
        background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      }}>
        <Container>
          <div style={{ display: 'flex', gap: 8, padding: '14px 0', overflowX: 'auto' }}>
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 20,
                  whiteSpace: 'nowrap',
                  border: `1.5px solid ${filter === f.key ? 'var(--primary)' : 'var(--border)'}`,
                  background: filter === f.key ? 'var(--primary)' : 'transparent',
                  color: filter === f.key ? '#fff' : 'var(--text-secondary)',
                  transition: 'all var(--transition)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ============ Content ============ */}
      <Section bg="var(--bg-warm)">
        <Container>
          {/* ----- List View ----- */}
          {view === 'list' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 24,
            }}>
              {filteredEvents.map(ev => {
                const catStyle = getCategoryStyle(ev.category);
                return (
                  <div
                    key={ev.id}
                    className="card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedEvent(ev)}
                  >
                    <ImagePlaceholder
                      label={lang === 'en' ? ev.nameEn : ev.name}
                      aspectRatio="16/10"
                      style={{ borderRadius: 0 }}
                    />
                    <div style={{ padding: 20 }}>
                      {/* Category badge + spots warning */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <span
                          className="badge"
                          style={{ background: catStyle.bg, color: catStyle.color }}
                        >
                          {getCategoryLabel(ev.category, lang)}
                        </span>
                        {ev.spotsLeft <= 10 && ev.spotsLeft > 0 && (
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--error)' }}>
                            {ev.spotsLeft} {t('eventsList', 'spotsLeft')}
                          </span>
                        )}
                        {ev.spotsLeft === 0 && (
                          <span className="badge badge-error">{t('eventsList', 'soldOut')}</span>
                        )}
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 4 }}>
                        {lang === 'en' ? ev.nameEn : ev.name}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 14 }}>
                        {lang === 'en' ? ev.subtitleEn : ev.subtitle}
                      </p>

                      {/* Info row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Calendar size={14} /> {formatDateRange(ev)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Clock size={14} /> {ev.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <MapPin size={14} /> {ev.location}
                        </span>
                      </div>

                      {/* Price + register */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--primary)' }}>
                          {ev.price === 0 ? t('eventsList', 'free') : `R$ ${ev.price}`}
                        </span>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedEvent(ev);
                            setShowRegistration(true);
                          }}
                        >
                          {t('eventsList', 'register')}
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ----- Calendar View ----- */}
          {view === 'calendar' && (
            <div style={{ background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
              {/* Month nav */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 24px', borderBottom: '1px solid var(--border)',
              }}>
                <button onClick={prevMonth} style={{ padding: 8, borderRadius: 4, display: 'flex' }}>
                  <ChevronLeft size={20} color="var(--primary)" />
                </button>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>
                  {monthNames[calMonth.month]} {calMonth.year}
                </h3>
                <button onClick={nextMonth} style={{ padding: 8, borderRadius: 4, display: 'flex' }}>
                  <ChevronRight size={20} color="var(--primary)" />
                </button>
              </div>

              {/* Day headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {dayNames.map(d => (
                  <div key={d} style={{
                    padding: '10px 4px', textAlign: 'center', fontSize: 12, fontWeight: 600,
                    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {/* Empty cells for offset */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ minHeight: 90, borderBottom: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)' }} />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const isToday = day === now.getDate() && calMonth.month === now.getMonth() && calMonth.year === now.getFullYear();
                  return (
                    <div
                      key={day}
                      style={{
                        minHeight: 90,
                        padding: '6px 8px',
                        borderBottom: '1px solid var(--border-light)',
                        borderRight: '1px solid var(--border-light)',
                        background: isToday ? 'var(--primary-50)' : 'transparent',
                      }}
                    >
                      <span style={{
                        fontSize: 13,
                        fontWeight: isToday ? 700 : 400,
                        color: isToday ? 'var(--primary)' : 'var(--text-secondary)',
                      }}>
                        {day}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                        {dayEvents.map(ev => {
                          const cs = getCategoryStyle(ev.category);
                          return (
                            <button
                              key={ev.id}
                              onClick={() => setSelectedEvent(ev)}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '2px 6px',
                                fontSize: 11,
                                fontWeight: 600,
                                borderRadius: 3,
                                background: cs.bg,
                                color: cs.color,
                                textAlign: 'left',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                              }}
                            >
                              {lang === 'en' ? ev.nameEn : ev.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* ============ Event Detail Modal ============ */}
      {selectedEvent && !showRegistration && (
        <div className="overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal" style={{ maxWidth: 620, padding: 0 }} onClick={e => e.stopPropagation()}>
            <ImagePlaceholder
              label={lang === 'en' ? selectedEvent.nameEn : selectedEvent.name}
              aspectRatio="16/9"
              style={{ borderRadius: '12px 12px 0 0' }}
            />
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span
                  className="badge"
                  style={{
                    background: getCategoryStyle(selectedEvent.category).bg,
                    color: getCategoryStyle(selectedEvent.category).color,
                  }}
                >
                  {getCategoryLabel(selectedEvent.category, lang)}
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, marginBottom: 8 }}>
                {lang === 'en' ? selectedEvent.nameEn : selectedEvent.name}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                {lang === 'en' ? selectedEvent.descriptionEn : selectedEvent.description}
              </p>

              {/* Info grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
                padding: 20, background: 'var(--bg-warm)', borderRadius: 8, marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={18} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t('eventsList', 'date')}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{formatDateRange(selectedEvent)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Clock size={18} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t('eventsList', 'time')}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{selectedEvent.time}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={18} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t('eventsList', 'location')}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{selectedEvent.location}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Users size={18} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t('eventsList', 'spots')}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {selectedEvent.spotsLeft} / {selectedEvent.spots}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                  {t('eventsList', 'price')}
                </span>
                <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--primary)' }}>
                  {selectedEvent.price === 0 ? t('eventsList', 'free') : `R$ ${selectedEvent.price}`}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button className="btn btn-outline" onClick={() => setSelectedEvent(null)} style={{ flex: 1 }}>
                  <X size={16} /> {t('registration', 'close')}
                </button>
                <button className="btn btn-primary" onClick={() => setShowRegistration(true)} style={{ flex: 1 }}>
                  {t('eventsList', 'register')} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ Registration Modal ============ */}
      {selectedEvent && showRegistration && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => { setShowRegistration(false); setSelectedEvent(null); }}
          onComplete={() => { setShowRegistration(false); setSelectedEvent(null); }}
        />
      )}
    </main>
  );
}
