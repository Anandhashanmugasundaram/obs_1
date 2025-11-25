import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function MetricChart({ series, title }) {
  const data = {
    labels: series.map(s => new Date(s.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: title || 'value',
        data: series.map(s => s.value),
        borderWidth: 2,
        borderColor: '#3b82f6', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // translucent fill
        tension: 0.3, // smooth curves
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: '#ddd' } },
      y: { ticks: { color: '#ddd' }, beginAtZero: false }
    },
    plugins: {
      legend: { labels: { color: '#fff' } },
      tooltip: {
        backgroundColor: '#1f2937', // gray-800
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md" style={{ height: 300 }}>
      <h4 className="text-lg font-semibold mb-3">{title}</h4>
      <Line data={data} options={options} />
    </div>
  );
}
