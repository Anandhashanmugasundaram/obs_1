import React, { useEffect, useState } from 'react';
import AlertsPanel from '../components/AlertsPanel';
import { getAlerts, ackAlert } from '../api';

export default function AlertsPage(){
  const [alerts, setAlerts] = useState([]);

  async function load(){ const res = await getAlerts(); setAlerts(res.alerts || []); }
  async function ack(id){ await ackAlert(id); load(); }

  useEffect(()=>{ load(); const t = setInterval(load, 5000); return ()=>clearInterval(t); }, []);

  return (
    <>
      <div className="card"><h3>Global Alerts</h3></div>
      <AlertsPanel alerts={alerts} onAck={ack} />
    </>
  );
}
