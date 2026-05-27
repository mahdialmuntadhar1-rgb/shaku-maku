// Cloudflare Worker — Frontend + API Proxy
// All /api/* requests are proxied to the backend worker.
// This eliminates CORS issues by keeping everything same-origin.

const BACKEND_URL = 'https://iraq-businesses-dashboard.mahdialmuntadhar1.workers.dev';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Debug ping
    if (url.pathname === '/ping') {
      return new Response(JSON.stringify({ ok: true, pathname: url.pathname }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Proxy all /api/* requests to the backend
    if (url.pathname.startsWith('/api/')) {
      const backendUrl = `${BACKEND_URL}${url.pathname}${url.search}`;

      const proxyRequest = new Request(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      });

      try {
        const backendResponse = await fetch(proxyRequest);
        const responseBody = await backendResponse.arrayBuffer();

        const headers = new Headers(backendResponse.headers);
        // Inject CORS headers on every proxied response
        Object.entries(CORS_HEADERS).forEach(([k, v]) => headers.set(k, v));
        headers.set('Content-Type', backendResponse.headers.get('Content-Type') || 'application/json');

        return new Response(responseBody, {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
          headers,
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: 'Proxy error: backend unreachable' }), {
          status: 502,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }
    }

    // All other requests: serve static assets (SPA)
    return env.ASSETS.fetch(request);
  },
};
