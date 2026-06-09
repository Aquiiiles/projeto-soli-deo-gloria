'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { MOCK_EVENTS, MOCK_REGISTRATIONS, MOCK_TEAM, type SDGEvent, type Registration, type TeamMember } from './data';

interface StoreContextType {
  events: SDGEvent[];
  addEvent: (event: Omit<SDGEvent, 'id'>) => Promise<SDGEvent>;
  updateEvent: (id: number, event: Partial<SDGEvent>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  getEvent: (id: number) => SDGEvent | undefined;

  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, 'id' | 'date'>) => Promise<Registration>;
  updateRegistrationStatus: (id: number, status: Registration['status']) => Promise<void>;
  getRegistrationsByEvent: (eventId: number) => Registration[];

  team: TeamMember[];
  addTeamMember: (member: TeamMember) => Promise<void>;
  updateTeamMember: (index: number, member: TeamMember) => Promise<void>;
  deleteTeamMember: (index: number) => Promise<void>;

  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
}

export interface SiteSettings {
  projectName: string;
  contactEmail: string;
  pixKey: string;
  whatsapp: string;
  address: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  projectName: 'Projeto Soli Deo Gloria',
  contactEmail: 'contato@projetosolideogloria.com',
  pixKey: 'projeto@solideogloria.com',
  whatsapp: '+55 (81) 99999-9999',
  address: 'Alameda Pau Ferro, 835\nGuabiraba, Recife - PE\n54789-770',
};

const StoreContext = createContext<StoreContextType | null>(null);

async function apiFetch<T>(url: string, opts?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<SDGEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [team, setTeam] = useState<(TeamMember & { id?: number })[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  const [useApi, setUseApi] = useState(false);

  useEffect(() => {
    async function init() {
      const apiEvents = await apiFetch<SDGEvent[]>('/api/events');
      if (apiEvents) {
        setUseApi(true);
        setEvents(apiEvents);
        const [apiRegs, apiTeam, apiSettings] = await Promise.all([
          apiFetch<Registration[]>('/api/registrations'),
          apiFetch<(TeamMember & { id?: number })[]>('/api/team'),
          apiFetch<SiteSettings>('/api/settings'),
        ]);
        setRegistrations(apiRegs || []);
        setTeam(apiTeam || []);
        if (apiSettings) setSettings(apiSettings);
      } else {
        setEvents(MOCK_EVENTS);
        setRegistrations(MOCK_REGISTRATIONS);
        setTeam(MOCK_TEAM);
      }
      setLoaded(true);
    }
    init();
  }, []);

  // --- Events ---
  const addEvent = useCallback(async (event: Omit<SDGEvent, 'id'>): Promise<SDGEvent> => {
    if (useApi) {
      const created = await apiFetch<SDGEvent>('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (created) {
        setEvents(prev => [...prev, created]);
        return created;
      }
    }
    const newEvent: SDGEvent = { ...event, id: Date.now() } as SDGEvent;
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, [useApi]);

  const updateEvent = useCallback(async (id: number, updates: Partial<SDGEvent>) => {
    if (useApi) {
      const updated = await apiFetch<SDGEvent>(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (updated) {
        setEvents(prev => prev.map(e => e.id === id ? updated : e));
        return;
      }
    }
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, [useApi]);

  const deleteEvent = useCallback(async (id: number) => {
    if (useApi) {
      await apiFetch(`/api/events/${id}`, { method: 'DELETE' });
    }
    setEvents(prev => prev.filter(e => e.id !== id));
  }, [useApi]);

  const getEvent = useCallback((id: number) => {
    return events.find(e => e.id === id);
  }, [events]);

  // --- Registrations ---
  const addRegistration = useCallback(async (reg: Omit<Registration, 'id' | 'date'>): Promise<Registration> => {
    if (useApi) {
      const created = await apiFetch<Registration>('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reg),
      });
      if (created) {
        setRegistrations(prev => [...prev, created]);
        setEvents(prev => prev.map(e =>
          e.id === reg.eventId && e.spotsLeft > 0
            ? { ...e, spotsLeft: e.spotsLeft - 1 }
            : e
        ));
        return created;
      }
    }
    const newReg: Registration = {
      ...reg,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setRegistrations(prev => [...prev, newReg]);
    setEvents(prev => prev.map(e =>
      e.id === reg.eventId && e.spotsLeft > 0
        ? { ...e, spotsLeft: e.spotsLeft - 1 }
        : e
    ));
    return newReg;
  }, [useApi]);

  const updateRegistrationStatus = useCallback(async (id: number, status: Registration['status']) => {
    if (useApi) {
      await apiFetch(`/api/registrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    }
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, [useApi]);

  const getRegistrationsByEvent = useCallback((eventId: number) => {
    return registrations.filter(r => r.eventId === eventId);
  }, [registrations]);

  // --- Team ---
  const addTeamMember = useCallback(async (member: TeamMember) => {
    if (useApi) {
      const created = await apiFetch<TeamMember & { id?: number }>('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      if (created) {
        setTeam(prev => [...prev, created]);
        return;
      }
    }
    setTeam(prev => [...prev, member]);
  }, [useApi]);

  const updateTeamMember = useCallback(async (index: number, member: TeamMember) => {
    if (useApi) {
      const existing = team[index] as TeamMember & { id?: number };
      if (existing?.id) {
        await apiFetch(`/api/team/${existing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member),
        });
      }
    }
    setTeam(prev => prev.map((m, i) => i === index ? { ...m, ...member } : m));
  }, [useApi, team]);

  const deleteTeamMember = useCallback(async (index: number) => {
    if (useApi) {
      const existing = team[index] as TeamMember & { id?: number };
      if (existing?.id) {
        await apiFetch(`/api/team/${existing.id}`, { method: 'DELETE' });
      }
    }
    setTeam(prev => prev.filter((_, i) => i !== index));
  }, [useApi, team]);

  // --- Settings ---
  const updateSettings = useCallback(async (updates: Partial<SiteSettings>) => {
    if (useApi) {
      const updated = await apiFetch<SiteSettings>('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (updated) {
        setSettings(updated);
        return;
      }
    }
    setSettings(prev => ({ ...prev, ...updates }));
  }, [useApi]);

  if (!loaded) {
    return null;
  }

  return (
    <StoreContext.Provider value={{
      events, addEvent, updateEvent, deleteEvent, getEvent,
      registrations, addRegistration, updateRegistrationStatus, getRegistrationsByEvent,
      team, addTeamMember, updateTeamMember, deleteTeamMember,
      settings, updateSettings,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
