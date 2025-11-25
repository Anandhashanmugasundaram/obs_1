import React, { useEffect, useState } from 'react';
import AlertsPanel from '../components/AlertsPanel';
import { getAlerts, ackAlert } from '../api';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  async function load() {
    const res = await getAlerts();
    setAlerts(res.alerts || []);
  }

  async function ack(id) {
    await ackAlert(id);
    load();
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <div className="bg-gray-900 p-4 rounded-md shadow-md">
        <h3 className="text-xl font-semibold">Global Alerts</h3>
      </div>

      <AlertsPanel alerts={alerts} onAck={ack} />
    </div>
  );
}
