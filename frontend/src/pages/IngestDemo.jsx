import React, { useState } from 'react';
import { ingest } from '../api';

export default function IngestDemo() {
  const [svc, setSvc] = useState('payments');
  const [type, setType] = useState('metric');
  const [metricName, setMetricName] = useState('latency');
  const [value, setValue] = useState(200);
  const [msg, setMsg] = useState('demo log');

  async function send() {
    if (type === 'metric') {
      await ingest({
        type: 'metric',
        service: svc,
        timestamp: new Date().toISOString(),
        fields: { name: metricName, value: Number(value) }
      });
    } else {
      await ingest({
        type: 'log',
        service: svc,
        timestamp: new Date().toISOString(),
        fields: { level: 'error', message: msg }
      });
    }
    alert('Sent successfully');
  }

  return (
    <div className=" min-h-screen bg-gray-900 p-5 rounded-lg shadow-md space-y-4 text-white">
      <h3 className="text-xl font-semibold">Ingest Demo</h3>

      <div className="flex gap-3 flex-wrap">
        <select
          value={svc}
          onChange={e => setSvc(e.target.value)}
          className="bg-black text-white border border-gray-700 px-3 py-2 rounded"
        >
          <option>payments</option>
          <option>checkout</option>
          <option>users</option>
        </select>

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="bg-black text-white border border-gray-700 px-3 py-2 rounded"
        >
          <option value="metric">metric</option>
          <option value="log">log</option>
        </select>
      </div>

      {type === 'metric' ? (
        <div className="space-y-2">
          <div className="text-gray-400 text-sm">Metric name</div>
          <input
            className="bg-black text-white border border-gray-700 px-3 py-2 rounded w-full"
            value={metricName}
            onChange={e => setMetricName(e.target.value)}
          />

          <div className="text-gray-400 text-sm">Value</div>
          <input
            type="number"
            className="bg-black text-white border border-gray-700 px-3 py-2 rounded w-full"
            value={value}
            onChange={e => setValue(Number(e.target.value))}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-gray-400 text-sm">Message</div>
          <input
            className="bg-black text-white border border-gray-700 px-3 py-2 rounded w-full"
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={send}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2"
      >
        Send
      </button>
    </div>
  );
}
