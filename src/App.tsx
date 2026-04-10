import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TerritorialMap from './components/TerritorialMap';
import Prioritization from './components/Prioritization';
import Recommendations from './components/Recommendations';
import Planning from './components/Planning';
import Monitoring from './components/Monitoring';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/diagnostico" element={<TerritorialMap />} />
          <Route path="/priorizacao" element={<Prioritization />} />
          <Route path="/recomendacoes" element={<Recommendations />} />
          <Route path="/planejamento" element={<Planning />} />
          <Route path="/monitoramento" element={<Monitoring />} />
        </Routes>
      </Layout>
    </Router>
  );
}
