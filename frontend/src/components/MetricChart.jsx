import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function MetricChart({ series, title }) {
  const data = {
    labels: series.map(s => new Date(s.timestamp).toLocaleTimeString()),
    datasets: [{
      label: title || 'value',
      data: series.map(s => s.value)
    }]
  };
  const options = { maintainAspectRatio: false, scales: { x: { display: true }, y: { beginAtZero: false } } };
  return (
    <div style={{height:300}} className="card">
      <h4>{title}</h4>
      <Line data={data} options={options} />
    </div>
  );
}
