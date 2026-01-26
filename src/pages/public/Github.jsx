import { useState, useEffect } from 'react';

function Github() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'apirollijr';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();

        // Filter out forked repos (optional - remove if you want to show forks)
        const ownRepos = data.filter((repo) => !repo.fork);

        setRepos(ownRepos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  // Get language color (simplified version)
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Java: '#b07219',
      'C#': '#178600',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#A97BFF',
    };
    return colors[language] || '#8b8b8b';
  };

  if (loading) {
    return (
      <div className="page github-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading repositories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page github-page">
        <div className="error">
          <h2>Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page github-page">
      <header className="page-header">
        <h1>GitHub Projects</h1>
        <p className="page-subtitle">
          Explore my open source projects and contributions
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          View GitHub Profile →
        </a>
      </header>

      <div className="repos-grid">
        {repos.map((repo) => (
          <article key={repo.id} className="repo-card">
            <div className="repo-card-header">
              <h3 className="repo-name">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h3>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-demo-link"
                  title="Live Demo"
                >
                  🔗
                </a>
              )}
            </div>

            <p className="repo-description">
              {repo.description || 'No description available'}
            </p>

            <div className="repo-meta">
              {repo.language && (
                <span className="repo-language">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  {repo.language}
                </span>
              )}

              <span className="repo-stars" title="Stars">
                ⭐ {repo.stargazers_count}
              </span>

              <span className="repo-forks" title="Forks">
                🔀 {repo.forks_count}
              </span>
            </div>

            <div className="repo-footer">
              <span className="repo-updated">
                Updated {formatDate(repo.updated_at)}
              </span>

              {repo.topics && repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {repos.length === 0 && (
        <div className="no-repos">
          <p>No repositories found.</p>
        </div>
      )}
    </div>
  );
}

export default Github;
