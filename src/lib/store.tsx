'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { MOCK_EVENTS, MOCK_REGISTRATIONS, MOCK_TEAM, type SDGEvent, type Registration, type TeamMember } from './data';

interface StoreContextType {
  // Events
  events: SDGEvent[];
  addEvent: (event: Omit<SDGEvent, 'id'>) => SDGEvent;
  updateEvent: (id: number, event: Partial<SDGEvent>) => void;
  deleteEvent: (id: number) => void;
  getEvent: (id: number) => SDGEvent | undefined;

  // Registrations
  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, 'id' | 'date'>) => Registration;
  updateRegistrationStatus: (id: number, status: Registration['status']) => void;
  getRegistrationsByEvent: (eventId: number) => Registration[];

  // Team
  team: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (index: number, member: TeamMember) => void;
  deleteTeamMember: (index: number) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
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

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage might be full or unavailable
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<SDGEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setEvents(loadFromStorage('sdg_events', MOCK_EVENTS));
    setRegistrations(loadFromStorage('sdg_registrations', MOCK_REGISTRATIONS));
    setTeam(loadFromStorage('sdg_team', MOCK_TEAM));
    setSettings(loadFromStorage('sdg_settings', DEFAULT_SETTINGS));
    setLoaded(true);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (loaded) saveToStorage('sdg_events', events);
  }, [events, loaded]);

  useEffect(() => {
    if (loaded) saveToStorage('sdg_registrations', registrations);
  }, [registrations, loaded]);

  useEffect(() => {
    if (loaded) saveToStorage('sdg_team', team);
  }, [team, loaded]);

  useEffect(() => {
    if (loaded) saveToStorage('sdg_settings', settings);
  }, [settings, loaded]);

  // Event CRUD
  const addEvent = useCallback((event: Omit<SDGEvent, 'id'>): SDGEvent => {
    const newEvent: SDGEvent = { ...event, id: Date.now() } as SDGEvent;
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((id: number, updates: Partial<SDGEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const deleteEvent = useCallback((id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const getEvent = useCallback((id: number) => {
    return events.find(e => e.id === id);
  }, [events]);

  // Registration CRUD
  const addRegistration = useCallback((reg: Omit<Registration, 'id' | 'date'>): Registration => {
    const newReg: Registration = {
      ...reg,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setRegistrations(prev => [...prev, newReg]);
    // Decrease spots left on the event
    setEvents(prev => prev.map(e =>
      e.id === reg.eventId && e.spotsLeft > 0
        ? { ...e, spotsLeft: e.spotsLeft - 1 }
        : e
    ));
    return newReg;
  }, []);

  const updateRegistrationStatus = useCallback((id: number, status: Registration['status']) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, []);

  const getRegistrationsByEvent = useCallback((eventId: number) => {
    return registrations.filter(r => r.eventId === eventId);
  }, [registrations]);

  // Team CRUD
  const addTeamMember = useCallback((member: TeamMember) => {
    setTeam(prev => [...prev, member]);
  }, []);

  const updateTeamMember = useCallback((index: number, member: TeamMember) => {
    setTeam(prev => prev.map((m, i) => i === index ? member : m));
  }, []);

  const deleteTeamMember = useCallback((index: number) => {
    setTeam(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Settings
  const updateSettings = useCallback((updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Don't render children until data is loaded from localStorage
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
