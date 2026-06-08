'use client';
import { createContext, useContext } from 'react';

export type Lang = 'pt' | 'en';

export const LanguageContext = createContext<Lang>('pt');

export function useLang() {
  return useContext(LanguageContext);
}

// The translation object - complete PT and EN
export const T: Record<Lang, Record<string, Record<string, string>>> = {
  pt: {
    nav: {
      home: 'Início', about: 'Sobre', team: 'Equipe', space: 'Espaço',
      events: 'Eventos', cafe: 'Café', courses: 'Cursos', contact: 'Contato',
      admin: 'Admin', donate: 'Apoie'
    },
    hero: {
      title: 'Soli Deo Gloria',
      subtitle: 'Um espaço para cultivar, guardar e proclamar o evangelho.',
      cta: 'Conheça o Projeto',
      cta2: 'Próximos Eventos'
    },
    about: {
      sectionTag: 'Sobre Nós',
      title: 'Centro Bíblico Reformado',
      desc: 'O Projeto Soli Deo Gloria é um centro de aconselhamento bíblico confessional e reformado, com cursos teológicos, acampamentos e espaço para eventos, localizado em Aldeia, Pernambuco.',
      mission: 'Nossa Missão',
      missionText: 'Os Leamans chegaram ao Brasil em 2013, quando o Pastor Douglas veio servir em seminários, por meio da pregação e do ensino, com foco em aconselhamento bíblico. Com o tempo e com uma providência incrível, Deus permitiu que o Projeto Soli Deo Gloria nascesse na mesma propriedade onde Douglas nasceu.',
      missionText2: 'O Projeto tem sido capaz, pela graça de Deus, de expandir oportunidades para declarar a glória de Deus por meio do ensino fiel da Palavra de Deus. É incrível ver a bênção do Senhor em cada detalhe deste trabalho. Soli Deo Gloria!',
      vision: 'Nossa Visão',
      visionText: 'Trazer cada centímetro quadrado sob o controle da beleza e da ordem, para o benefício de todos os que visitam. Estamos buscando desenvolver a terra para que suas qualidades inatas se manifestem em abundância de alimento e beleza.',
      learnMore: 'Saiba Mais'
    },
    areas: {
      sectionTag: 'Áreas de Atuação',
      title: 'O que fazemos',
      education: 'Educacional',
      educationDesc: 'Em parceria com a Liferay, estabelecemos um Instituto de Tecnologia e Teologia onde 20 jovens se envolvem em estudos em tempo integral ao longo do ano.',
      camps: 'Acampamentos',
      campsDesc: 'Todo ano, realizamos acampamentos, com palestras sobre temas relevantes para a nossa fé reformada, e muitas atividades para crianças e adolescentes.',
      events: 'Eventos',
      eventsDesc: 'Disponibilizamos nosso espaço para encontros das igrejas, acampamentos, reserva de aniversários, casamentos e outros eventos.'
    },
    eventsList: {
      sectionTag: 'Agenda',
      title: 'Próximos Eventos',
      viewAll: 'Ver Todos os Eventos',
      register: 'Inscreva-se',
      spots: 'vagas',
      spotsLeft: 'vagas restantes',
      soldOut: 'Esgotado',
      free: 'Gratuito',
      date: 'Data',
      time: 'Horário',
      location: 'Local',
      price: 'Investimento',
      allEvents: 'Todos os Eventos',
      upcoming: 'Próximos',
      past: 'Realizados',
      calendar: 'Calendário',
      list: 'Lista',
      filterAll: 'Todos',
      filterCamp: 'Acampamentos',
      filterWorkshop: 'Workshops',
      filterConference: 'Conferências',
      filterCafe: 'Café'
    },
    registration: {
      title: 'Inscrição',
      name: 'Nome Completo',
      email: 'E-mail',
      phone: 'Telefone / WhatsApp',
      church: 'Igreja',
      age: 'Idade',
      notes: 'Observações',
      continue: 'Continuar para Pagamento',
      back: 'Voltar',
      payment: 'Pagamento',
      paymentMethod: 'Forma de Pagamento',
      pix: 'PIX',
      creditCard: 'Cartão de Crédito',
      boleto: 'Boleto',
      pixInstructions: 'Use o QR Code abaixo ou copie a chave PIX para efetuar o pagamento.',
      pixKey: 'Chave PIX',
      copy: 'Copiar',
      copied: 'Copiado!',
      cardNumber: 'Número do Cartão',
      cardName: 'Nome no Cartão',
      cardExpiry: 'Validade',
      cardCvv: 'CVV',
      pay: 'Pagar',
      processing: 'Processando...',
      success: 'Inscrição Confirmada!',
      successMsg: 'Você receberá um e-mail de confirmação com todos os detalhes.',
      close: 'Fechar'
    },
    cafe: {
      sectionTag: 'Café SDG',
      title: 'Café Soli Deo Gloria',
      desc: 'Uma forma especial e criativa para viabilizar financeiramente futuros projetos de construção. O querido Café Soli Deo Gloria abre em alguns sábados do mês, conforme anunciado nas redes sociais.',
      learnMore: 'Saiba Mais'
    },
    space: {
      sectionTag: 'Nosso Espaço',
      title: 'Um paraíso em Aldeia',
      desc: 'O Projeto está localizado no bairro de Aldeia, a poucos km de Recife, na cidade de Camaragibe. Um verdadeiro paraíso aconchegante, onde podemos contemplar a criação de Deus em um espaço amplo e verde, com muitas plantações, pássaros e rios.',
      gallery: 'Galeria',
      address: 'Endereço',
      addressText: 'Alameda Pau Ferro, 835 - Guabiraba, Recife - PE, 54789-770',
      howToGet: 'Como Chegar'
    },
    team: {
      sectionTag: 'Equipe',
      title: 'Conheça Nossa Equipe',
      pastor: 'Pastor e Fundador',
      wife: 'Co-fundadora',
      coordinator: 'Coordenador'
    },
    courses: {
      sectionTag: 'Cursos',
      title: 'Cursos e Formação',
      desc: 'Oferecemos cursos teológicos e formação prática integrada, preparando jovens para servir a Deus em todas as áreas da vida.',
      theology: 'Teologia Bíblica',
      theologyDesc: 'Estudo aprofundado das Escrituras com base na tradição reformada confessional.',
      technology: 'Tecnologia',
      technologyDesc: 'Capacitação em computação e tecnologia em parceria com a Liferay.',
      counseling: 'Aconselhamento Bíblico',
      counselingDesc: 'Formação em aconselhamento bíblico noutético para servir à igreja.',
      enroll: 'Inscreva-se'
    },
    contact: {
      sectionTag: 'Contato',
      title: 'Fale Conosco',
      desc: 'Tem alguma dúvida ou quer saber mais sobre o projeto? Entre em contato.',
      name: 'Nome',
      email: 'E-mail',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      sent: 'Mensagem enviada com sucesso!',
      phone: 'Telefone',
      whatsapp: 'WhatsApp',
      social: 'Redes Sociais'
    },
    footer: {
      desc: 'Centro bíblico reformado com cursos, acampamentos, eventos e aluguel do espaço.',
      links: 'Links Rápidos',
      social: 'Redes Sociais',
      contact: 'Contato',
      rights: '© 2024 Projeto Soli Deo Gloria. Todos os direitos reservados.',
      address: 'Alameda Pau Ferro, 835\nGuabiraba, Recife - PE\n54789-770'
    },
    admin: {
      dashboard: 'Dashboard',
      events: 'Eventos',
      registrations: 'Inscrições',
      settings: 'Configurações',
      totalEvents: 'Total de Eventos',
      totalRegistrations: 'Total de Inscrições',
      revenue: 'Receita',
      upcoming: 'Próximos Eventos',
      createEvent: 'Novo Evento',
      editEvent: 'Editar Evento',
      deleteEvent: 'Excluir',
      eventName: 'Nome do Evento',
      eventDate: 'Data',
      eventTime: 'Horário',
      eventPrice: 'Preço',
      eventSpots: 'Vagas',
      eventCategory: 'Categoria',
      eventDescription: 'Descrição',
      save: 'Salvar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      status: 'Status',
      confirmed: 'Confirmado',
      pending: 'Pendente',
      cancelled: 'Cancelado'
    }
  },
  en: {
    nav: {
      home: 'Home', about: 'About', team: 'Team', space: 'Space',
      events: 'Events', cafe: 'Café', courses: 'Courses', contact: 'Contact',
      admin: 'Admin', donate: 'Support'
    },
    hero: {
      title: 'Soli Deo Gloria',
      subtitle: 'A place to cultivate, keep, and proclaim the gospel.',
      cta: 'Discover the Project',
      cta2: 'Upcoming Events'
    },
    about: {
      sectionTag: 'About Us',
      title: 'Reformed Biblical Center',
      desc: 'The Soli Deo Gloria Project is a confessional and reformed biblical counseling center, with theological courses, camps, and event space, located in Aldeia, Pernambuco.',
      mission: 'Our Mission',
      missionText: 'The Leamans arrived in Brazil in 2013 when Pastor Douglas came to serve in seminaries, through preaching and teaching, focusing on Biblical Counseling. Over time and with incredible providence, God allowed Project Soli Deo Gloria to be born on the same property where Douglas was born.',
      missionText2: 'The Project has been able, by God\'s grace, to expand opportunities to declare the glory of God through the faithful teaching of God\'s word. It is amazing to see the blessing of the Lord in every detail of this work. Soli Deo Gloria!',
      vision: 'Our Vision',
      visionText: 'To bring every square inch under the control of beauty and order, for the benefit of all who visit. We seek to develop the land so that its innate qualities may manifest in an abundance of food and beauty.',
      learnMore: 'Learn More'
    },
    areas: {
      sectionTag: 'Areas of Work',
      title: 'What We Do',
      education: 'Educational',
      educationDesc: 'In partnership with Liferay, we established an Institute of Technology and Theology where 20 young men engage in full-time study throughout the year.',
      camps: 'Camps',
      campsDesc: 'Every year we hold camps with lectures on topics relevant to our reformed faith, and many activities for children and teenagers.',
      events: 'Events',
      eventsDesc: 'We make our space available for church meetings, camps, birthday parties, weddings and other events.'
    },
    eventsList: {
      sectionTag: 'Schedule',
      title: 'Upcoming Events',
      viewAll: 'View All Events',
      register: 'Register',
      spots: 'spots',
      spotsLeft: 'spots left',
      soldOut: 'Sold Out',
      free: 'Free',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      price: 'Investment',
      allEvents: 'All Events',
      upcoming: 'Upcoming',
      past: 'Past',
      calendar: 'Calendar',
      list: 'List',
      filterAll: 'All',
      filterCamp: 'Camps',
      filterWorkshop: 'Workshops',
      filterConference: 'Conferences',
      filterCafe: 'Café'
    },
    registration: {
      title: 'Registration',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      church: 'Church',
      age: 'Age',
      notes: 'Notes',
      continue: 'Continue to Payment',
      back: 'Back',
      payment: 'Payment',
      paymentMethod: 'Payment Method',
      pix: 'PIX',
      creditCard: 'Credit Card',
      boleto: 'Boleto',
      pixInstructions: 'Use the QR Code below or copy the PIX key to make the payment.',
      pixKey: 'PIX Key',
      copy: 'Copy',
      copied: 'Copied!',
      cardNumber: 'Card Number',
      cardName: 'Name on Card',
      cardExpiry: 'Expiry',
      cardCvv: 'CVV',
      pay: 'Pay',
      processing: 'Processing...',
      success: 'Registration Confirmed!',
      successMsg: 'You will receive a confirmation email with all the details.',
      close: 'Close'
    },
    cafe: {
      sectionTag: 'SDG Café',
      title: 'Café Soli Deo Gloria',
      desc: 'A special and creative way to financially support future construction projects. The beloved Café Soli Deo Gloria opens on select Saturdays each month, as announced on social media.',
      learnMore: 'Learn More'
    },
    space: {
      sectionTag: 'Our Space',
      title: 'A Paradise in Aldeia',
      desc: 'The Project is located in the Aldeia neighborhood, a few km from Recife, in the city of Camaragibe. A true cozy paradise, where we can contemplate God\'s creation in a wide, green space, with many plantations, birds, and rivers.',
      gallery: 'Gallery',
      address: 'Address',
      addressText: 'Alameda Pau Ferro, 835 - Guabiraba, Recife - PE, 54789-770',
      howToGet: 'Get Directions'
    },
    team: {
      sectionTag: 'Team',
      title: 'Meet Our Team',
      pastor: 'Pastor & Founder',
      wife: 'Co-founder',
      coordinator: 'Coordinator'
    },
    courses: {
      sectionTag: 'Courses',
      title: 'Courses & Training',
      desc: 'We offer theological courses and integrated practical training, preparing young people to serve God in every area of life.',
      theology: 'Biblical Theology',
      theologyDesc: 'In-depth study of Scripture based on the confessional reformed tradition.',
      technology: 'Technology',
      technologyDesc: 'Computing and technology training in partnership with Liferay.',
      counseling: 'Biblical Counseling',
      counselingDesc: 'Training in nouthetic biblical counseling to serve the church.',
      enroll: 'Enroll'
    },
    contact: {
      sectionTag: 'Contact',
      title: 'Get in Touch',
      desc: 'Have a question or want to know more about the project? Reach out.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sent: 'Message sent successfully!',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      social: 'Social Media'
    },
    footer: {
      desc: 'Reformed biblical center with courses, camps, events and space rental.',
      links: 'Quick Links',
      social: 'Social Media',
      contact: 'Contact',
      rights: '© 2024 Projeto Soli Deo Gloria. All rights reserved.',
      address: 'Alameda Pau Ferro, 835\nGuabiraba, Recife - PE\n54789-770'
    },
    admin: {
      dashboard: 'Dashboard',
      events: 'Events',
      registrations: 'Registrations',
      settings: 'Settings',
      totalEvents: 'Total Events',
      totalRegistrations: 'Total Registrations',
      revenue: 'Revenue',
      upcoming: 'Upcoming Events',
      createEvent: 'New Event',
      editEvent: 'Edit Event',
      deleteEvent: 'Delete',
      eventName: 'Event Name',
      eventDate: 'Date',
      eventTime: 'Time',
      eventPrice: 'Price',
      eventSpots: 'Spots',
      eventCategory: 'Category',
      eventDescription: 'Description',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      status: 'Status',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled'
    }
  }
};

export function useT() {
  const lang = useLang();
  return (section: string, key: string): string => {
    try {
      return T[lang][section][key] || key;
    } catch {
      return key;
    }
  };
}
