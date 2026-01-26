const API_URL = 'http://localhost:3000/api';

// Get auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ===== WEBSITES =====
export const websiteService = {
  // Get all websites (public)
  getAll: async () => {
    const response = await fetch(`${API_URL}/websites`);
    if (!response.ok) throw new Error('Failed to fetch websites');
    return response.json();
  },

  // Get single website (public)
  getOne: async (id) => {
    const response = await fetch(`${API_URL}/websites/${id}`);
    if (!response.ok) throw new Error('Failed to fetch website');
    return response.json();
  },

  // Create website (admin)
  create: async (data) => {
    const response = await fetch(`${API_URL}/websites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create website');
    return response.json();
  },

  // Update website (admin)
  update: async (id, data) => {
    const response = await fetch(`${API_URL}/websites/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update website');
    return response.json();
  },

  // Delete website (admin)
  delete: async (id) => {
    const response = await fetch(`${API_URL}/websites/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete website');
    return response.json();
  },
};

// ===== AUTH =====
export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ===== CONTACT =====
export const contactService = {
  submit: async (data) => {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }
    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/contact`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },
};
