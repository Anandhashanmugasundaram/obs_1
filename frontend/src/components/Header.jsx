import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <div className="header">
      <div>
        <h2>Observability Dashboard</h2>
        <div className="small">Demo: metrics, logs, simple alerts</div>
      </div>
      <div className="controls">
        <Link to="/" className="button" style={{textDecoration:'none'}}><span>Services</span></Link>
        <Link to="/alerts" style={{textDecoration:'none'}}><button className="button">Alerts</button></Link>
        <Link to="/ingest" style={{textDecoration:'none'}}><button className="button">Ingest</button></Link>
      </div>
    </div>
  );
}
