import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServicesOverview from './pages/ServicesOverview';
import ServiceDetails from './pages/ServiceDetails';
import AlertsPage from './pages/AlertsPage';
import IngestDemo from './pages/IngestDemo';
import Header from './components/Header';

export default function App(){
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ServicesOverview />} />
        <Route path="/service/:name" element={<ServiceDetails />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/ingest" element={<IngestDemo />} />
      </Routes>
    </div>
  );
}
