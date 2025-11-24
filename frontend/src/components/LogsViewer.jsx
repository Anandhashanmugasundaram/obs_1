import React, { useState, useEffect } from 'react';
import { getLogs } from '../api';

export default function LogsViewer({ service }) {
  const [level, setLevel] = useState('');
  const [q, setQ] = useState('');
  const [logs, setLogs] = useState([]);
  const [limit, setLimit] = useState(200);

  async function load() {
    const res = await getLogs({ service, level: level || undefined, q: q || undefined, limit });
    setLogs(res.logs || []);
  }

  useEffect(()=>{ load(); }, [service, level, q, limit]);

  return (
    <div className="card">
      <h4>Logs {service ? `- ${service}` : ''}</h4>
      <div className="filters">
        <select value={level} onChange={e=>setLevel(e.target.value)} className="input" style={{width:120}}>
          <option value="">All</option>
          <option value="info">Info</option>
          <option value="error">Error</option>
          <option value="warn">Warn</option>
        </select>
        <input className="input" placeholder="search text" value={q} onChange={e=>setQ(e.target.value)} />
        <input className="input" style={{width:80}} type="number" value={limit} onChange={e=>setLimit(Number(e.target.value))} />
        <button className="button" onClick={load}>Refresh</button>
      </div>
      <div className="logs">
        {logs.map((l, i) => (
          <div key={i} className="log-item">
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div><strong className={l.level === 'error' ? 'level-error' : 'level-info'}>[{l.level}]</strong> {new Date(l.timestamp).toLocaleString()}</div>
              <div className="small">{l.service}</div>
            </div>
            <div>{l.message}</div>
          </div>
        ))}
        {logs.length === 0 && <div className="small">No logs</div>}
      </div>
    </div>
  );
}
