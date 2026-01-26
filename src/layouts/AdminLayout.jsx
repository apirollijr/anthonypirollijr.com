import { Outlet, NavLink } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <NavLink to="/admin">Admin Panel</NavLink>
        </div>
        <nav className="admin-nav">
          <ul>
            <li>
              <NavLink to="/admin" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/">← Back to Site</NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
