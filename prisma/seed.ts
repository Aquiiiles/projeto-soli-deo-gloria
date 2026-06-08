import { PrismaClient, EventCategory, RegistrationStatus } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter }) as unknown as import('../src/generated/prisma/client').PrismaClient;

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.settings.deleteMany();

  // Create settings
  await prisma.settings.create({
    data: {
      id: 1,
      projectName: 'Projeto Soli Deo Gloria',
      contactEmail: 'contato@projetosolideogloria.com',
      pixKey: 'projeto@solideogloria.com',
      whatsapp: '+55 (81) 99999-9999',
      address: 'Alameda Pau Ferro, 835\nGuabiraba, Recife - PE\n54789-770',
    },
  });

  // Create events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        name: 'EBRAN 2025',
        nameEn: 'EBRAN 2025',
        subtitle: 'Encontro Bíblico Reformado de Apologética no Nordeste',
        subtitleEn: 'Reformed Biblical Apologetics Meeting of the Northeast',
        date: new Date('2025-03-15'),
        endDate: new Date('2025-03-17'),
        time: '08:00',
        category: EventCategory.CONFERENCE,
        price: 180,
        spots: 120,
        spotsLeft: 34,
        location: 'Monte Moriah - Aldeia, PE',
        description: 'O EBRAN é um encontro anual que reúne cristãos reformados para palestras, debates e comunhão em torno da apologética bíblica.',
        descriptionEn: 'EBRAN is an annual meeting that brings together reformed Christians for lectures, debates, and fellowship around biblical apologetics.',
      },
    }),
    prisma.event.create({
      data: {
        name: 'English Camp',
        nameEn: 'English Camp',
        subtitle: 'Acampamento de Férias em Inglês',
        subtitleEn: 'English Vacation Camp',
        date: new Date('2025-07-10'),
        endDate: new Date('2025-07-14'),
        time: '08:00',
        category: EventCategory.CAMP,
        price: 350,
        spots: 60,
        spotsLeft: 18,
        location: 'Projeto SDG - Aldeia, PE',
        description: 'Uma semana inteira de atividades, jogos e estudos bíblicos, tudo em inglês!',
        descriptionEn: 'A whole week of activities, games, and Bible studies, all in English!',
      },
    }),
    prisma.event.create({
      data: {
        name: 'Futuros Homens',
        nameEn: 'Future Men',
        subtitle: 'Forjando Líderes Valentes na Fé',
        subtitleEn: 'Forging Courageous Leaders in Faith',
        date: new Date('2025-09-20'),
        endDate: new Date('2025-09-22'),
        time: '07:00',
        category: EventCategory.CAMP,
        price: 250,
        spots: 40,
        spotsLeft: 40,
        location: 'Monte Moriah - Aldeia, PE',
        description: 'Um retiro para rapazes focado em liderança, caráter e fé reformada.',
        descriptionEn: 'A retreat for young men focused on leadership, character, and reformed faith.',
      },
    }),
    prisma.event.create({
      data: {
        name: 'Workshop Educação Cristã',
        nameEn: 'Christian Education Workshop',
        subtitle: 'Famílias Educadoras',
        subtitleEn: 'Homeschool Families',
        date: new Date('2025-05-10'),
        endDate: new Date('2025-05-10'),
        time: '09:00',
        category: EventCategory.WORKSHOP,
        price: 80,
        spots: 50,
        spotsLeft: 12,
        location: 'Projeto SDG - Aldeia, PE',
        description: 'Workshop para famílias que praticam ou desejam praticar a educação domiciliar cristã.',
        descriptionEn: 'Workshop for families who practice or wish to practice Christian homeschooling.',
      },
    }),
    prisma.event.create({
      data: {
        name: 'Café Especial de Natal',
        nameEn: 'Christmas Special Café',
        subtitle: 'Edição especial natalina do Café SDG',
        subtitleEn: 'Christmas special edition of Café SDG',
        date: new Date('2025-12-13'),
        endDate: new Date('2025-12-13'),
        time: '14:00',
        category: EventCategory.CAFE,
        price: 0,
        spots: 80,
        spotsLeft: 55,
        location: 'Café Soli Deo Gloria',
        description: 'Edição especial de Natal do nosso querido café. Entrada gratuita.',
        descriptionEn: 'Christmas special edition of our beloved café. Free entry.',
      },
    }),
    prisma.event.create({
      data: {
        name: 'Conferência de Aconselhamento Bíblico',
        nameEn: 'Biblical Counseling Conference',
        subtitle: 'Suficiência das Escrituras no Aconselhamento',
        subtitleEn: 'Sufficiency of Scripture in Counseling',
        date: new Date('2025-08-23'),
        endDate: new Date('2025-08-24'),
        time: '08:30',
        category: EventCategory.CONFERENCE,
        price: 120,
        spots: 100,
        spotsLeft: 67,
        location: 'Monte Moriah - Aldeia, PE',
        description: 'Conferência sobre a suficiência das Escrituras aplicada ao aconselhamento bíblico.',
        descriptionEn: 'Conference on the sufficiency of Scripture applied to biblical counseling.',
      },
    }),
  ]);

  // Create team members
  await Promise.all([
    prisma.teamMember.create({
      data: {
        name: 'Douglas Leaman',
        role: 'pastor',
        roleEn: 'pastor',
        bio: 'Pastor e fundador do Projeto Soli Deo Gloria. Chegou ao Brasil em 2013 para servir na pregação e ensino com foco em aconselhamento bíblico.',
        bioEn: 'Pastor and founder of Project Soli Deo Gloria. Arrived in Brazil in 2013 to serve in preaching and teaching with a focus on biblical counseling.',
        order: 1,
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'Sarah Leaman',
        role: 'wife',
        roleEn: 'wife',
        bio: 'Co-fundadora do projeto. Serve ao lado de Douglas na missão em Aldeia, cuidando especialmente das famílias e crianças da comunidade.',
        bioEn: 'Co-founder of the project. Serves alongside Douglas in the mission in Aldeia, caring especially for families and children in the community.',
        order: 2,
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'João Silva',
        role: 'coordinator',
        roleEn: 'coordinator',
        bio: 'Coordenador do Instituto de Tecnologia e Teologia. Responsável pela gestão acadêmica e administrativa do programa.',
        bioEn: 'Coordinator of the Institute of Technology and Theology. Responsible for academic and administrative management of the program.',
        order: 3,
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'Maria Santos',
        role: 'coordinator',
        roleEn: 'coordinator',
        bio: 'Coordenadora de eventos e acampamentos. Cuida da logística e organização de todas as atividades do projeto.',
        bioEn: 'Events and camps coordinator. Takes care of logistics and organization of all project activities.',
        order: 4,
      },
    }),
  ]);

  // Create sample registrations
  await Promise.all([
    prisma.registration.create({
      data: { eventId: events[0].id, name: 'Ana Costa', email: 'ana@email.com', phone: '(81) 99999-1111', church: 'IPB Recife', status: RegistrationStatus.CONFIRMED },
    }),
    prisma.registration.create({
      data: { eventId: events[0].id, name: 'Pedro Lima', email: 'pedro@email.com', phone: '(81) 99999-2222', church: 'IPR Olinda', status: RegistrationStatus.CONFIRMED },
    }),
    prisma.registration.create({
      data: { eventId: events[1].id, name: 'Lucas Ferreira', email: 'lucas@email.com', phone: '(81) 99999-3333', church: 'IPC Boa Viagem', status: RegistrationStatus.PENDING },
    }),
    prisma.registration.create({
      data: { eventId: events[0].id, name: 'Mariana Alves', email: 'mariana@email.com', phone: '(81) 99999-4444', church: 'IPB Casa Forte', status: RegistrationStatus.CONFIRMED },
    }),
    prisma.registration.create({
      data: { eventId: events[3].id, name: 'Gabriel Souza', email: 'gabriel@email.com', phone: '(81) 99999-5555', church: 'IPR Paulista', status: RegistrationStatus.PENDING },
    }),
  ]);

  console.log('Seed completed!');
  console.log(`Created: ${events.length} events, 4 team members, 5 registrations, 1 settings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
