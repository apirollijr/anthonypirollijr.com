import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Github from './pages/public/Github';
import Websites from './pages/public/Websites.jsx';
import About from './pages/public/About.jsx';
import Contact from './pages/public/Contact';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/github" element={<Github />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
