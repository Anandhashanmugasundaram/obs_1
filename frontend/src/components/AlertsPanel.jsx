import React from 'react';

export default function AlertsPanel({ alerts = [], onAck }) {
  return (
    <div className="card">
      <h4>Alerts</h4>
      {alerts.length === 0 && <div className="small">No active alerts</div>}
      {alerts.map(a => (
        <div key={a.id} className="service-item">
          <div>
            <div><strong>{a.name}</strong> <span className="small">for {a.service}</span></div>
            <div className="small">rate: {(a.value*100).toFixed(1)}% &nbsp; threshold: {(a.threshold*100).toFixed(1)}%</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div>{a.acknowledged ? <span className="badge">ACKED</span> : <button className="button" onClick={()=>onAck(a.id)}>Acknowledge</button>}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
