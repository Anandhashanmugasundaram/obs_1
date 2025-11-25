import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateMock, getAlerts } from '../api';

export default function ServicesOverview() {
  const [services, setServices] = useState(['payments', 'checkout', 'users']);
  const [alerts, setAlerts] = useState([]);

  async function loadAlerts() {
    const res = await getAlerts();
    setAlerts(res.alerts || []);
  }

  useEffect(() => { loadAlerts(); }, []);

  function countAlertsFor(svc) {
    return alerts.filter(a => a.service === svc).length;
  }

  async function makeMock() {
    await generateMock();
    await loadAlerts();
    alert('Mock data generated (1 hour). Refresh pages to see data.');
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      <div className="bg-gray-900 p-4 rounded-md flex justify-between items-center shadow-md">
        <div>
          <h3 className="text-xl font-semibold">Services</h3>
          <div className="text-gray-400 text-sm">Monitored services</div>
        </div>
        <button
          onClick={makeMock}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Generate Mock Data
        </button>
      </div>

      <div className="bg-gray-900 p-4 rounded-md shadow-md space-y-4">
        {services.map(s => (
          <div
            key={s}
            className="flex justify-between items-center p-3 bg-gray-800 rounded"
          >
            <div>
              <div className="font-semibold">{s}</div>
              <div className="text-gray-400 text-sm">
                Health:{' '}
                <span className="bg-green-600 px-2 py-1 rounded text-xs">OK</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-gray-400 text-sm">{countAlertsFor(s)} active alerts</div>
              <Link to={`/service/${s}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                  Open
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
