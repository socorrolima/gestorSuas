import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_MUNICIPALITIES } from '../mockData';
import { Filter, Search, Layers, Maximize2, MapPin, X as CloseIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import MunicipalityModal from './MunicipalityModal';
import { Municipality } from '../types';

// Component to control map view
function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 10, {
        duration: 1.5
      });
    }
  }, [center, map]);
  return null;
}

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
  const [regionFilter, setRegionFilter] = React.useState('all');
  const [selectedMunicipality, setSelectedMunicipality] = React.useState<Municipality | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [mapCenter, setMapCenter] = React.useState<[number, number] | null>(null);
  const [showSearchResults, setShowSearchResults] = React.useState(false);

  const regions = Array.from(new Set(MOCK_MUNICIPALITIES.map(m => m.region)));

  const filteredMunicipalities = React.useMemo(() => {
    return MOCK_MUNICIPALITIES.filter(m => {
      const matchesRisk = filter === 'all' || m.riskLevel === filter;
      const matchesRegion = regionFilter === 'all' || m.region === regionFilter;
      const matchesSearch = !searchQuery.trim() || 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRisk && matchesRegion && matchesSearch;
    });
  }, [filter, regionFilter, searchQuery]);

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return MOCK_MUNICIPALITIES.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.state.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSelectMunicipality = (m: Municipality) => {
    setMapCenter(m.coordinates);
    setSearchQuery(m.name);
    setShowSearchResults(false);
  };

  const handleOpenModal = (m: Municipality) => {
    setSelectedMunicipality(m);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Diagnóstico Territorial</h2>
          <p className="text-slate-500">Mapeamento dinâmico de vulnerabilidades sociais e cobertura de serviços.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <select 
            className="bg-transparent border-none text-sm font-medium text-slate-600 px-3 py-1 focus:ring-0 outline-none"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">Todas as Regiões</option>
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
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
        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-4 z-[1000] w-72 md:w-96">
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex items-center px-4 py-2">
              <Search className="text-slate-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Buscar município ou estado..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full py-1"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
              />
              {searchQuery && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <CloseIcon size={16} />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {searchResults.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMunicipality(m)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50 last:border-none transition-colors"
                  >
                    <div className={cn(
                      "w-2 h-8 rounded-full",
                      m.riskLevel === 'Crítico' ? "bg-red-700" : 
                      m.riskLevel === 'Alto' ? "bg-red-500" : 
                      m.riskLevel === 'Médio' ? "bg-amber-500" : "bg-emerald-500"
                    )}></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{m.name} - {m.state}</p>
                      <p className="text-xs text-slate-500">{m.region} • SVS: {m.vulnerabilityScore}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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
          <MapController center={mapCenter} />
          {filteredMunicipalities.map((m) => (
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
              eventHandlers={{
                click: () => handleOpenModal(m)
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
                    <button 
                      onClick={() => handleOpenModal(m)}
                      className="w-full mt-2 flex items-center justify-center gap-2 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all"
                    >
                      <Maximize2 size={14} />
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <MunicipalityModal 
        municipality={selectedMunicipality}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
