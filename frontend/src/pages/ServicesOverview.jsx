import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateMock, getAlerts } from '../api';

export default function ServicesOverview(){
  const [services, setServices] = useState(['payments','checkout','users']);
  const [alerts, setAlerts] = useState([]);

  async function loadAlerts(){
    const res = await getAlerts();
    setAlerts(res.alerts || []);
  }

  useEffect(()=>{ loadAlerts(); }, []);

  function countAlertsFor(svc){
    return alerts.filter(a=>a.service===svc).length;
  }

  async function makeMock(){
    await generateMock();
    await loadAlerts();
    alert('Mock data generated (1 hour). Refresh pages to see data.');
  }

  return (
    <>
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h3>Services</h3>
            <div className="small">Monitored services</div>
          </div>
          <div>
            <button className="button" onClick={makeMock}>Generate Mock Data</button>
          </div>
        </div>
      </div>

      <div className="card">
        {services.map(s => (
          <div key={s} className="service-item">
            <div>
              <div style={{fontWeight:700}}>{s}</div>
              <div className="small">Health: <span className="badge">OK</span></div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <div className="small">{countAlertsFor(s)} active alerts</div>
              <Link to={`/service/${s}`}><button className="button">Open</button></Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
