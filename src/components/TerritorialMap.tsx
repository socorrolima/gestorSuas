import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_MUNICIPALITIES } from '../mockData';
import { Filter, Search, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

// Fix for default marker icon in Leaflet
import L from 'leaflet';

// Use CDN for icons to avoid build issues with local assets
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RISK_COLORS = {
  'Baixo': '#10b981',
  'Médio': '#f59e0b',
  'Alto': '#ef4444',
  'Crítico': '#7f1d1d'
};

export default function TerritorialMap() {
  const [filter, setFilter] = React.useState('all');

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Diagnóstico Territorial</h2>
          <p className="text-slate-500">Mapeamento dinâmico de vulnerabilidades sociais e cobertura de serviços.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('Crítico')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'Crítico' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Críticos
          </button>
        </div>
      </div>

      <div className="flex-1 relative min-h-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <button className="p-3 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-blue-600 transition-colors">
            <Layers size={20} />
          </button>
          <button className="p-3 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-blue-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-3 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-blue-600 transition-colors">
            <Filter size={20} />
          </button>
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Nível de Risco</h4>
          <div className="space-y-2">
            {Object.entries(RISK_COLORS).map(([level, color]) => (
              <div key={level} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="text-sm font-medium text-slate-700">{level}</span>
              </div>
            ))}
          </div>
        </div>

        <MapContainer 
          center={[-14.235, -51.9253]} 
          zoom={4} 
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {MOCK_MUNICIPALITIES
            .filter(m => filter === 'all' || m.riskLevel === filter)
            .map((m) => (
            <CircleMarker 
              key={m.id}
              center={m.coordinates} 
              radius={m.riskLevel === 'Crítico' ? 12 : 8}
              pathOptions={{ 
                fillColor: RISK_COLORS[m.riskLevel], 
                color: 'white', 
                weight: 2, 
                fillOpacity: 0.8 
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-lg text-slate-900 border-b pb-2 mb-2">{m.name} - {m.state}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Pobreza:</span>
                      <span className="font-semibold">{m.povertyRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Inseg. Alimentar:</span>
                      <span className="font-semibold">{m.foodInsecurityRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Cobertura CadÚnico:</span>
                      <span className="font-semibold">{m.cadUnicoCoverage}%</span>
                    </div>
                    <div className="mt-3 pt-2 border-t flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-slate-400">Score Final:</span>
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-bold text-white",
                        m.riskLevel === 'Crítico' ? "bg-red-800" : 
                        m.riskLevel === 'Alto' ? "bg-red-600" : 
                        m.riskLevel === 'Médio' ? "bg-amber-500" : "bg-emerald-500"
                      )}>
                        {m.vulnerabilityScore}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
