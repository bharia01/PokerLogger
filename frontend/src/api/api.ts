const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(
  endpoint: string,
  method: string = 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
  token?: string
) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = res

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'API request failed');
  }

  return data;
}
