export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';
type Session = { access_token: string; refresh_token?: string; expires_at?: number };
const storage = () => typeof localStorage === 'undefined' ? null : localStorage;
function setSession(session: Session) {
 storage()?.setItem('access_token', session.access_token);
 if (session.refresh_token) storage()?.setItem('refresh_token', session.refresh_token);
 if (session.expires_at) storage()?.setItem('expires_at', String(session.expires_at));
}
function removeToken() { for (const key of ['access_token', 'refresh_token', 'expires_at']) storage()?.removeItem(key); }
let refreshing: Promise<boolean> | null = null;
async function send(url: string, options: RequestInit): Promise<Response> {
 const delays = options.method === 'GET' ? [250, 750] : [];
 for (let attempt = 0; ; attempt++) {
  try { return await fetch(url, options); }
  catch (error) {
   if (!(error instanceof TypeError)) throw error;
   if (attempt >= delays.length) throw new Error('Unable to connect to the server. Please try again in a moment.');
   await new Promise(resolve => setTimeout(resolve, delays[attempt]));
  }
 }
}
async function refresh() {
 if (!refreshing) refreshing = (async () => {
  const token = storage()?.getItem('refresh_token');
  if (!token) return false;
  const response = await send(`${API_URL}/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: token }) });
  if (!response.ok) { removeToken(); return false; }
  const { data } = await response.json();
  if (!data.session) { removeToken(); return false; }
  setSession(data.session); return true;
 })().finally(() => { refreshing = null; });
 return refreshing;
}
async function request<T>(method: string, endpoint: string, body?: unknown, retry = true): Promise<T> {
 const headers: Record<string, string> = {};
 const token = storage()?.getItem('access_token');
 if (token) headers.Authorization = `Bearer ${token}`;
 const multipart = body instanceof FormData;
 if (body !== undefined && !multipart) headers['Content-Type'] = 'application/json';
 const response = await send(`${API_URL}${endpoint}`, { method, headers, body: body === undefined ? undefined : multipart ? body : JSON.stringify(body) });
 if (response.status === 401 && retry && (!endpoint.startsWith('/auth/') || endpoint === '/auth/me') && await refresh()) return request<T>(method, endpoint, body, false);
 if (!response.ok) {
  const data = await response.json().catch(() => null);
  const error = data?.error;
  throw new Error(typeof error === 'string' ? error : error?.issues?.map((issue: { message: string }) => issue.message).join(', ') || data?.message || response.statusText);
 }
 return response.status === 204 ? {} as T : response.json();
}
export const api = {
 get: <T>(endpoint: string, params?: Record<string, unknown>) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) if (value !== undefined && value !== null) query.set(key, String(value));
  return request<T>('GET', `${endpoint}${query.size ? `?${query}` : ''}`);
 },
 post: <T>(endpoint: string, body: unknown) => request<T>('POST', endpoint, body),
 put: <T>(endpoint: string, body: unknown) => request<T>('PUT', endpoint, body),
 delete: <T>(endpoint: string) => request<T>('DELETE', endpoint),
 upload: (body: FormData) => request<{ publicUrl: string; path: string }>('POST', '/storage/upload', body),
 setSession, refresh, removeToken,
 setToken: (token: string) => storage()?.setItem('access_token', token),
 getToken: () => storage()?.getItem('access_token') || null,
};
