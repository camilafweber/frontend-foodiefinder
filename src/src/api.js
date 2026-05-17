export const api = (path) => fetch(`/api${path}`).then((r) => r.json());
