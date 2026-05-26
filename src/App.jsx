import "./App.css";

function App() {
  const cards = [
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
  ];

  return (
    <main className="page">
      <nav className="navbar">
        <div className="logo">War Affairs Today</div>

        <div className="nav-links">
          <a href="#briefings">Briefings</a>
          <a href="#conflicts">Conflicts</a>
          <a href="#technology">Technology</a>
          <a href="#sources">Sources</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            Operational Intelligence • Defense Technology • Modern Warfare
          </p>

          <h1>War Affairs Today</h1>

          <p className="subtitle">
            A visual intelligence briefing platform focused on modern conflicts,
            emerging defense technologies, armed conflict news, and operational
            analysis.
          </p>

          <div className="hero-buttons">
            <a href="#briefings" className="primary-button">
              Explore Briefings
            </a>

            <a href="#conflicts" className="secondary-button">
              Armed Conflict News
            </a>
          </div>
        </div>

        <div className="radar-panel">
          <div className="radar-circle">
            <div className="radar-line"></div>
          </div>

          <p>Live Intelligence Monitor</p>
          <span>Tracking conflicts, defense technology, and operational trends</span>
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>24/7</strong>
          <span>Monitoring mindset</span>
        </div>

        <div>
          <strong>OSINT</strong>
          <span>Open-source analysis</span>
        </div>

        <div>
          <strong>AI</strong>
          <span>Technology watch</span>
        </div>

        <div>
          <strong>EW</strong>
          <span>Electronic warfare focus</span>
        </div>
      </section>

      <section id="briefings" className="section">
        <div className="section-header">
          <p className="eyebrow">Core Areas</p>
          <h2>Intelligence and Technology Focus</h2>
        </div>

        <div className="card-grid">
          {cards.map((card) => (
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
          <p className="eyebrow">Armed Conflict News</p>
          <h2>Updates on Ongoing Conflicts</h2>
        </div>

        <div className="conflict-grid">
          <article className="conflict-card featured-conflict">
            <span className="tag">Conflict Monitoring</span>
            <h3>Battlefield Developments</h3>
            <p>
              Follow major developments in ongoing armed conflicts, including
              military operations, territorial changes, escalation patterns,
              ceasefire negotiations, and battlefield-relevant events.
            </p>
          </article>

          <article className="conflict-card">
            <span className="tag">Operational View</span>
            <h3>Military Operations</h3>
            <p>
              Track campaigns, force movements, strikes, defensive actions,
              maritime operations, air activity, and changes in operational tempo.
            </p>
          </article>

          <article className="conflict-card">
            <span className="tag">Strategic Context</span>
            <h3>Escalation Dynamics</h3>
            <p>
              Understand how local events may affect regional security,
              deterrence, alliances, logistics, and strategic decision-making.
            </p>
          </article>

          <article className="conflict-card">
            <span className="tag">Technology in War</span>
            <h3>Weapons and Systems</h3>
            <p>
              Observe the role of drones, missiles, air defense, electronic
              warfare, cyber operations, sensors, and autonomous systems in
              current conflicts.
            </p>
          </article>
        </div>
      </section>

      <section id="technology" className="section">
        <div className="section-header">
          <p className="eyebrow">Technology Watch</p>
          <h2>Emerging Defense Technologies</h2>
        </div>

        <div className="card-grid">
          <article className="card">
            <div className="icon">🤖</div>
            <h3>Artificial Intelligence</h3>
            <p>
              AI-enabled decision support, intelligence processing, target
              recognition, autonomy, and human-machine teaming.
            </p>
          </article>

          <article className="card">
            <div className="icon">🛸</div>
            <h3>Drones and Autonomous Systems</h3>
            <p>
              Unmanned aerial systems, loitering munitions, drone swarms,
              counter-UAS technologies, and autonomous platforms.
            </p>
          </article>

          <article className="card">
            <div className="icon">📶</div>
            <h3>Radar and Sensors</h3>
            <p>
              Surveillance systems, radar signatures, sensor fusion, electronic
              support measures, and detection networks.
            </p>
          </article>

          <article className="card">
            <div className="icon">⚡</div>
            <h3>Electronic Warfare</h3>
            <p>
              Jamming, spoofing, spectrum dominance, SIGINT, cyber-electromagnetic
              activities, and electromagnetic operations.
            </p>
          </article>
        </div>
      </section>

      <section className="timeline section">
        <div className="section-header">
          <p className="eyebrow">Analysis Pipeline</p>
          <h2>From Events to Operational Insight</h2>
        </div>

        <div className="timeline-grid">
          <div className="timeline-item">
            <span>01</span>
            <h3>Collect</h3>
            <p>
              Gather open-source information from conflict reports, defense
              updates, and technology releases.
            </p>
          </div>

          <div className="timeline-item">
            <span>02</span>
            <h3>Structure</h3>
            <p>
              Organize information by theater, actor, capability, sensor,
              platform, and operational effect.
            </p>
          </div>

          <div className="timeline-item">
            <span>03</span>
            <h3>Analyze</h3>
            <p>
              Connect tactical developments with doctrine, technology, and
              strategic consequences.
            </p>
          </div>

          <div className="timeline-item">
            <span>04</span>
            <h3>Brief</h3>
            <p>
              Deliver concise visual summaries for defense, security, and
              technology-oriented audiences.
            </p>
          </div>
        </div>
      </section>

      <section id="sources" className="section">
        <div className="section-header">
          <p className="eyebrow">Sources</p>
          <h2>Useful Defense and Intelligence Links</h2>
        </div>

        <div className="link-grid">
          <a href="https://www.nato.int/" target="_blank" rel="noopener noreferrer">
            NATO
          </a>

          <a href="https://www.defense.gov/" target="_blank" rel="noopener noreferrer">
            U.S. Department of Defense
          </a>

          <a href="https://www.iiss.org/" target="_blank" rel="noopener noreferrer">
            IISS
          </a>

          <a href="https://www.janes.com/" target="_blank" rel="noopener noreferrer">
            Janes
          </a>

          <a href="https://www.csis.org/" target="_blank" rel="noopener noreferrer">
            CSIS
          </a>

          <a href="https://www.understandingwar.org/" target="_blank" rel="noopener noreferrer">
            Institute for the Study of War
          </a>
        </div>
      </section>

      <section id="about" className="about">
        <div>
          <p className="eyebrow">About</p>
          <h2>Modern conflict explained through intelligence and technology.</h2>
        </div>

        <p>
          War Affairs Today is designed as a visual briefing hub for operational
          intelligence, defense innovation, armed conflict news, and contemporary
          warfare analysis, with special attention to drones, sensors, radar,
          electronic warfare, artificial intelligence, and autonomous systems.
        </p>
      </section>
    </main>
  );
}

export default App;