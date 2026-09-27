const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const analyze = (inputs) =>
  request('/api/analyze', { method: 'POST', body: JSON.stringify(inputs) });

export const getHistory = () => request('/api/analyses');

export const getAnalysis = (id) => request(`/api/analyses/${id}`);

export const deleteAnalysis = (id) =>
  request(`/api/analyses/${id}`, { method: 'DELETE' });
