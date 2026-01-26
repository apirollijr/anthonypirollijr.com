import { useState, useEffect } from 'react';
import { websiteService } from '../../services/api';
import { Helmet } from 'react-helmet-async';

function Websites() {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const data = await websiteService.getAll();
        setWebsites(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  // Filter websites by status
  const filteredWebsites = websites.filter((site) => {
    if (filter === 'all') return true;
    return site.status === filter;
  });

  // Get featured websites
  const featuredWebsites = filteredWebsites.filter((site) => site.featured);
  const regularWebsites = filteredWebsites.filter((site) => !site.featured);

  const getStatusBadge = (status) => {
    const badges = {
      live: { label: 'Live', className: 'badge-live' },
      'in-progress': { label: 'In Progress', className: 'badge-progress' },
      archived: { label: 'Archived', className: 'badge-archived' },
    };
    return badges[status] || badges.live;
  };

  if (loading) {
    return (
      <div className="page websites-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading websites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page websites-page">
        <div className="error">
          <h2>Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page websites-page">
      <header className="page-header">
        <h1>My Websites</h1>
        <p className="page-subtitle">
          A collection of websites and web applications I've built
        </p>
      </header>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'live' ? 'active' : ''}`}
          onClick={() => setFilter('live')}
        >
          Live
        </button>
        <button
          className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          In Progress
        </button>
        <button
          className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
          onClick={() => setFilter('archived')}
        >
          Archived
        </button>
      </div>

      {/* Featured Websites */}
      {featuredWebsites.length > 0 && (
        <section className="featured-section">
          <h2 className="section-title">⭐ Featured Projects</h2>
          <div className="websites-grid featured-grid">
            {featuredWebsites.map((site) => (
              <WebsiteCard
                key={site._id}
                site={site}
                getStatusBadge={getStatusBadge}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* All Websites */}
      <section className="websites-section">
        {featuredWebsites.length > 0 && (
          <h2 className="section-title">All Projects</h2>
        )}
        <div className="websites-grid">
          {regularWebsites.map((site) => (
            <WebsiteCard
              key={site._id}
              site={site}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </div>
      </section>

      {filteredWebsites.length === 0 && (
        <div className="no-websites">
          <p>No websites found.</p>
        </div>
      )}
    </div>
  );
}

// Website Card Component
function WebsiteCard({ site, getStatusBadge, featured }) {
  const badge = getStatusBadge(site.status);

  return (
    <article className={`website-card ${featured ? 'featured' : ''}`}>
      {site.imageUrl && (
        <div className="website-image">
          <img src={site.imageUrl} alt={site.title} />
          <span className={`status-badge ${badge.className}`}>
            {badge.label}
          </span>
        </div>
      )}

      <div className="website-content">
        <h3 className="website-title">{site.title}</h3>
        <p className="website-description">{site.description}</p>

        {site.technologies && site.technologies.length > 0 && (
          <div className="website-tech">
            {site.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="website-links">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Visit Site →
          </a>
          {site.readmeUrl && (
            <a
              href={site.readmeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default Websites;
