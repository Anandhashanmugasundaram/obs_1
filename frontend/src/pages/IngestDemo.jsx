import React, { useState } from 'react';
import { ingest } from '../api';

export default function IngestDemo(){
  const [svc, setSvc] = useState('payments');
  const [type, setType] = useState('metric');
  const [metricName, setMetricName] = useState('latency');
  const [value, setValue] = useState(200);
  const [msg, setMsg] = useState('demo log');

  async function send() {
    if (type === 'metric') {
      await ingest({
        type: 'metric', service: svc, timestamp: new Date().toISOString(),
        fields: { name: metricName, value: Number(value) }
      });
    } else {
      await ingest({
        type: 'log', service: svc, timestamp: new Date().toISOString(),
        fields: { level: 'error', message: msg }
      });
    }
    alert('sent');
  }

  return (
    <div className="card">
      <h3>Ingest Demo</h3>
      <div className="filters">
        <select value={svc} onChange={e=>setSvc(e.target.value)} className="input" style={{width:150}}>
          <option>payments</option><option>checkout</option><option>users</option>
        </select>
        <select value={type} onChange={e=>setType(e.target.value)} className="input" style={{width:150}}>
          <option value="metric">metric</option><option value="log">log</option>
        </select>
      </div>
      {type === 'metric' ? (
        <div>
          <div className="small">Metric name</div>
          <input className="input" value={metricName} onChange={e=>setMetricName(e.target.value)} />
          <div className="small">Value</div>
          <input className="input" type="number" value={value} onChange={e=>setValue(Number(e.target.value))} />
        </div>
      ) : (
        <div>
          <div className="small">Message</div>
          <input className="input" value={msg} onChange={e=>setMsg(e.target.value)} />
        </div>
      )}
      <div style={{marginTop:8}}>
        <button className="button" onClick={send}>Send</button>
      </div>
    </div>
  );
}
