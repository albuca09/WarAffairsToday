import { useState } from "react";
import "./App.css";
import WorldConflictMap from "./WorldConflictMap";

const bulletins = [
  {
    id: "2026-05-25",
    labelPt: "25 de maio de 2026",
    labelEn: "May 25, 2026",
    bulletinPt: "BOLETIM N° 01 — DIA 25 DE MAIO DE 2026",
    bulletinEn: "BULLETIN No. 01 — MAY 25, 2026",
    references: [
      { label: "Financial Times — 25.05.2026", url: "https://www.ft.com/" },
      { label: "The Guardian — 25.05.2026", url: "https://www.theguardian.com/" },
      { label: "The New York Times — 25.05.2026", url: "https://www.nytimes.com/" },
      { label: "The Times — 25.05.2026", url: "https://www.thetimes.com/" },
      { label: "The Washington Post — 25.05.2026", url: "https://www.washingtonpost.com/" },
    ],
    items: {
      pt: [
        {
          tag: "Notícias Recentes",
          title: "Notícias Recentes sobre Conflitos Armados",
          text: "Panorama consolidado dos principais acontecimentos recentes em conflitos armados, incluindo eventos no campo de batalha, negociações de cessar-fogo, padrões de escalada e focos de violência.",
          featured: true,
          details: [
            "Acordo EUA-Irã: os Estados Unidos e o Irã alcançaram a estrutura de um memorando de entendimento para um cessar-fogo de 60 dias com o objetivo de encerrar a Operação Epic Fury. O acordo envolve a reabertura do Estreito de Ormuz sem a cobrança de pedágios iranianos e o eventual levantamento do bloqueio naval americano.",
            "Ofensiva Russa na Ucrânia: a Rússia realizou um de seus maiores bombardeios noturnos recentes contra a Ucrânia, disparando 90 mísseis e 600 drones. O ataque teve Kiev como alvo principal, causando mortes e danos à infraestrutura civil.",
            "Guerra Líbano-Israel: apesar de um acordo formal de cessar-fogo, os combates mortais prosseguem no Líbano, com bombardeios aéreos israelenses e tensão contínua envolvendo o Hezbollah.",
            "Outros focos de violência: ataques foram registrados no Paquistão e no Mali, incluindo ações atribuídas ao Exército de Libertação do Balochistão e ao grupo JNIM.",
          ],
        },
        {
          tag: "Inteligência Operacional",
          title: "Inteligência Operacional",
          text: "Análise operacional de campanhas, movimentações de forças, desempenho de defesa aérea, bloqueios navais, guerra eletrônica, drones, sensores, operações cibernéticas e sistemas autônomos.",
          details: [
            "Desempenho da defesa ucraniana: durante o último ataque em massa da Rússia, as defesas aéreas da Ucrânia interceptaram a maioria dos drones e mísseis de cruzeiro, mas enfrentaram maiores dificuldades contra mísseis balísticos.",
            "Operações no Oriente Médio: os militares americanos mantêm um bloqueio naval severo aos portos iranianos, enquanto ataques com drones ampliam a pressão contra bases logísticas dos EUA.",
            "Posicionamento da OTAN no Báltico: tropas britânicas realizam exercícios e fortificam áreas próximas à fronteira russa com valas antitanque e obstáculos defensivos.",
            "Tecnologia na guerra: drones, mísseis hipersônicos, guerra eletrônica, inteligência artificial e operações cibernéticas aparecem como fatores decisivos no ritmo operacional.",
          ],
        },
        {
          tag: "Perspectivas Futuras",
          title: "Perspectivas Futuras",
          text: "Avaliação das implicações futuras para escalada regional, alianças, logística, cadeias de suprimento, dissuasão e tomada de decisão estratégica.",
          details: [
            "Gargalos econômicos e logísticos globais: o fechamento ou restrição do Estreito de Ormuz tem potencial para afetar cadeias industriais dependentes de energia e derivados petroquímicos.",
            "Pressão política interna nos EUA: decisões sobre negociações com o Irã podem produzir divisões políticas e afetar a coerência da política externa americana.",
            "Rearranjo de alianças e preocupações na Europa: relatórios indicam preocupação crescente com cadeias de suprimento, prontidão logística e sustentação de conflitos prolongados.",
            "Aceleração tecnológica: drones, inteligência artificial, guerra eletrônica, capacidades cibernéticas, sistemas hipersônicos e plataformas autônomas tendem a ganhar centralidade nos conflitos futuros.",
          ],
        },
        {
          tag: "Direito Internacional",
          title: "O Direito e os Conflitos Armados",
          text: "Análise jurídica dos conflitos armados, incluindo Direito Internacional Humanitário, regras de engajamento, proteção de civis, proporcionalidade, responsabilização e tecnologias emergentes.",
          details: [
            "Direito Internacional Humanitário: a análise dos conflitos deve considerar os princípios da distinção, proporcionalidade, necessidade militar e precaução nos ataques.",
            "Proteção de civis: ataques contra áreas urbanas, infraestrutura crítica, zonas residenciais e alvos de duplo uso levantam questões recorrentes sobre danos civis e legalidade operacional.",
            "Responsabilização: o acompanhamento de possíveis violações do Direito Internacional Humanitário, crimes de guerra, ataques indiscriminados e responsabilidade de comando permanece essencial.",
            "Tecnologias emergentes: drones, inteligência artificial, operações cibernéticas, guerra eletrônica, sistemas autônomos e armas hipersônicas desafiam os marcos jurídicos existentes.",
          ],
        },
      ],
      en: [
        {
          tag: "Recent Conflict News",
          title: "Recent News on Armed Conflicts",
          text: "A consolidated overview of recent armed conflict developments, including battlefield events, ceasefire negotiations, escalation patterns, and violence hotspots.",
          featured: true,
          details: [
            "U.S.–Iran Agreement: the United States and Iran reached the framework of a memorandum of understanding for a 60-day ceasefire intended to end Operation Epic Fury.",
            "Russian Offensive in Ukraine: Russia conducted one of its largest recent overnight bombardments against Ukraine, launching missiles and drones against Kyiv and other targets.",
            "Lebanon–Israel War: despite formal ceasefire arrangements, deadly fighting continued in Lebanon with Israeli airstrikes and persistent Hezbollah-related tensions.",
            "Other violence hotspots were reported in Pakistan and Mali, including attacks attributed to the Balochistan Liberation Army and JNIM.",
          ],
        },
        {
          tag: "Operational Intelligence",
          title: "Operational Intelligence",
          text: "Operational analysis of campaigns, force movements, air defense, naval blockades, electronic warfare, drones, sensors, cyber activity, and autonomous systems.",
          details: [
            "Ukrainian air defenses intercepted most drones and cruise missiles but faced greater difficulty against ballistic missiles.",
            "U.S. forces maintained pressure through naval blockade operations, while drone attacks reportedly extended pressure against American logistics hubs.",
            "NATO forces strengthened posture in the Baltic region with military exercises and border fortifications.",
            "Drones, hypersonic missiles, electronic warfare, artificial intelligence, and cyber operations remain decisive operational factors.",
          ],
        },
        {
          tag: "Future Outlook",
          title: "Future Perspectives",
          text: "Assessment of future implications for escalation dynamics, alliance posture, logistics, supply chains, deterrence, and strategic decision-making.",
          details: [
            "Global economic and logistical bottlenecks may intensify if maritime chokepoints remain contested.",
            "Domestic political pressure in the United States may affect the coherence of policy toward Iran and regional security.",
            "European governments may face growing concerns over supply chains, readiness, and sustained defense spending.",
            "Drones, AI, cyber capabilities, hypersonic systems, and autonomous platforms are likely to become even more central to future conflict dynamics.",
          ],
        },
        {
          tag: "International Law",
          title: "Law and Armed Conflicts",
          text: "Legal analysis of armed conflicts, including international humanitarian law, rules of engagement, civilian protection, proportionality, accountability, and emerging technologies.",
          details: [
            "International humanitarian law requires distinction, proportionality, military necessity, and precaution in attacks.",
            "Attacks against urban areas, critical infrastructure, residential zones, and dual-use facilities raise recurring questions about civilian harm.",
            "Monitoring possible violations, war crimes, indiscriminate attacks, and command responsibility remains essential.",
            "Drones, AI, cyber operations, electronic warfare, autonomous systems, and hypersonic weapons challenge existing legal frameworks.",
          ],
        },
      ],
    },
  },
  {
    id: "2026-05-30",
    labelPt: "30 de maio de 2026",
    labelEn: "May 30, 2026",
    bulletinPt: "BOLETIM N° 02 — DIA 30 DE MAIO DE 2026",
    bulletinEn: "BULLETIN No. 02 — MAY 30, 2026",
    references: [
      { label: "Die Welt — 28.05.2026", url: "https://www.welt.de/" },
      { label: "The Times — 29.05.2026", url: "https://www.thetimes.com/" },
      { label: "The Wall Street Journal — 29.05.2026", url: "https://www.wsj.com/" },
      {
        label: "The Human Cost of Military Aggression — Al Jazeera",
        url: "https://liberties.aljazeera.com/en/the-human-cost-of-military-aggression/",
      },
      {
        label: "Iran war updates — Al Jazeera",
        url: "https://www.aljazeera.com/",
      },
      {
        label: "Iran calls for a new regional security order — Tehran Times",
        url: "https://www.tehrantimes.com/",
      },
      {
        label: "Analysis: The war on Iran is at a crossroads — Al Jazeera",
        url: "https://www.aljazeera.com/",
      },
      {
        label: "Can NATO survive if Trump pulls the US out? — Al Jazeera",
        url: "https://www.aljazeera.com/",
      },
      {
        label: "Two years into Sudan's war — Al Jazeera Interactives",
        url: "https://interactive.aljazeera.com/",
      },
      {
        label: "Mapping the Red Sea attacks — Al Jazeera Interactives",
        url: "https://interactive.aljazeera.com/",
      },
    ],
    items: {
      pt: [
        {
          tag: "Notícias Recentes",
          title: "Notícias Recentes sobre Conflitos Armados",
          text: "Panorama consolidado dos principais acontecimentos recentes em conflitos armados, com destaque para a guerra EUA-Irã, o conflito Israel-Líbano, a guerra Rússia-Ucrânia e a situação em Gaza.",
          featured: true,
          details: [
            "Guerra EUA-Irã: os Estados Unidos e o Irã estão muito próximos de assinar um memorando de entendimento para um cessar-fogo de 60 dias. O acordo exige que o Irã libere e não cobre pedágios no Estreito de Ormuz; em troca, os EUA permitiriam o descongelamento de ativos iranianos. O presidente Donald Trump ainda não aprovou formalmente os termos finais, enquanto o Irã lançou recentemente um míssil balístico, interceptado, contra o Kuwait como demonstração de força.",
            "Conflito Israel-Líbano: Israel intensificou sua incursão, realizando ataques aéreos na região de Beirute pela primeira vez em semanas e bombardeando pesadamente a antiga cidade portuária de Tiro e os arredores do histórico Castelo de Beaufort. As forças israelenses estão arrasando vilarejos para estabelecer uma zona de amortecimento de 8 a 10 quilômetros da fronteira. Autoridades libanesas reportam mais de 3.269 mortos desde o início da incursão terrestre.",
            "Guerra Rússia-Ucrânia: o conflito entrou em nova fase, com a Ucrânia rompendo parcialmente a guerra estática de posições e realizando invasões táticas além das linhas russas, apoiada por campanhas de drones que teriam causado cerca de 35.000 baixas russas mensais. Em retaliação, a Rússia disparou novamente o míssil balístico hipersônico Oreshnik perto de Bila Tserkva, sem registro de mortes nesse ataque. O presidente ucraniano Volodymyr Zelensky apelou por urgência no fornecimento de mísseis Patriot pelos EUA.",
            "Gaza: Israel confirmou a morte de Mohammed Odeh, recém-nomeado comandante do braço armado do Hamas e ex-chefe de inteligência do grupo.",
          ],
        },
        {
          tag: "Inteligência Operacional",
          title: "Inteligência Operacional",
          text: "Análise operacional multidomínio dos conflitos atuais, combinando doutrina militar, análise de redes, inteligência baseada em atividades, automação de dados e avaliação de ameaças tecnológicas.",
          details: [
            "Ameaça de drones do Hezbollah e Análise de Redes: o grupo libanês adotou táticas inspiradas na guerra da Ucrânia, empregando drones explosivos FPV e sensores noturnos. Esses drones se tornaram um dos maiores riscos para tropas israelenses no norte, e cerca de 80% deles seriam controlados por cabos de fibra ótica, tornando-os quase imunes a interferência eletrônica. A inteligência operacional pode aplicar Análise de Redes Sociais e Análise de Vínculos para mapear cadeia de suprimentos, operadores, líderes de células e nós críticos da rede adversária.",
            "Defesa aérea e mísseis hipersônicos: o míssil russo Oreshnik atinge velocidades superiores a Mach 10, criando grande dificuldade de interceptação. A camada de plasma superaquecido ao redor do projétil pode bloquear sinais de rádio e satélite, reduzindo a possibilidade de correções de curso, mas também afetando a precisão terminal. Para lidar com a incerteza e o engano, analistas podem aplicar Técnicas Analíticas Estruturadas, especialmente detecção de engano e análise preditiva.",
            "Frota fantasma e Inteligência Baseada em Atividades: para contornar sanções e bloqueios, o Irã expandiu o uso de uma armada clandestina de navios-tanque. Navios mascaram identidade, desligam radares, cobrem nomes e realizam transferências de petróleo navio-a-navio próximas à costa da Malásia. A ABI correlaciona dados espaciais e temporais, imagens de satélite, transações financeiras e rotas navais para revelar padrões de vida e transações ocultas.",
            "Integração e automação de dados: a inteligência contemporânea atua em múltiplos domínios e usa tecnologias avançadas no ciclo TCPED. A aplicação de IA e aprendizado de máquina permite lidar com grandes volumes de dados, automatizar reconhecimento de alvos e apoiar predições baseadas em algoritmos e análise de redes. Isso libera analistas humanos da triagem mecânica e permite foco em raciocínio crítico, hipóteses e julgamentos de alto valor.",
          ],
        },
        {
          tag: "Perspectivas Futuras",
          title: "Perspectivas Futuras",
          text: "Avaliação das tendências futuras de escalada, rearranjo de alianças, deficiências logísticas, segurança energética e resiliência militar diante de conflitos prolongados.",
          details: [
            "Risco de escalada e mudança de alianças: a disputa geopolítica sobre o Cáucaso está se intensificando, com EUA e Rússia disputando influência na Armênia. A Armênia deseja aproximar-se da União Europeia e do Ocidente, enquanto o presidente russo Vladimir Putin faz ameaças abertas e traça paralelos com as causas da guerra na Ucrânia.",
            "Deficiências logísticas: relatórios mostram que aliados ocidentais podem não estar preparados para sustentar combates longos. A Austrália alertou que carece de combustível, tropas especializadas e estoques de armas guiadas para enfrentar ameaças imediatas, enquanto grandes projetos com EUA e Reino Unido levarão décadas para gerar resultados. Na Europa, exercícios indicam que a destruição de poucos nós ferroviários ou portos-chave pode atrasar severamente qualquer reposicionamento da OTAN no flanco leste.",
            "Cadeias de suprimento energético como segurança nacional: as guerras no Irã e na Ucrânia transformaram a energia em instrumento de coerção. Países passam a enxergar energias renováveis e geração distribuída não apenas como políticas ambientais, mas como componentes de resiliência, independência logística e sustentação militar em tempos de guerra.",
          ],
        },
        {
          tag: "Direito Internacional",
          title: "O Direito e os Conflitos Armados",
          text: "Análise das bases legais, regras de engajamento, tratamento de prisioneiros, responsabilização de forças especiais e impactos jurídicos do uso de inteligência artificial no campo de batalha.",
          details: [
            "Bases legais e regras de engajamento: operações militares e coleta de inteligência no campo de batalha estão submetidas ao Direito dos Conflitos Armados, ao Direito Internacional dos Direitos Humanos e às Regras de Engajamento, exigindo equilíbrio entre necessidade militar, humanidade e proporcionalidade nos ataques.",
            "Tratamento e compartilhamento de prisioneiros: interrogatórios devem respeitar as Convenções de Genebra e proteger prisioneiros contra tortura e maus-tratos. No Reino Unido, os Princípios de Fulford orientam que a inteligência britânica não compartilhe informações militares com nações quando houver risco de facilitar atos ilícitos, como execuções ou rendições extraordinárias.",
            "Responsabilização de forças especiais: investigações em andamento no Reino Unido examinam táticas empregadas pelas Forças Especiais britânicas na Guerra do Afeganistão entre 2010 e 2013. O inquérito apura relatos de devolução de prisioneiros a edifícios para posterior execução sob a justificativa de serem homens em idade de combate.",
            "Tecnologias emergentes e IA no campo de batalha: o uso de inteligência artificial em armamentos autônomos levanta preocupações no direito internacional. A redução do controle humano pode contrariar o princípio de que a violência letal deve ser empregada apenas como última e estrita opção em legítima defesa.",
          ],
        },
      ],
      en: [
        {
          tag: "Recent Conflict News",
          title: "Recent News on Armed Conflicts",
          text: "A consolidated overview of recent armed conflict developments, focusing on the U.S.–Iran war, the Israel–Lebanon conflict, the Russia–Ukraine war, and Gaza.",
          featured: true,
          details: [
            "U.S.–Iran War: the United States and Iran are reportedly close to signing a memorandum of understanding for a 60-day ceasefire. The arrangement would require Iran to reopen the Strait of Hormuz without charging tolls, while the United States would allow Iranian assets to be unfrozen.",
            "Israel–Lebanon Conflict: Israel intensified its incursion, carrying out airstrikes in the Beirut area and heavily bombing Tyre and areas near Beaufort Castle.",
            "Russia–Ukraine War: the conflict entered a new phase as Ukraine reportedly broke elements of static positional warfare and conducted tactical incursions beyond Russian front lines.",
            "Gaza: Israel confirmed the death of Mohammed Odeh, recently appointed commander of Hamas's armed wing and former intelligence chief of the group.",
          ],
        },
        {
          tag: "Operational Intelligence",
          title: "Operational Intelligence",
          text: "A multidomain operational intelligence assessment combining military doctrine, network analysis, activity-based intelligence, data automation, and threat evaluation.",
          details: [
            "Hezbollah drone threat and social network analysis: Hezbollah reportedly adopted tactics from the Ukraine war, including FPV explosive drones and night sensors.",
            "Air defense and hypersonic missiles: Russia's Oreshnik missile reportedly reaches speeds above Mach 10, complicating interception.",
            "Shadow fleet and activity-based intelligence: Iran reportedly expanded a clandestine tanker fleet to bypass sanctions and naval blockades.",
            "Data integration and automation: modern intelligence uses AI and machine learning across the TCPED cycle to process big data and support predictive analysis.",
          ],
        },
        {
          tag: "Future Outlook",
          title: "Future Perspectives",
          text: "Assessment of future escalation, alliance shifts, logistical weaknesses, energy security, and military resilience in prolonged conflicts.",
          details: [
            "Escalation risk and alliance shifts: geopolitical competition over the Caucasus is intensifying, with the United States and Russia competing for influence in Armenia.",
            "Logistical deficiencies: reports indicate that some Western allies may not be prepared to sustain long-duration combat.",
            "Energy supply chains as national security: wars in Iran and Ukraine have turned energy into a strategic weapon.",
          ],
        },
        {
          tag: "International Law",
          title: "Law and Armed Conflicts",
          text: "Legal analysis of rules of engagement, prisoner treatment, accountability, and the implications of artificial intelligence in armed conflict.",
          details: [
            "Legal basis and rules of engagement: military operations and battlefield intelligence collection are governed by the law of armed conflict and rules of engagement.",
            "Prisoner treatment and intelligence sharing: interrogations must comply with the Geneva Conventions and protect prisoners from torture and mistreatment.",
            "Special forces accountability: ongoing investigations in the United Kingdom examine alleged practices by British Special Forces during the Afghanistan War.",
            "Emerging technologies and battlefield AI: autonomous weapons and AI-enabled targeting raise major concerns under international law.",
          ],
        },
      ],
    },
  },
];

function App() {
  const [lang, setLang] = useState("pt");
  const [selectedDay, setSelectedDay] = useState("2026-05-30");
  const [expandedConflict, setExpandedConflict] = useState(null);

  const selectedBulletin =
    bulletins.find((bulletin) => bulletin.id === selectedDay) || bulletins[0];

  const t = {
    pt: {
      nav: {
        conflicts: "Conflitos",
        technology: "Tecnologia",
        sources: "Fontes",
        about: "Sobre",
      },
      hero: {
        eyebrow: "Inteligência Operacional • Tecnologia de Defesa • Guerra Moderna",
        title: "War Affairs Today",
        subtitle:
          "Uma plataforma visual de briefings de inteligência voltada para conflitos modernos, tecnologias emergentes de defesa, notícias sobre conflitos armados e análise operacional.",
        primary: "Ver Boletim",
        secondary: "Tecnologias de Defesa",
      },
      stats: [
        ["24/7", "Mentalidade de monitoramento"],
        ["OSINT", "Análise de fontes abertas"],
        ["IA", "Observação tecnológica"],
        ["GE", "Foco em guerra eletrônica"],
        ["GA", "Guerra acústica"],
        ["G Ciber", "Guerra cibernética"],
        ["AUTO", "Sistemas autônomos"],
      ],
      conflicts: {
        eyebrow: "Notícias sobre Conflitos Armados",
        title: "Atualizações sobre Conflitos em Andamento",
        bulletin: selectedBulletin.bulletinPt,
        daySelectorLabel: "Selecionar dia do boletim",
        expandLabel: "Clique para expandir",
        collapseLabel: "Clique para recolher",
        referencesLabel: "Referências",
        items: selectedBulletin.items.pt,
      },
      technology: {
        eyebrow: "Observatório Tecnológico",
        title: "Tecnologias Emergentes de Defesa",
        items: [
          {
            title: "Inteligência Artificial",
            text: "Apoio à decisão baseado em IA, processamento de inteligência, reconhecimento de alvos, autonomia e cooperação homem-máquina.",
          },
          {
            title: "Drones e Sistemas Autônomos",
            text: "Sistemas aéreos não tripulados, munições vagantes, enxames de drones, tecnologias contra-UAS e plataformas autônomas.",
          },
          {
            title: "Radar e Sensores",
            text: "Sistemas de vigilância, assinaturas radar, fusão de sensores, medidas de apoio à guerra eletrônica e redes de detecção.",
          },
          {
            title: "Guerra Eletrônica",
            text: "Jamming, spoofing, domínio do espectro, SIGINT, atividades cibernético-eletromagnéticas e operações no espectro eletromagnético.",
          },
          {
            title: "Guerra Acústica",
            text: "Acústica submarina, sistemas sonar, detecção passiva e ativa, inteligência acústica, guerra antissubmarino e sensoriamento acústico marítimo.",
          },
          {
            title: "Guerra Cibernética",
            text: "Operações cibernéticas, defesa de redes, capacidades ofensivas no ciberespaço, proteção de infraestruturas críticas e dimensão cibernética dos conflitos modernos.",
          },
        ],
      },
      sources: {
        eyebrow: "Fontes",
        title: "Links Úteis de Defesa e Inteligência",
      },
      about: {
        eyebrow: "Sobre",
        title: "Conflitos modernos explicados por meio de inteligência e tecnologia.",
        text: "War Affairs Today foi concebido como um hub visual de briefings para inteligência operacional, inovação em defesa, notícias sobre conflitos armados e análise da guerra contemporânea, com atenção especial a drones, sensores, radar, guerra eletrônica, guerra acústica, guerra cibernética, inteligência artificial, sistemas autônomos e dimensões jurídicas dos conflitos armados.",
      },
    },
    en: {
      nav: {
        conflicts: "Conflicts",
        technology: "Technology",
        sources: "Sources",
        about: "About",
      },
      hero: {
        eyebrow: "Operational Intelligence • Defense Technology • Modern Warfare",
        title: "War Affairs Today",
        subtitle:
          "A visual intelligence briefing platform focused on modern conflicts, emerging defense technologies, armed conflict news, and operational analysis.",
        primary: "View Bulletin",
        secondary: "Technology Watch",
      },
      stats: [
        ["24/7", "Monitoring mindset"],
        ["OSINT", "Open-source analysis"],
        ["AI", "Technology watch"],
        ["EW", "Electronic warfare focus"],
        ["AW", "Acoustic warfare"],
        ["Cyber", "Cyber warfare"],
        ["AUTO", "Autonomous systems"],
      ],
      conflicts: {
        eyebrow: "Armed Conflict News",
        title: "Updates on Ongoing Conflicts",
        bulletin: selectedBulletin.bulletinEn,
        daySelectorLabel: "Select bulletin date",
        expandLabel: "Click to expand",
        collapseLabel: "Click to collapse",
        referencesLabel: "References",
        items: selectedBulletin.items.en,
      },
      technology: {
        eyebrow: "Technology Watch",
        title: "Emerging Defense Technologies",
        items: [
          {
            title: "Artificial Intelligence",
            text: "AI-enabled decision support, intelligence processing, target recognition, autonomy, and human-machine teaming.",
          },
          {
            title: "Drones and Autonomous Systems",
            text: "Unmanned aerial systems, loitering munitions, drone swarms, counter-UAS technologies, and autonomous platforms.",
          },
          {
            title: "Radar and Sensors",
            text: "Surveillance systems, radar signatures, sensor fusion, electronic support measures, and detection networks.",
          },
          {
            title: "Electronic Warfare",
            text: "Jamming, spoofing, spectrum dominance, SIGINT, cyber-electromagnetic activities, and electromagnetic operations.",
          },
          {
            title: "Acoustic Warfare",
            text: "Underwater acoustics, sonar systems, passive and active detection, acoustic intelligence, anti-submarine warfare, and maritime acoustic sensing.",
          },
          {
            title: "Cyber Warfare",
            text: "Cyber operations, network defense, offensive cyber capabilities, critical infrastructure protection, and the cyber dimension of modern conflict.",
          },
        ],
      },
      sources: {
        eyebrow: "Sources",
        title: "Useful Defense and Intelligence Links",
      },
      about: {
        eyebrow: "About",
        title: "Modern conflict explained through intelligence and technology.",
        text: "War Affairs Today is designed as a visual briefing hub for operational intelligence, defense innovation, armed conflict news, and contemporary warfare analysis, with special attention to drones, sensors, radar, electronic warfare, acoustic warfare, cyber warfare, artificial intelligence, autonomous systems, and the legal dimensions of armed conflict.",
      },
    },
  }[lang];

  const links = [
    {
      label: lang === "en" ? "My GitHub Projects" : "Meus Projetos no GitHub",
      url: "https://github.com/albuca09?tab=repositories",
    },
    { label: "NATO", url: "https://www.nato.int/" },
    { label: "U.S. Department of Defense", url: "https://www.defense.gov/" },
    { label: "IISS", url: "https://www.iiss.org/" },
    { label: "Janes", url: "https://www.janes.com/" },
    { label: "CSIS", url: "https://www.csis.org/" },
    {
      label: "Institute for the Study of War",
      url: "https://www.understandingwar.org/",
    },
  ];

  return (
    <main className="page">
      <nav className="navbar">
        <div className="logo">War Affairs Today</div>

        <div className="nav-actions">
          <div className="nav-links">
            <a href="#conflicts">{t.nav.conflicts}</a>
            <a href="#technology">{t.nav.technology}</a>
            <a href="#sources">{t.nav.sources}</a>
            <a href="#about">{t.nav.about}</a>
          </div>

          <button
            className="language-switch"
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
          >
            {lang === "en" ? "PT" : "EN"}
          </button>
        </div>
      </nav>

      <section className="hero hero-clean">
        <div className="hero-content">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="subtitle">{t.hero.subtitle}</p>

          <div className="hero-buttons">
            <a href="#conflicts" className="primary-button">
              {t.hero.primary}
            </a>

            <a href="#technology" className="secondary-button">
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </section>

      <section className="stats">
        {t.stats.map(([number, label]) => (
          <div key={label}>
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section id="conflicts" className="section conflict-section">
        <div className="section-header">
          <p className="eyebrow">{t.conflicts.eyebrow}</p>
          <h2>{t.conflicts.title}</h2>

          <div className="bulletin-toolbar">
            <p className="bulletin-label">{t.conflicts.bulletin}</p>

            <label className="day-selector">
              <span>{t.conflicts.daySelectorLabel}</span>

              <select
                value={selectedDay}
                onChange={(event) => {
                  setSelectedDay(event.target.value);
                  setExpandedConflict(null);
                }}
              >
                {bulletins.map((bulletin) => (
                  <option value={bulletin.id} key={bulletin.id}>
                    {lang === "pt" ? bulletin.labelPt : bulletin.labelEn}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <WorldConflictMap lang={lang} selectedDay={selectedDay} />

        <div className="conflict-grid compact-conflict-grid">
          {t.conflicts.items.map((item) => {
            const isExpanded = expandedConflict === item.title;

            return (
              <article
                className={
                  isExpanded
                    ? "conflict-card expanded-conflict"
                    : item.featured
                    ? "conflict-card featured-conflict"
                    : "conflict-card"
                }
                key={item.title}
              >
                <button
                  className="conflict-toggle"
                  onClick={() =>
                    setExpandedConflict(isExpanded ? null : item.title)
                  }
                >
                  <span className="tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>

                  <span className="expand-hint">
                    {isExpanded
                      ? t.conflicts.collapseLabel
                      : t.conflicts.expandLabel}
                  </span>
                </button>

                {isExpanded && (
                  <div className="expanded-content">
                    {selectedBulletin.references && (
                      <div className="section-references">
                        <strong>{t.conflicts.referencesLabel}:</strong>
                        <ul>
                          {selectedBulletin.references.map((reference) => (
                            <li key={reference.label}>
                              <a
                                href={reference.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {reference.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.details && (
                      <ul className="detail-list">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="technology" className="section">
        <div className="section-header">
          <p className="eyebrow">{t.technology.eyebrow}</p>
          <h2>{t.technology.title}</h2>
        </div>

        <div className="card-grid">
          {t.technology.items.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sources" className="section">
        <div className="section-header">
          <p className="eyebrow">{t.sources.eyebrow}</p>
          <h2>{t.sources.title}</h2>
        </div>

        <div className="link-grid">
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>{t.about.title}</h2>
        </div>

        <p>{t.about.text}</p>
      </section>
    </main>
  );
}

export default App;