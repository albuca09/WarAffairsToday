import { useEffect, useState } from "react";
import "./App.css";

const bulletinReferences = [
  "Financial Times — 25.05.2026",
  "The Guardian — 25.05.2026",
  "The New York Times — 25.05.2026",
  "The Times — 25.05.2026",
  "The Washington Post — 25.05.2026",
];

const bulletins = {
  pt: [
    {
      id: "2026-05-25",
      label: "25 de maio de 2026",
      bulletin: "BOLETIM N° 01 — DIA 25 DE MAIO DE 2026",
      items: [
        {
          tag: "Monitoramento de Conflitos",
          title: "Desenvolvimentos no Campo de Batalha",
          references: bulletinReferences,
          text: "Acompanhe os principais acontecimentos em conflitos armados em andamento, incluindo operações militares, mudanças territoriais, padrões de escalada, negociações de cessar-fogo e eventos relevantes no campo de batalha.",
          featured: true,
          details: [
            "Acordo EUA-Irã: os Estados Unidos e o Irã alcançaram a estrutura de um memorando de entendimento para um cessar-fogo de 60 dias com o objetivo de encerrar a Operação Epic Fury. O acordo envolve a reabertura do Estreito de Ormuz sem a cobrança de pedágios iranianos e o eventual levantamento do bloqueio naval americano. No entanto, o debate sobre o desmantelamento das 11 toneladas de combustível nuclear iraniano e seu arsenal de mísseis balísticos foi adiado para negociações futuras. O conflito se destacou por uma taxa historicamente alta de baixas femininas nas forças armadas americanas, que representaram 12% dos feridos e 23% dos mortos em ação.",
            "Ofensiva Russa na Ucrânia: a Rússia realizou um de seus maiores bombardeios noturnos recentes contra a Ucrânia, disparando 90 mísseis e 600 drones. O ataque teve Kiev como alvo principal, matando ao menos quatro pessoas e destruindo infraestrutura civil e áreas residenciais. Na linha de frente, a cidade de Kostiantynivka foi transformada em uma zona de morte, com a sua população original de 67.000 pessoas reduzida para cerca de 2.000 residentes que estão sendo evacuados em meio aos escombros.",
            "Guerra Líbano-Israel: apesar de um acordo formal de cessar-fogo assinado em 17 de abril, os combates mortais prosseguem no Líbano. Um recente bombardeio aéreo israelense na vila de Sir al-Gharbiyeh matou 11 pessoas, incluindo seis mulheres e uma criança. O Primeiro-Ministro de Israel, Benjamin Netanyahu, declarou que o novo acordo com o Irã não limitará sua liberdade de atacar as forças do Hezbollah.",
            "Outros focos de violência: no Paquistão, o grupo Exército de Libertação do Balochistão detonou uma bomba que descarrilou um trem de passageiros, matando de 14 a 16 pessoas. No Mali, o grupo afiliado à Al-Qaeda, JNIM, invadiu a capital Bamako usando como modelo as táticas adotadas na guerra da Síria.",
          ],
        },
        {
          tag: "Visão Operacional",
          title: "Operações Militares",
          references: bulletinReferences,
          text: "Acompanhe campanhas, movimentações de forças, ataques, ações defensivas, operações marítimas, atividade aérea e mudanças no ritmo operacional.",
          details: [
            "Desempenho da defesa ucraniana: durante o último ataque em massa da Rússia, as defesas aéreas da Ucrânia conseguiram abater a grande maioria dos drones e mísseis de cruzeiro, mas enfrentaram sérias dificuldades contra mísseis mais rápidos, interceptando apenas 11 dos 33 mísseis balísticos lançados. Na linha de contato, a 28ª Brigada de Infantaria Mecanizada da Ucrânia neutraliza sozinha cerca de 150 drones russos todos os dias.",
            "Operações no Oriente Médio: os militares americanos mantêm um severo bloqueio naval aos portos iranianos, que Trump afirmou que continuará em força e efeito total até a assinatura do acordo final. Em resposta, as frentes de batalha avançaram para as próprias bases logísticas dos EUA através de constantes ataques iranianos de drones suicidas, incluindo um bombardeio recente que matou militares americanos em uma base no Kuwait.",
            "Posicionamento da OTAN no Báltico: no sul da Estônia, tropas britânicas da brigada Black Rats executam exercícios militares ostensivos e estão fortificando a fronteira com a Rússia utilizando valas antitanque e obstáculos chamados dentes de dragão. Para escapar da forte vigilância russa de drones, soldados da OTAN em missões secretas estão se disfarçando de operários de construção civil.",
          ],
        },
        {
          tag: "Contexto Estratégico",
          title: "Dinâmicas de Escalada",
          references: bulletinReferences,
          text: "Entenda como eventos locais podem afetar a segurança regional, a dissuasão, alianças, logística e processos de decisão estratégica.",
          details: [
            "Gargalos econômicos e logísticos globais: o fechamento do Estreito de Ormuz pelo Irã provocou uma grave crise global. Na Ásia Oriental, países como Japão e Coreia do Sul sofrem com um severo desabastecimento de nafta, fundamental para a produção industrial e de embalagens, forçando empresas a alterar designs de produtos e racionar suprimentos básicos.",
            "Pressão política interna nos EUA: a decisão de buscar a paz com o Irã causou uma ruptura dentro do partido de Donald Trump. Políticos como Ted Cruz, Lindsey Graham e Marco Rubio criticam a postura da administração, argumentando que o acordo é um erro desastroso que permite ao Irã manter o poder, consolidar seu financiamento e sair vitorioso diplomaticamente.",
            "Rearranjo de alianças e preocupações na Europa: um relatório do Reino Unido advertiu que as cadeias de suprimentos britânicas estão completamente despreparadas para a hipótese de uma guerra com a Rússia. Como os EUA têm procurado transferir o fardo da defesa para a Europa, espera-se que o governo britânico aprove um aumento urgente de £18 bilhões em gastos de defesa. Em outro vetor diplomático estratégico, o distanciamento dos EUA forçou a Índia a tentar apaziguar as tensões com a China, seu rival regional histórico.",
          ],
        },
        {
          tag: "Direito Internacional",
          title: "Direito Internacional e Conflitos Armados",
          references: bulletinReferences,
          text: "Analise as dimensões jurídicas dos conflitos armados, incluindo Direito Internacional Humanitário, regras de engajamento, proteção de civis, proporcionalidade, responsabilização e uso de tecnologias emergentes na guerra.",
          details: [
            "Avaliação jurídica de operações militares: análise de proporcionalidade, distinção, necessidade militar e proteção de civis em ataques contra áreas urbanas, infraestrutura crítica e alvos de duplo uso.",
            "Responsabilização em conflitos armados: acompanhamento de possíveis violações do Direito Internacional Humanitário, crimes de guerra, ataques indiscriminados e uso de sistemas autônomos ou semiautônomos.",
            "Tecnologias emergentes e regulação: discussão sobre drones, inteligência artificial, guerra cibernética, guerra eletrônica e sistemas autônomos à luz das normas internacionais aplicáveis aos conflitos armados.",
          ],
        },
        {
          tag: "Tecnologia na Guerra",
          title: "Armas e Sistemas",
          references: bulletinReferences,
          text: "Observe o papel de drones, mísseis, defesa aérea, guerra eletrônica, operações cibernéticas, sensores, sistemas acústicos e sistemas autônomos nos conflitos atuais.",
          details: [
            "Armamento hipersônico: a Rússia empregou pela terceira vez o míssil balístico de alcance intermediário Oreshnik. Este projétil foi projetado para contornar baterias de defesa aérea como o Patriot, pois atinge velocidades hipersônicas de até 13.000 km/h e libera múltiplas ogivas ao longo de uma trajetória de mergulho extremamente íngreme. A vulnerabilidade da Ucrânia a esses ataques foi exacerbada porque os EUA esgotaram os estoques globais de interceptadores Patriot na sua guerra com o Irã.",
            "Sistemas autônomos e drones na Ucrânia: mais de 1.000 drones russos sobrevoam diariamente os céus de Kostiantynivka. Em resposta a essa superioridade numérica, os ucranianos adotaram uma gamificação da guerra. Operadores de drones agora pontuam ao aniquilar infantaria e veículos russos, utilizando esses pontos para adquirir os melhores equipamentos disponíveis no mercado bélico online Brave1.",
            "Guerra eletrônica extrema: um jato da Força Aérea Real Britânica, transportando o secretário de defesa britânico, sofreu interferência russa que bloqueou completamente seus sinais de navegação GPS enquanto sobrevoava os arredores da Estônia. As tropas terrestres ocidentais tentam contornar a guerra eletrônica inimiga usando caixas de cigarro adaptadas que emitem bipes ao detectar frequências de drones e treinando com novos drones kamikazes desenhados especificamente para resistir a esse tipo de interferência.",
            "Vulnerabilidades cibernéticas e inteligência artificial: operações de influência russas, batizadas de Matryoshka, hackearam dezenas de contas autênticas de usuários em plataformas sociais para disseminar desinformação gerada por IA sobre o conflito ucraniano. Simultaneamente, especialistas alertaram que salvaguardas nos grandes modelos de IA podem ser facilmente burladas com o uso de poesia, instruindo os robôs a ignorarem bloqueios de segurança e a revelarem informações letais.",
          ],
        },
      ],
    },

    /*
      PARA ADICIONAR UM NOVO BOLETIM, COPIE O MODELO ABAIXO
      E COLOQUE DEPOIS DO BLOCO ACIMA.

    {
      id: "2026-05-26",
      label: "26 de maio de 2026",
      bulletin: "BOLETIM N° 02 — DIA 26 DE MAIO DE 2026",
      items: [
        {
          tag: "Monitoramento de Conflitos",
          title: "Desenvolvimentos no Campo de Batalha",
          references: [
            "Financial Times — 26.05.2026",
            "The Guardian — 26.05.2026",
            "The New York Times — 26.05.2026",
            "The Times — 26.05.2026",
            "The Washington Post — 26.05.2026",
          ],
          text: "Texto introdutório da seção.",
          featured: true,
          details: [
            "Primeiro ponto do boletim.",
            "Segundo ponto do boletim.",
            "Terceiro ponto do boletim.",
          ],
        },
      ],
    },
    */
  ],

  en: [
    {
      id: "2026-05-25",
      label: "May 25, 2026",
      bulletin: "BULLETIN No. 01 — MAY 25, 2026",
      items: [
        {
          tag: "Conflict Monitoring",
          title: "Battlefield Developments",
          references: bulletinReferences,
          text: "Follow major developments in ongoing armed conflicts, including military operations, territorial changes, escalation patterns, ceasefire negotiations, and battlefield-relevant events.",
          featured: true,
          details: [
            "U.S.–Iran Agreement: the United States and Iran reached the framework of a memorandum of understanding for a 60-day ceasefire intended to end Operation Epic Fury. The agreement includes reopening the Strait of Hormuz without Iranian tolls and the eventual lifting of the American naval blockade. However, discussions on dismantling Iranian nuclear fuel and ballistic missiles were postponed to future negotiations.",
            "Russian Offensive in Ukraine: Russia conducted one of its largest recent overnight bombardments against Ukraine, launching missiles and drones, with Kyiv as a main target and damage to civilian infrastructure and residential areas.",
            "Lebanon–Israel War: despite a formal ceasefire agreement, deadly fighting continues in Lebanon, including recent Israeli airstrikes. Israeli officials also stated that arrangements with Iran would not restrict freedom of action against Hezbollah forces.",
            "Other Violence Hotspots: attacks were also reported in Pakistan and Mali, including an attack attributed to the Balochistan Liberation Army and operations by JNIM, an Al-Qaeda-affiliated group.",
          ],
        },
        {
          tag: "Operational View",
          title: "Military Operations",
          references: bulletinReferences,
          text: "Track campaigns, force movements, strikes, defensive actions, maritime operations, air activity, and changes in operational tempo.",
          details: [
            "Ukrainian Air Defense Performance: during the latest Russian mass attack, Ukrainian air defenses intercepted most drones and cruise missiles but faced greater difficulty against faster ballistic missiles.",
            "Middle East Operations: U.S. forces maintain a severe naval blockade against Iranian ports, while Iranian suicide-drone attacks have reportedly extended pressure toward American logistical bases.",
            "NATO Posture in the Baltic Region: British forces in southern Estonia are conducting military exercises and fortifying areas near the Russian border with anti-tank ditches and dragon's teeth obstacles.",
          ],
        },
        {
          tag: "Strategic Context",
          title: "Escalation Dynamics",
          references: bulletinReferences,
          text: "Understand how local events may affect regional security, deterrence, alliances, logistics, and strategic decision-making.",
          details: [
            "Global Economic and Logistical Bottlenecks: the closure of the Strait of Hormuz by Iran triggered a global crisis, affecting industrial supply chains in East Asia, especially those dependent on naphtha.",
            "Domestic Political Pressure in the United States: the decision to seek peace with Iran produced political divisions, with criticism from Republican figures who considered the agreement strategically unfavorable.",
            "Alliance Realignment and European Concerns: reports in the United Kingdom warned that British supply chains are unprepared for a possible war with Russia, while pressure grows for increased defense spending.",
          ],
        },
        {
          tag: "International Law",
          title: "International Law and Armed Conflict",
          references: bulletinReferences,
          text: "Analyze the legal dimensions of armed conflicts, including international humanitarian law, rules of engagement, civilian protection, proportionality, accountability, and the use of emerging technologies in warfare.",
          details: [
            "Legal Assessment of Military Operations: analysis of proportionality, distinction, military necessity, and civilian protection in attacks against urban areas, critical infrastructure, and dual-use targets.",
            "Accountability in Armed Conflicts: monitoring potential violations of international humanitarian law, war crimes, indiscriminate attacks, and the use of autonomous or semi-autonomous systems.",
            "Emerging Technologies and Regulation: discussion of drones, artificial intelligence, cyber warfare, electronic warfare, and autonomous systems under the international legal framework applicable to armed conflict.",
          ],
        },
        {
          tag: "Technology in War",
          title: "Weapons and Systems",
          references: bulletinReferences,
          text: "Observe the role of drones, missiles, air defense, electronic warfare, cyber operations, sensors, acoustic systems, and autonomous systems in current conflicts.",
          details: [
            "Hypersonic Weapons: Russia reportedly used the Oreshnik intermediate-range ballistic missile, designed to evade air-defense systems and reach hypersonic speeds with multiple warheads.",
            "Autonomous Systems and Drones in Ukraine: large numbers of Russian drones reportedly operate daily over Kostiantynivka, while Ukrainian operators have adopted gamified incentive mechanisms to acquire battlefield equipment.",
            "Extreme Electronic Warfare: Russian interference reportedly blocked GPS navigation signals affecting a British aircraft near Estonia, while ground troops seek ways to detect drone frequencies and resist electronic interference.",
            "Cyber Vulnerabilities and Artificial Intelligence: Russian influence operations reportedly used hacked authentic accounts and AI-generated disinformation, while experts warned about vulnerabilities in AI safety safeguards.",
          ],
        },
      ],
    },
  ],
};

function App() {
  const [lang, setLang] = useState("pt");
  const [selectedBulletinId, setSelectedBulletinId] = useState("2026-05-25");
  const [activeTopicIndex, setActiveTopicIndex] = useState(null);

  const content = {
    en: {
      nav: {
        briefings: "Briefings",
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
        primary: "Explore Briefings",
        secondary: "Armed Conflict News",
        radarTitle: "Live Intelligence Monitor",
        radarText: "Tracking conflicts, defense technology, and operational trends",
      },

      stats: [
        ["24/7", "Monitoring mindset"],
        ["OSINT", "Open-source analysis"],
        ["AI", "Technology watch"],
        ["EW", "Electronic warfare focus"],
      ],

      core: {
        eyebrow: "Core Areas",
        title: "Intelligence and Technology Focus",
      },

      cards: [
        {
          title: "Operational Intelligence",
          text: "Briefings on force posture, battlefield dynamics, campaign evolution, and operational trends.",
          icon: "🛰️",
        },
        {
          title: "Defense Technology",
          text: "Coverage of drones, radar, electronic warfare, artificial intelligence, sensors, and autonomous systems.",
          icon: "⚙️",
        },
        {
          title: "Modern Warfare",
          text: "Analysis of contemporary conflicts, hybrid warfare, information operations, and strategic competition.",
          icon: "🌐",
        },
        {
          title: "Strategic Briefs",
          text: "Concise summaries connecting tactical events with broader geopolitical and military implications.",
          icon: "📡",
        },
        {
          title: "Armed Conflict News",
          text: "Curated updates on ongoing armed conflicts, military operations, escalation dynamics, ceasefire developments, and battlefield-relevant events.",
          icon: "🗞️",
        },
      ],

      conflicts: {
        eyebrow: "Armed Conflict News",
        title: "Updates on Ongoing Conflicts",
        referencesLabel: "References",
        selectLabel: "Select bulletin:",
        showAll: "Show all topics",
        readingHint: "Click a topic to open reading mode.",
      },

      technology: {
        eyebrow: "Technology Watch",
        title: "Emerging Defense Technologies",
        items: [
          {
            icon: "🤖",
            title: "Artificial Intelligence",
            text: "AI-enabled decision support, intelligence processing, target recognition, autonomy, and human-machine teaming.",
          },
          {
            icon: "🛸",
            title: "Drones and Autonomous Systems",
            text: "Unmanned aerial systems, loitering munitions, drone swarms, counter-UAS technologies, and autonomous platforms.",
          },
          {
            icon: "📶",
            title: "Radar and Sensors",
            text: "Surveillance systems, radar signatures, sensor fusion, electronic support measures, and detection networks.",
          },
          {
            icon: "⚡",
            title: "Electronic Warfare",
            text: "Jamming, spoofing, spectrum dominance, SIGINT, cyber-electromagnetic activities, and electromagnetic operations.",
          },
          {
            icon: "🎧",
            title: "Acoustic Warfare",
            text: "Underwater acoustics, sonar systems, passive and active detection, acoustic intelligence, anti-submarine warfare, and maritime acoustic sensing.",
          },
          {
            icon: "🛡️",
            title: "Cyber Warfare",
            text: "Cyber operations, network defense, offensive cyber capabilities, critical infrastructure protection, and the cyber dimension of modern conflict.",
          },
        ],
      },

      pipeline: {
        eyebrow: "Analysis Pipeline",
        title: "From Events to Operational Insight",
        items: [
          {
            number: "01",
            title: "Collect",
            text: "Gather open-source information from conflict reports, defense updates, and technology releases.",
          },
          {
            number: "02",
            title: "Structure",
            text: "Organize information by theater, actor, capability, sensor, platform, and operational effect.",
          },
          {
            number: "03",
            title: "Analyze",
            text: "Connect tactical developments with doctrine, technology, and strategic consequences.",
          },
          {
            number: "04",
            title: "Brief",
            text: "Deliver concise visual summaries for defense, security, and technology-oriented audiences.",
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

    pt: {
      nav: {
        briefings: "Briefings",
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
        primary: "Explorar Briefings",
        secondary: "Notícias de Conflitos",
        radarTitle: "Monitor de Inteligência",
        radarText: "Acompanhando conflitos, tecnologia de defesa e tendências operacionais",
      },

      stats: [
        ["24/7", "Mentalidade de monitoramento"],
        ["OSINT", "Análise de fontes abertas"],
        ["IA", "Observação tecnológica"],
        ["GE", "Foco em guerra eletrônica"],
      ],

      core: {
        eyebrow: "Áreas Centrais",
        title: "Foco em Inteligência e Tecnologia",
      },

      cards: [
        {
          title: "Inteligência Operacional",
          text: "Briefings sobre postura de forças, dinâmica do campo de batalha, evolução de campanhas e tendências operacionais.",
          icon: "🛰️",
        },
        {
          title: "Tecnologia de Defesa",
          text: "Cobertura sobre drones, radar, guerra eletrônica, inteligência artificial, sensores e sistemas autônomos.",
          icon: "⚙️",
        },
        {
          title: "Guerra Moderna",
          text: "Análise de conflitos contemporâneos, guerra híbrida, operações de informação e competição estratégica.",
          icon: "🌐",
        },
        {
          title: "Briefings Estratégicos",
          text: "Sínteses objetivas conectando eventos táticos a implicações geopolíticas e militares mais amplas.",
          icon: "📡",
        },
        {
          title: "Notícias sobre Conflitos Armados",
          text: "Atualizações selecionadas sobre conflitos em andamento, operações militares, dinâmicas de escalada, cessar-fogo e eventos relevantes no campo de batalha.",
          icon: "🗞️",
        },
      ],

      conflicts: {
        eyebrow: "Notícias sobre Conflitos Armados",
        title: "Atualizações sobre Conflitos em Andamento",
        referencesLabel: "Referências",
        selectLabel: "Selecionar boletim:",
        showAll: "Ver todos os tópicos",
        readingHint: "Clique em um tópico para abrir o modo leitura.",
      },

      technology: {
        eyebrow: "Observatório Tecnológico",
        title: "Tecnologias Emergentes de Defesa",
        items: [
          {
            icon: "🤖",
            title: "Inteligência Artificial",
            text: "Apoio à decisão baseado em IA, processamento de inteligência, reconhecimento de alvos, autonomia e cooperação homem-máquina.",
          },
          {
            icon: "🛸",
            title: "Drones e Sistemas Autônomos",
            text: "Sistemas aéreos não tripulados, munições vagantes, enxames de drones, tecnologias contra-UAS e plataformas autônomas.",
          },
          {
            icon: "📶",
            title: "Radar e Sensores",
            text: "Sistemas de vigilância, assinaturas radar, fusão de sensores, medidas de apoio à guerra eletrônica e redes de detecção.",
          },
          {
            icon: "⚡",
            title: "Guerra Eletrônica",
            text: "Jamming, spoofing, domínio do espectro, SIGINT, atividades cibernético-eletromagnéticas e operações no espectro eletromagnético.",
          },
          {
            icon: "🎧",
            title: "Guerra Acústica",
            text: "Acústica submarina, sistemas sonar, detecção passiva e ativa, inteligência acústica, guerra antissubmarino e sensoriamento acústico marítimo.",
          },
          {
            icon: "🛡️",
            title: "Guerra Cibernética",
            text: "Operações cibernéticas, defesa de redes, capacidades ofensivas no ciberespaço, proteção de infraestruturas críticas e dimensão cibernética dos conflitos modernos.",
          },
        ],
      },

      pipeline: {
        eyebrow: "Fluxo de Análise",
        title: "Dos Eventos ao Insight Operacional",
        items: [
          {
            number: "01",
            title: "Coletar",
            text: "Reunir informações de fontes abertas a partir de relatórios de conflito, atualizações de defesa e divulgações tecnológicas.",
          },
          {
            number: "02",
            title: "Estruturar",
            text: "Organizar informações por teatro de operações, ator, capacidade, sensor, plataforma e efeito operacional.",
          },
          {
            number: "03",
            title: "Analisar",
            text: "Conectar desenvolvimentos táticos com doutrina, tecnologia e consequências estratégicas.",
          },
          {
            number: "04",
            title: "Briefing",
            text: "Produzir sínteses visuais e objetivas para públicos voltados à defesa, segurança e tecnologia.",
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
  };

  const t = content[lang];

  const availableBulletins = bulletins[lang] || [];

  const selectedBulletin =
    availableBulletins.find((bulletin) => bulletin.id === selectedBulletinId) ||
    availableBulletins[0];

  useEffect(() => {
    setActiveTopicIndex(null);
  }, [selectedBulletinId, lang]);

  const visibleConflictItems = (selectedBulletin?.items || [])
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => activeTopicIndex === null || index === activeTopicIndex);

  const links = [
    {
      label: lang === "en" ? "My GitHub Projects" : "Meus Projetos no GitHub",
      url: "https://github.com/albuca09?tab=repositories",
    },
    {
      label: "NATO",
      url: "https://www.nato.int/",
    },
    {
      label: "U.S. Department of Defense",
      url: "https://www.defense.gov/",
    },
    {
      label: "IISS",
      url: "https://www.iiss.org/",
    },
    {
      label: "Janes",
      url: "https://www.janes.com/",
    },
    {
      label: "CSIS",
      url: "https://www.csis.org/",
    },
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
            <a href="#briefings">{t.nav.briefings}</a>
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

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">{t.hero.eyebrow}</p>

          <h1>{t.hero.title}</h1>

          <p className="subtitle">{t.hero.subtitle}</p>

          <div className="hero-buttons">
            <a href="#briefings" className="primary-button">
              {t.hero.primary}
            </a>

            <a href="#conflicts" className="secondary-button">
              {t.hero.secondary}
            </a>
          </div>
        </div>

        <div className="radar-panel">
          <div className="radar-circle">
            <div className="radar-line"></div>
          </div>

          <p>{t.hero.radarTitle}</p>
          <span>{t.hero.radarText}</span>
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

      <section id="briefings" className="section">
        <div className="section-header">
          <p className="eyebrow">{t.core.eyebrow}</p>
          <h2>{t.core.title}</h2>
        </div>

        <div className="card-grid">
          {t.cards.map((card) => (
            <article className="card" key={card.title}>
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="conflicts" className="section conflict-section">
        <div className="section-header">
          <p className="eyebrow">{t.conflicts.eyebrow}</p>
          <h2>{t.conflicts.title}</h2>

          <div className="bulletin-selector">
            <label htmlFor="bulletin-date">{t.conflicts.selectLabel}</label>

            <select
              id="bulletin-date"
              value={selectedBulletin?.id || ""}
              onChange={(event) => setSelectedBulletinId(event.target.value)}
            >
              {availableBulletins.map((bulletin) => (
                <option key={bulletin.id} value={bulletin.id}>
                  {bulletin.label}
                </option>
              ))}
            </select>
          </div>

          {selectedBulletin?.bulletin && (
            <p className="bulletin-label">{selectedBulletin.bulletin}</p>
          )}

          {activeTopicIndex === null && (
            <p className="reading-hint">{t.conflicts.readingHint}</p>
          )}

          {activeTopicIndex !== null && (
            <button
              className="show-all-button"
              onClick={() => setActiveTopicIndex(null)}
            >
              {t.conflicts.showAll}
            </button>
          )}
        </div>

        <div
          className={
            activeTopicIndex !== null
              ? "conflict-grid reading-mode"
              : "conflict-grid"
          }
        >
          {visibleConflictItems.map(({ item, index }) => (
            <article
              className={
                item.featured
                  ? "conflict-card featured-conflict"
                  : "conflict-card"
              }
              key={`${item.title}-${index}`}
            >
              <button
                className="topic-title-button"
                onClick={() =>
                  setActiveTopicIndex(activeTopicIndex === index ? null : index)
                }
              >
                <span className="tag">{item.tag}</span>
                <h3>{item.title}</h3>
              </button>

              {item.references && (
                <div className="section-references">
                  <strong>{t.conflicts.referencesLabel}:</strong>
                  <ul>
                    {item.references.map((reference) => (
                      <li key={reference}>{reference}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p>{item.text}</p>

              {item.details && (
                <ul className="detail-list">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
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
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline section">
        <div className="section-header">
          <p className="eyebrow">{t.pipeline.eyebrow}</p>
          <h2>{t.pipeline.title}</h2>
        </div>

        <div className="timeline-grid">
          {t.pipeline.items.map((item) => (
            <div className="timeline-item" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
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