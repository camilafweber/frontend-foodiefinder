export const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export const api = (path) =>
  fetch(`${API_BASE}/api${path}`).then((response) => {
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  });
