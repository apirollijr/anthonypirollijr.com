import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-title">Anthony Pirolli Jr</h1>
        <p className="hero-subtitle">
          A passionate full-stack developer creating modern web experiences with
          clean code and thoughtful design.
        </p>
        <div className="hero-buttons">
          <Link to="/websites" className="btn btn-primary">
            View My Work
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="section-title">What I Do</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon">💻</div>
            <h3>Frontend Development</h3>
            <p>
              Building responsive, interactive user interfaces with React,
              modern CSS, and a focus on user experience.
            </p>
          </div>
          <div className="skill-card">
            <div className="skill-icon">⚙️</div>
            <h3>Backend Development</h3>
            <p>
              Creating robust APIs and server-side applications with Node.js,
              Express, and various databases.
            </p>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🚀</div>
            <h3>Full-Stack Solutions</h3>
            <p>
              Delivering complete web applications from concept to deployment,
              with modern DevOps practices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
