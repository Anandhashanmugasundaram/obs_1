const BASE = "https://obs-p072.onrender.com/"

export async function ingest(item) {
  const res = await fetch(`${BASE}/ingest`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function generateMock() {
  const res = await fetch(`${BASE}/mock/generate`, { method: 'POST' });
  return res.json();
}

export async function listServices() {
  const logs = await fetch(`${BASE}/logs?limit=1`).then(r=>r.json()).catch(()=>({logs:[]}));
  const services = new Set();
  (logs.logs||[]).forEach(l=>services.add(l.service));
  ['payments','checkout','users'].forEach(s=>services.add(s));
  return Array.from(services);
}

export async function getMetrics(service, metric, from, to, resolutionMs=60000) {
  const params = new URLSearchParams({ service, metric, resolutionMs: String(resolutionMs) });
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  const res = await fetch(`${BASE}/metrics?${params.toString()}`);
  return res.json();
}

export async function getLogs({ service, level, q, from, to, limit=200, offset=0 }) {
  const params = new URLSearchParams();
  if (service) params.set('service', service);
  if (level) params.set('level', level);
  if (q) params.set('q', q);
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  const res = await fetch(`${BASE}/logs?${params.toString()}`);
  return res.json();
}

export async function getAlerts() {
  const res = await fetch(`${BASE}/alerts`);
  return res.json();
}

export async function ackAlert(id) {
  const res = await fetch(`${BASE}/alerts/ack`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id })
  });
  return res.json();
}
