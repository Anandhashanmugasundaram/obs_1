import React, { useState, useEffect } from 'react';
import { getLogs } from '../api';

export default function LogsViewer({ service }) {
  const [level, setLevel] = useState('');
  const [q, setQ] = useState('');
  const [logs, setLogs] = useState([]);
  const [limit, setLimit] = useState(200);

  async function load() {
    const res = await getLogs({
      service,
      level: level || undefined,
      q: q || undefined,
      limit,
    });
    setLogs(res.logs || []);
  }

  useEffect(() => { load(); }, [service, level, q, limit]);

  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-md">
      <h4 className="text-lg mb-4 font-semibold">
        Logs {service ? `- ${service}` : ''}
      </h4>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="bg-black text-white border border-gray-700 px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="info">Info</option>
          <option value="error">Error</option>
          <option value="warn">Warn</option>
        </select>

        <input
          className="bg-black text-white border border-gray-700 px-3 py-2 rounded flex-1 min-w-[150px]"
          placeholder="search text"
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <input
          type="number"
          value={limit}
          onChange={e => setLimit(Number(e.target.value))}
          className="bg-black text-white border border-gray-700 px-3 py-2 rounded w-20"
        />

        <button
          onClick={load}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Refresh
        </button>
      </div>

      {/* Logs */}
      <div className="space-y-4 max-h-80 overflow-auto pr-2">
        {logs.length === 0 && (
          <div className="text-gray-400 text-sm">No logs</div>
        )}

        {logs.map((l, i) => (
          <div key={i} className="bg-gray-800 p-3 rounded">
            <div className="flex justify-between">
              <div>
                <strong className={l.level === 'error' ? 'text-red-400' : 'text-blue-400'}>
                  [{l.level}]
                </strong>
                &nbsp; {new Date(l.timestamp).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">{l.service}</div>
            </div>
            <div className="mt-1">{l.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
