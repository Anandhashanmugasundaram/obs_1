import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MetricChart from '../components/MetricChart';
import LogsViewer from '../components/LogsViewer';
import AlertsPanel from '../components/AlertsPanel';
import { getMetrics, getAlerts, ackAlert } from '../api';

export default function ServiceDetails() {
  const { name } = useParams();
  const [series, setSeries] = useState([]);
  const [alerts, setAlerts] = useState([]);

  async function loadMetrics() {
    const to = new Date().toISOString();
    const from = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const res = await getMetrics(name, 'latency', from, to, 60000);
    setSeries(res.series || []);
  }

  async function loadAlerts() {
    const res = await getAlerts();
    setAlerts(res.alerts.filter(a => a.service === name));
  }

  async function handleAck(id) {
    await ackAlert(id);
    await loadAlerts();
  }

  useEffect(() => {
    loadMetrics();
    loadAlerts();
    const t = setInterval(() => {
      loadMetrics();
      loadAlerts();
    }, 5000);
    return () => clearInterval(t);
  }, [name]);

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <div className="bg-gray-900 p-4 rounded-md shadow-md">
        <h3 className="text-xl font-semibold">Service: {name}</h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <MetricChart series={series} title="Latency (ms)" />
          <LogsViewer service={name} />
        </div>

        <div className="w-full lg:w-80">
          <AlertsPanel alerts={alerts} onAck={handleAck} />
        </div>
      </div>
    </div>
  );
}
