import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { websiteService, authService } from '../../services/api';

function AdminDashboard() {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    imageUrl: '',
    readmeUrl: '',
    technologies: '',
    featured: false,
    status: 'live',
    order: 0,
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch websites on mount
  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const data = await websiteService.getAll();
      setWebsites(data);
      setLoading(false);
    } catch (_err) {
      console.error('Failed to fetch websites:', _err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      imageUrl: '',
      readmeUrl: '',
      technologies: '',
      featured: false,
      status: 'live',
      order: 0,
    });
    setEditingWebsite(null);
    setShowForm(false);
    setFormError('');
  };

  const handleEdit = (website) => {
    setFormData({
      title: website.title,
      description: website.description,
      url: website.url,
      imageUrl: website.imageUrl || '',
      readmeUrl: website.readmeUrl || '',
      technologies: website.technologies?.join(', ') || '',
      featured: website.featured,
      status: website.status,
      order: website.order || 0,
    });
    setEditingWebsite(website);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    // Prepare data
    const submitData = {
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
      order: parseInt(formData.order) || 0,
    };

    try {
      if (editingWebsite) {
        await websiteService.update(editingWebsite._id, submitData);
      } else {
        await websiteService.create(submitData);
      }
      await fetchWebsites();
      resetForm();
    } catch (err) {
      setFormError(err.message || 'Failed to save website');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this website?')) {
      return;
    }

    try {
      await websiteService.delete(id);
      await fetchWebsites();
    } catch (err) {
      console.error('Failed to fetch websites:', err);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </header>

      {/* Websites Section */}
      <section className="admin-section">
        <div className="section-header">
          <h2>Websites ({websites.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add Website'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="admin-form">
            <h3>{editingWebsite ? 'Edit Website' : 'Add New Website'}</h3>

            {formError && <div className="form-error">{formError}</div>}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="url">Website URL *</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="readmeUrl">GitHub/Code URL</label>
                <input
                  type="url"
                  id="readmeUrl"
                  name="readmeUrl"
                  value={formData.readmeUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/you/repo"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="technologies">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="live">Live</option>
                  <option value="in-progress">In Progress</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="order">Display Order</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  Featured
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formLoading}
              >
                {formLoading
                  ? 'Saving...'
                  : editingWebsite
                    ? 'Update Website'
                    : 'Add Website'}
              </button>
            </div>
          </form>
        )}

        {/* Websites Table */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((site) => (
                <tr key={site._id}>
                  <td>{site.order || 0}</td>
                  <td>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.title}
                    </a>
                  </td>
                  <td>
                    <span className={`status-pill status-${site.status}`}>
                      {site.status}
                    </span>
                  </td>
                  <td>{site.featured ? '⭐' : '-'}</td>
                  <td className="actions-cell">
                    <button
                      onClick={() => handleEdit(site)}
                      className="btn-icon"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(site._id)}
                      className="btn-icon btn-danger"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {websites.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No websites yet. Add your first one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
