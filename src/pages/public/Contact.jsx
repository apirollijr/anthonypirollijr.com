import { useState } from 'react';
import { contactService } from '../../services/api';
import { Helmet } from 'react-helmet-async';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      await contactService.submit(formData);
      setStatus({
        type: 'success',
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page contact-page">
      <header className="page-header">
        <h1>Get In Touch</h1>
        <p className="page-subtitle">
          Have a question or want to work together? Send me a message!
        </p>
      </header>

      <div className="contact-container">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          {status.message && (
            <div className={`form-status ${status.type}`}>{status.message}</div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <aside className="contact-info">
          <h2>Contact Info</h2>

          <div className="info-item">
            <span className="info-icon">📧</span>
            <div>
              <h3>Email</h3>
              <a href="mailto:apirollijr.dev@gmail.com">
                apirollijr.dev@gmail.com
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h3>Location</h3>
              <p>New Jersey, USA</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">💼</span>
            <div>
              <h3>LinkedIn</h3>
              <a
                href="https://linkedin.com/in/anthony-pirolli-jr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/anthony-pirolli-jr
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">🐙</span>
            <div>
              <h3>GitHub</h3>
              <a
                href="https://github.com/apirollijr"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/apirollijr
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Contact;
