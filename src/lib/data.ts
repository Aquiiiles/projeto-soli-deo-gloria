export interface SDGEvent {
  id: number;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  date: string;
  endDate: string;
  time: string;
  category: 'conference' | 'camp' | 'workshop' | 'cafe';
  price: number;
  spots: number;
  spotsLeft: number;
  location: string;
  description: string;
  descriptionEn: string;
  image: string | null;
}

export interface Registration {
  id: number;
  eventId: number;
  name: string;
  email: string;
  phone: string;
  church: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  date: string;
}

export interface TeamMember {
  name: string;
  role: string;
  roleEn: string;
  bio: string;
}

export const MOCK_EVENTS: SDGEvent[] = [
  {
    id: 1,
    name: 'EBRAN 2025',
    nameEn: 'EBRAN 2025',
    subtitle: 'Encontro Bíblico Reformado de Apologética no Nordeste',
    subtitleEn: 'Reformed Biblical Apologetics Meeting of the Northeast',
    date: '2025-03-15',
    endDate: '2025-03-17',
    time: '08:00',
    category: 'conference',
    price: 180,
    spots: 120,
    spotsLeft: 34,
    location: 'Monte Moriah - Aldeia, PE',
    description: 'O EBRAN é um encontro anual que reúne cristãos reformados para palestras, debates e comunhão em torno da apologética bíblica.',
    descriptionEn: 'EBRAN is an annual meeting that brings together reformed Christians for lectures, debates, and fellowship around biblical apologetics.',
    image: null
  },
  {
    id: 2,
    name: 'English Camp',
    nameEn: 'English Camp',
    subtitle: 'Acampamento de Férias em Inglês',
    subtitleEn: 'English Vacation Camp',
    date: '2025-07-10',
    endDate: '2025-07-14',
    time: '08:00',
    category: 'camp',
    price: 350,
    spots: 60,
    spotsLeft: 18,
    location: 'Projeto SDG - Aldeia, PE',
    description: 'Uma semana inteira de atividades, jogos e estudos bíblicos, tudo em inglês! Perfeito para jovens que querem praticar o idioma em um ambiente cristão.',
    descriptionEn: 'A whole week of activities, games, and Bible studies, all in English! Perfect for young people who want to practice the language in a Christian environment.',
    image: null
  },
  {
    id: 3,
    name: 'Futuros Homens',
    nameEn: 'Future Men',
    subtitle: 'Forjando Líderes Valentes na Fé',
    subtitleEn: 'Forging Courageous Leaders in Faith',
    date: '2025-09-20',
    endDate: '2025-09-22',
    time: '07:00',
    category: 'camp',
    price: 250,
    spots: 40,
    spotsLeft: 40,
    location: 'Monte Moriah - Aldeia, PE',
    description: 'Um retiro para rapazes focado em liderança, caráter e fé reformada. Inclui trilhas, atividades ao ar livre e estudos bíblicos intensivos.',
    descriptionEn: 'A retreat for young men focused on leadership, character, and reformed faith. Includes trails, outdoor activities, and intensive Bible studies.',
    image: null
  },
  {
    id: 4,
    name: 'Workshop Educação Cristã',
    nameEn: 'Christian Education Workshop',
    subtitle: 'Famílias Educadoras',
    subtitleEn: 'Homeschool Families',
    date: '2025-05-10',
    endDate: '2025-05-10',
    time: '09:00',
    category: 'workshop',
    price: 80,
    spots: 50,
    spotsLeft: 12,
    location: 'Projeto SDG - Aldeia, PE',
    description: 'Workshop para famílias que praticam ou desejam praticar a educação domiciliar cristã. Palestras, troca de experiências e recursos.',
    descriptionEn: 'Workshop for families who practice or wish to practice Christian homeschooling. Lectures, sharing experiences, and resources.',
    image: null
  },
  {
    id: 5,
    name: 'Café Especial de Natal',
    nameEn: 'Christmas Special Café',
    subtitle: 'Edição especial natalina do Café SDG',
    subtitleEn: 'Christmas special edition of Café SDG',
    date: '2025-12-13',
    endDate: '2025-12-13',
    time: '14:00',
    category: 'cafe',
    price: 0,
    spots: 80,
    spotsLeft: 55,
    location: 'Café Soli Deo Gloria',
    description: 'Edição especial de Natal do nosso querido café. Entrada gratuita, consumo no local.',
    descriptionEn: 'Christmas special edition of our beloved café. Free entry, local consumption.',
    image: null
  },
  {
    id: 6,
    name: 'Conferência de Aconselhamento Bíblico',
    nameEn: 'Biblical Counseling Conference',
    subtitle: 'Suficiência das Escrituras no Aconselhamento',
    subtitleEn: 'Sufficiency of Scripture in Counseling',
    date: '2025-08-23',
    endDate: '2025-08-24',
    time: '08:30',
    category: 'conference',
    price: 120,
    spots: 100,
    spotsLeft: 67,
    location: 'Monte Moriah - Aldeia, PE',
    description: 'Conferência sobre a suficiência das Escrituras aplicada ao aconselhamento bíblico. Com palestrantes renomados da tradição reformada.',
    descriptionEn: 'Conference on the sufficiency of Scripture applied to biblical counseling. With renowned speakers from the reformed tradition.',
    image: null
  }
];

export const MOCK_TEAM: TeamMember[] = [
  { name: 'Douglas Leaman', role: 'pastor', roleEn: 'pastor', bio: 'Pastor e fundador do Projeto Soli Deo Gloria. Chegou ao Brasil em 2013 para servir na pregação e ensino com foco em aconselhamento bíblico.' },
  { name: 'Sarah Leaman', role: 'wife', roleEn: 'wife', bio: 'Co-fundadora do projeto. Serve ao lado de Douglas na missão em Aldeia, cuidando especialmente das famílias e crianças da comunidade.' },
  { name: 'João Silva', role: 'coordinator', roleEn: 'coordinator', bio: 'Coordenador do Instituto de Tecnologia e Teologia. Responsável pela gestão acadêmica e administrativa do programa.' },
  { name: 'Maria Santos', role: 'coordinator', roleEn: 'coordinator', bio: 'Coordenadora de eventos e acampamentos. Cuida da logística e organização de todas as atividades do projeto.' }
];

export const MOCK_REGISTRATIONS: Registration[] = [
  { id: 1, eventId: 1, name: 'Ana Costa', email: 'ana@email.com', phone: '(81) 99999-1111', church: 'IPB Recife', status: 'confirmed', date: '2025-01-15' },
  { id: 2, eventId: 1, name: 'Pedro Lima', email: 'pedro@email.com', phone: '(81) 99999-2222', church: 'IPR Olinda', status: 'confirmed', date: '2025-01-16' },
  { id: 3, eventId: 2, name: 'Lucas Ferreira', email: 'lucas@email.com', phone: '(81) 99999-3333', church: 'IPC Boa Viagem', status: 'pending', date: '2025-02-01' },
  { id: 4, eventId: 1, name: 'Mariana Alves', email: 'mariana@email.com', phone: '(81) 99999-4444', church: 'IPB Casa Forte', status: 'confirmed', date: '2025-01-20' },
  { id: 5, eventId: 4, name: 'Gabriel Souza', email: 'gabriel@email.com', phone: '(81) 99999-5555', church: 'IPR Paulista', status: 'pending', date: '2025-02-05' }
];

export function getCategoryStyle(cat: string) {
  const map: Record<string, { bg: string; color: string }> = {
    conference: { bg: '#EDF3F5', color: '#14404E' },
    camp: { bg: '#E8F5EE', color: '#2E7D5B' },
    workshop: { bg: '#FFF3E8', color: '#A87A52' },
    cafe: { bg: '#F5EDE4', color: '#8B6E54' }
  };
  return map[cat] || map.conference;
}

export function getCategoryLabel(cat: string, lang: string) {
  const labels: Record<string, Record<string, string>> = {
    pt: { conference: 'Conferência', camp: 'Acampamento', workshop: 'Workshop', cafe: 'Café' },
    en: { conference: 'Conference', camp: 'Camp', workshop: 'Workshop', cafe: 'Café' }
  };
  return (labels[lang] || labels.pt)[cat] || cat;
}
