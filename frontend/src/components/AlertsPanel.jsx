import React from 'react';

export default function AlertsPanel({ alerts = [], onAck }) {
  return (
    <div className="card bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg mb-3 font-semibold">Alerts</h4>

      {alerts.length === 0 && (
        <div className="text-gray-400 text-sm">No active alerts</div>
      )}

      {alerts.map(a => (
        <div
          key={a.id}
          className="flex justify-between items-center py-3 border-b border-gray-800"
        >
          <div>
            <div className="font-semibold">
              {a.name}
              <span className="text-gray-400 text-sm"> — {a.service}</span>
            </div>

            <div className="text-gray-400 text-sm">
              rate: {(a.value * 100).toFixed(1)}% &nbsp; | &nbsp;
              threshold: {(a.threshold * 100).toFixed(1)}%
            </div>
          </div>

          <div>
            {a.acknowledged ? (
              <span className="bg-green-600 px-2 py-1 rounded text-xs">ACKED</span>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                onClick={() => onAck(a.id)}
              >
                Acknowledge
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
