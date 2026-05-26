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
  ];

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Operational Intelligence • Defense Technology • Modern Warfare</p>
          <h1>War Affairs Today</h1>
          <p className="subtitle">
            A visual intelligence briefing platform focused on modern conflicts,
            emerging defense technologies, and operational analysis.
          </p>

          <div className="hero-buttons">
            <a href="#briefings" className="primary-button">Explore Briefings</a>
            <a href="#about" className="secondary-button">About the Project</a>
          </div>
        </div>

        <div className="radar-panel">
          <div className="radar-circle">
            <div className="radar-line"></div>
          </div>
          <p>Live Intelligence Monitor</p>
          <span>Tracking defense, technology and conflict trends</span>
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

      <section className="timeline section">
        <div className="section-header">
          <p className="eyebrow">Analysis Pipeline</p>
          <h2>From Events to Operational Insight</h2>
        </div>

        <div className="timeline-grid">
          <div className="timeline-item">
            <span>01</span>
            <h3>Collect</h3>
            <p>Gather open-source information from conflict reports, defense updates, and technology releases.</p>
          </div>
          <div className="timeline-item">
            <span>02</span>
            <h3>Structure</h3>
            <p>Organize information by theater, actor, capability, sensor, platform, and operational effect.</p>
          </div>
          <div className="timeline-item">
            <span>03</span>
            <h3>Analyze</h3>
            <p>Connect tactical developments with doctrine, technology, and strategic consequences.</p>
          </div>
          <div className="timeline-item">
            <span>04</span>
            <h3>Brief</h3>
            <p>Deliver concise visual summaries for defense, security, and technology-oriented audiences.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div>
          <p className="eyebrow">About</p>
          <h2>Modern conflict explained through intelligence and technology.</h2>
        </div>
        <p>
          War Affairs Today is designed as a visual briefing hub for operational
          intelligence, defense innovation, and contemporary warfare analysis,
          with special attention to drones, sensors, radar, electronic warfare,
          artificial intelligence, and autonomous systems.
        </p>
      </section>
    </main>
  );
}

export default App;