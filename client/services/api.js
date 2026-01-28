const API_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const websiteService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/websites`);
    if (!response.ok) throw new Error('Failed to fetch websites');
    return response.json();
  },

  getOne: async (id) => {
    const response = await fetch(`${API_URL}/websites/${id}`);
    if (!response.ok) throw new Error('Failed to fetch website');
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(`${API_URL}/websites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create website');
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/websites/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update website');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/websites/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete website');
    return response.json();
  },
};

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

export const contactService = {
  submit: async (data) => {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
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
