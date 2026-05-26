import { useState } from "react";
import "./App.css";

function App() {
  const [lang, setLang] = useState("en");

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
        items: [
          {
            tag: "Conflict Monitoring",
            title: "Battlefield Developments",
            text: "Follow major developments in ongoing armed conflicts, including military operations, territorial changes, escalation patterns, ceasefire negotiations, and battlefield-relevant events.",
            featured: true,
          },
          {
            tag: "Operational View",
            title: "Military Operations",
            text: "Track campaigns, force movements, strikes, defensive actions, maritime operations, air activity, and changes in operational tempo.",
          },
          {
            tag: "Strategic Context",
            title: "Escalation Dynamics",
            text: "Understand how local events may affect regional security, deterrence, alliances, logistics, and strategic decision-making.",
          },
          {
            tag: "International Law",
            title: "International Law and Armed Conflict",
            text: "Analyze the legal dimensions of armed conflicts, including international humanitarian law, rules of engagement, civilian protection, proportionality, accountability, and the use of emerging technologies in warfare.",
          },
          {
            tag: "Technology in War",
            title: "Weapons and Systems",
            text: "Observe the role of drones, missiles, air defense, electronic warfare, cyber operations, sensors, acoustic systems, and autonomous systems in current conflicts.",
          },
        ],
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
        items: [
          {
            tag: "Monitoramento de Conflitos",
            title: "Desenvolvimentos no Campo de Batalha",
            text: "Acompanhe os principais acontecimentos em conflitos armados em andamento, incluindo operações militares, mudanças territoriais, padrões de escalada, negociações de cessar-fogo e eventos relevantes no campo de batalha.",
            featured: true,
          },
          {
            tag: "Visão Operacional",
            title: "Operações Militares",
            text: "Acompanhe campanhas, movimentações de forças, ataques, ações defensivas, operações marítimas, atividade aérea e mudanças no ritmo operacional.",
          },
          {
            tag: "Contexto Estratégico",
            title: "Dinâmicas de Escalada",
            text: "Entenda como eventos locais podem afetar a segurança regional, a dissuasão, alianças, logística e processos de decisão estratégica.",
          },
          {
            tag: "Direito Internacional",
            title: "Direito Internacional e Conflitos Armados",
            text: "Analise as dimensões jurídicas dos conflitos armados, incluindo Direito Internacional Humanitário, regras de engajamento, proteção de civis, proporcionalidade, responsabilização e uso de tecnologias emergentes na guerra.",
          },
          {
            tag: "Tecnologia na Guerra",
            title: "Armas e Sistemas",
            text: "Observe o papel de drones, mísseis, defesa aérea, guerra eletrônica, operações cibernéticas, sensores, sistemas acústicos e sistemas autônomos nos conflitos atuais.",
          },
        ],
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
        </div>

        <div className="conflict-grid">
          {t.conflicts.items.map((item) => (
            <article
              className={
                item.featured
                  ? "conflict-card featured-conflict"
                  : "conflict-card"
              }
              key={item.title}
            >
              <span className="tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
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