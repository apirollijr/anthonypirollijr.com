import { Outlet, NavLink } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="public-layout">
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <NavLink to="/">Anthony Pirolli Jr</NavLink>
          </div>
          <ul className="nav-links">
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
