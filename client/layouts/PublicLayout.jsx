import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="public-layout">
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <NavLink to="/">Anthony Pirolli Jr</NavLink>
          </div>

          {/* Hamburger Button */}
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Navigation Links */}
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/github">GitHub</NavLink>
            </li>
            <li>
              <NavLink to="/websites">Websites</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>

          {/* Overlay */}
          {menuOpen && <div className="nav-overlay" onClick={toggleMenu}></div>}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Anthony Pirolli Jr. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default PublicLayout;
