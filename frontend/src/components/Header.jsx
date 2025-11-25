import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header w-full bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white py-6 px-8 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Left section */}
        <div>
          <h2 className="text-4xl font-bold">Observability Dashboard</h2>
          <div className="text-gray-300 text-sm mt-1">
            Demo: metrics, logs, simple alerts
          </div>
        </div>

        {/* Right controls */}
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            Services
          </Link>

          <Link 
            to="/alerts"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            Alerts
          </Link>

          <Link 
            to="/ingest"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            Ingest
          </Link>
        </div>
      </div>
    </div>
  );
}
