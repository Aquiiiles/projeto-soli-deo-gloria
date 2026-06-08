'use client';

import { useState } from 'react';
import { useT, useLang } from '@/lib/i18n';
import {
  getCategoryLabel,
  type SDGEvent,
  type Registration,
} from '@/lib/data';
import { useStore } from '@/lib/store';
import Container from '@/components/Container';
import Toast from '@/components/Toast';
import {
  BarChart3,
  Calendar,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  DollarSign,
} from 'lucide-react';

type Tab = 'dashboard' | 'events' | 'registrations' | 'settings';

const SHORT_MONTHS_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const SHORT_MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatShortDate(dateStr: string, lang: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const months = lang === 'en' ? SHORT_MONTHS_EN : SHORT_MONTHS_PT;
  return { day: d.getDate(), month: months[d.getMonth()] };
}

function formatFullDate(dateStr: string, lang: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const months = lang === 'en' ? SHORT_MONTHS_EN : SHORT_MONTHS_PT;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/* ============================== */
/*        Event Form Modal        */
/* ============================== */

interface EventFormModalProps {
  event: SDGEvent | null;
  onSave: (evt: SDGEvent) => void;
  onClose: () => void;
}

function EventFormModal({ event, onSave, onClose }: EventFormModalProps) {
  const t = useT();
  const lang = useLang();

  const blank: SDGEvent = {
    id: Date.now(),
    name: '',
    nameEn: '',
    subtitle: '',
    subtitleEn: '',
    date: '',
    endDate: '',
    time: '',
    category: 'conference',
    price: 0,
    spots: 0,
    spotsLeft: 0,
    location: '',
    description: '',
    descriptionEn: '',
    image: null,
  };

  const [form, setForm] = useState<SDGEvent>(event ?? blank);

  const set = (key: keyof SDGEvent, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, spotsLeft: event ? form.spotsLeft : form.spots });
  };

  const categories: SDGEvent['category'][] = ['conference', 'camp', 'workshop', 'cafe'];

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ maxWidth: 600 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <h3 style={{ fontSize: 20, color: 'var(--primary)' }}>
            {event ? t('admin', 'editEvent') : t('admin', 'createEvent')}
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {/* Name PT */}
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventName')} (PT)</label>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
              />
            </div>
            {/* Name EN */}
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventName')} (EN)</label>
              <input
                className="form-input"
                value={form.nameEn}
                onChange={(e) => set('nameEn', e.target.value)}
                required
              />
            </div>

            {/* Subtitle PT */}
            <div className="form-group">
              <label className="form-label">Subtitle (PT)</label>
              <input
                className="form-input"
                value={form.subtitle}
                onChange={(e) => set('subtitle', e.target.value)}
              />
            </div>
            {/* Subtitle EN */}
            <div className="form-group">
              <label className="form-label">Subtitle (EN)</label>
              <input
                className="form-input"
                value={form.subtitleEn}
                onChange={(e) => set('subtitleEn', e.target.value)}
              />
            </div>
          </div>

          {/* Date / End Date / Time - 3 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
              marginTop: 16,
            }}
          >
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventDate')}</label>
              <input
                type="date"
                className="form-input"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventDate')} (End)</label>
              <input
                type="date"
                className="form-input"
                value={form.endDate}
                onChange={(e) => set('endDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventTime')}</label>
              <input
                type="time"
                className="form-input"
                value={form.time}
                onChange={(e) => set('time', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Category / Price / Spots - 3 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
              marginTop: 16,
            }}
          >
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventCategory')}</label>
              <select
                className="form-input"
                value={form.category}
                onChange={(e) =>
                  set('category', e.target.value as SDGEvent['category'])
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryLabel(cat, lang)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventPrice')}</label>
              <input
                type="number"
                className="form-input"
                value={form.price}
                onChange={(e) => set('price', Number(e.target.value))}
                min={0}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('admin', 'eventSpots')}</label>
              <input
                type="number"
                className="form-input"
                value={form.spots}
                onChange={(e) => set('spots', Number(e.target.value))}
                min={0}
              />
            </div>
          </div>

          {/* Location - full width */}
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">{t('eventsList', 'location')}</label>
            <input
              className="form-input"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
            />
          </div>

          {/* Description PT */}
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">{t('admin', 'eventDescription')} (PT)</label>
            <textarea
              className="form-input"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 12,
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--border)',
            }}
          >
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
              {t('admin', 'cancel')}
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              {t('admin', 'save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================== */
/*          Admin Page            */
/* ============================== */

export default function AdminPage() {
  const t = useT();
  const lang = useLang();
  const { events, addEvent, updateEvent, deleteEvent, registrations, updateRegistrationStatus, settings, updateSettings } = useStore();

  const [tab, setTab] = useState<Tab>('dashboard');
  const [editEvent, setEditEvent] = useState<SDGEvent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [localSettings, setLocalSettings] = useState(settings);

  /* helpers */
  const eventById = (id: number) => events.find((e) => e.id === id);

  const revenue = registrations
    .filter((r) => r.status === 'confirmed')
    .reduce((sum, r) => {
      const ev = eventById(r.eventId);
      return sum + (ev ? ev.price : 0);
    }, 0);

  const handleSaveEvent = (eventData: SDGEvent) => {
    if (editEvent) {
      updateEvent(eventData.id, eventData);
    } else {
      const { id: _id, ...rest } = eventData;
      addEvent(rest);
    }
    setShowForm(false);
    setEditEvent(null);
    setToast(lang === 'pt' ? 'Evento salvo com sucesso' : 'Event saved successfully');
  };

  const handleDeleteEvent = (id: number) => {
    deleteEvent(id);
    setToast(t('admin', 'deleteEvent') + ' - OK');
  };

  const handleConfirmReg = (id: number) => {
    updateRegistrationStatus(id, 'confirmed');
  };

  const handleCancelReg = (id: number) => {
    updateRegistrationStatus(id, 'cancelled');
  };

  /* sidebar items */
  const sidebarItems: { key: Tab; icon: React.ReactNode; label: string }[] = [
    { key: 'dashboard', icon: <BarChart3 size={18} />, label: t('admin', 'dashboard') },
    { key: 'events', icon: <Calendar size={18} />, label: t('admin', 'events') },
    { key: 'registrations', icon: <Users size={18} />, label: t('admin', 'registrations') },
    { key: 'settings', icon: <Settings size={18} />, label: t('admin', 'settings') },
  ];

  const statusBadge = (status: Registration['status']) => {
    const map: Record<string, { bg: string; color: string; label: string }> = {
      confirmed: { bg: '#E8F5EE', color: 'var(--success)', label: t('admin', 'confirmed') },
      pending: { bg: '#FFF8E8', color: 'var(--warning)', label: t('admin', 'pending') },
      cancelled: { bg: '#FDEAEA', color: 'var(--error)', label: t('admin', 'cancelled') },
    };
    const s = map[status];
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '3px 10px',
          borderRadius: 3,
          fontSize: 12,
          fontWeight: 600,
          background: s.bg,
          color: s.color,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {s.label}
      </span>
    );
  };

  /* ---- Render tabs ---- */

  const renderDashboard = () => (
    <div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {/* Total Events */}
        <div
          className="card"
          style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}
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
              color: 'var(--primary)',
            }}
          >
            <Calendar size={22} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('admin', 'totalEvents')}
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--primary)' }}>{events.length}</div>
          </div>
        </div>

        {/* Total Registrations */}
        <div
          className="card"
          style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: '#E8F5EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--success)',
            }}
          >
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('admin', 'totalRegistrations')}
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--success)' }}>{registrations.length}</div>
          </div>
        </div>

        {/* Revenue */}
        <div
          className="card"
          style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: '#FFF3E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
            }}
          >
            <DollarSign size={22} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('admin', 'revenue')}
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--accent-dark)' }}>
              R$ {revenue.toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </div>

      {/* Recent registrations table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: 16, color: 'var(--primary)' }}>
            {t('admin', 'registrations')}
          </h4>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>{t('registration', 'name')}</th>
              <th>{t('admin', 'events')}</th>
              <th>{t('admin', 'status')}</th>
              <th>{t('admin', 'eventDate')}</th>
            </tr>
          </thead>
          <tbody>
            {registrations.slice(0, 5).map((r) => {
              const ev = eventById(r.eventId);
              return (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.name}</td>
                  <td>{ev ? (lang === 'en' ? ev.nameEn : ev.name) : '-'}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{formatFullDate(r.date, lang)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h3 style={{ fontSize: 22, color: 'var(--primary)' }}>{t('admin', 'events')}</h3>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setEditEvent(null);
            setShowForm(true);
          }}
        >
          <Plus size={16} />
          {t('admin', 'createEvent')}
        </button>
      </div>

      {/* Event list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map((ev) => {
          const { day, month } = formatShortDate(ev.date, lang);
          return (
            <div
              key={ev.id}
              className="card"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Date badge */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 8,
                  background: 'var(--primary-50)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>
                  {day}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary-light)', textTransform: 'uppercase' }}>
                  {month}
                </span>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>
                  {lang === 'en' ? ev.nameEn : ev.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 16, marginTop: 2 }}>
                  <span>{ev.time}h</span>
                  <span>{ev.spots} {t('eventsList', 'spots')}</span>
                  <span>
                    {ev.price === 0
                      ? t('eventsList', 'free')
                      : `R$ ${ev.price}`}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => {
                    setEditEvent(ev);
                    setShowForm(true);
                  }}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    background: 'var(--primary-50)',
                    transition: 'background var(--transition)',
                  }}
                  title={t('admin', 'editEvent')}
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--error)',
                    background: '#FDEAEA',
                    transition: 'background var(--transition)',
                  }}
                  title={t('admin', 'deleteEvent')}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderRegistrations = () => (
    <div>
      <h3 style={{ fontSize: 22, color: 'var(--primary)', marginBottom: 24 }}>
        {t('admin', 'registrations')}
      </h3>
      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>{t('registration', 'name')}</th>
              <th>{t('registration', 'email')}</th>
              <th>{t('admin', 'events')}</th>
              <th>{t('registration', 'church')}</th>
              <th>{t('admin', 'status')}</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => {
              const ev = eventById(r.eventId);
              return (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.email}</td>
                  <td>{ev ? (lang === 'en' ? ev.nameEn : ev.name) : '-'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.church}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      {r.status !== 'confirmed' && (
                        <button
                          onClick={() => handleConfirmReg(r.id)}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--success)',
                            background: '#E8F5EE',
                          }}
                          title={t('admin', 'confirm')}
                        >
                          <Check size={15} />
                        </button>
                      )}
                      {r.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancelReg(r.id)}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--error)',
                            background: '#FDEAEA',
                          }}
                          title={t('admin', 'cancel')}
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <h3 style={{ fontSize: 22, color: 'var(--primary)', marginBottom: 24 }}>
        {t('admin', 'settings')}
      </h3>
      <div className="card" style={{ padding: 32 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSettings(localSettings);
            setToast(lang === 'pt' ? 'Configurações salvas' : 'Settings saved');
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input
                className="form-input"
                value={localSettings.projectName}
                onChange={(e) => setLocalSettings({ ...localSettings, projectName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input
                className="form-input"
                type="email"
                value={localSettings.contactEmail}
                onChange={(e) => setLocalSettings({ ...localSettings, contactEmail: e.target.value })}
                placeholder="contato@sdg.org.br"
              />
            </div>
            <div className="form-group">
              <label className="form-label">PIX Key</label>
              <input
                className="form-input"
                value={localSettings.pixKey}
                onChange={(e) => setLocalSettings({ ...localSettings, pixKey: e.target.value })}
                placeholder="chave@pix"
              />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp</label>
              <input
                className="form-input"
                value={localSettings.whatsapp}
                onChange={(e) => setLocalSettings({ ...localSettings, whatsapp: e.target.value })}
                placeholder="(81) 99999-0000"
              />
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <button type="submit" className="btn btn-primary">
              {t('admin', 'save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const contentMap: Record<Tab, () => React.ReactNode> = {
    dashboard: renderDashboard,
    events: renderEvents,
    registrations: renderRegistrations,
    settings: renderSettings,
  };

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      {/* Admin Header */}
      <div style={{ background: 'var(--primary)', padding: '20px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 26,
                fontWeight: 500,
                color: '#fff',
              }}
            >
              Painel Administrativo
            </h1>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600,
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Admin
            </span>
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: 32,
            paddingTop: 32,
            paddingBottom: 60,
          }}
        >
          {/* Sidebar */}
          <aside>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sidebarItems.map((item) => {
                const isActive = tab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 14px',
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                      background: isActive ? '#fff' : 'transparent',
                      boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all var(--transition)',
                      textAlign: 'left',
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main>{contentMap[tab]()}</main>
        </div>
      </Container>

      {/* Form modal */}
      {showForm && (
        <EventFormModal
          event={editEvent}
          onSave={handleSaveEvent}
          onClose={() => {
            setShowForm(false);
            setEditEvent(null);
          }}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
