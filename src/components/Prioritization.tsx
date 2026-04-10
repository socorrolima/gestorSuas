import React from 'react';
import { MOCK_MUNICIPALITIES } from '../mockData';
import { cn } from '../lib/utils';
import { Search, Filter, Download, ArrowUpDown, ShieldAlert, Info } from 'lucide-react';

export default function Prioritization() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('all');
  const [sortConfig, setSortConfig] = React.useState<{ key: string, direction: 'asc' | 'desc' } | null>({ key: 'vulnerabilityScore', direction: 'desc' });

  const municipalities = React.useMemo(() => {
    let filtered = MOCK_MUNICIPALITIES.filter(m => 
      (m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.state.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (regionFilter === 'all' || m.region === regionFilter)
    );

    if (sortConfig) {
      filtered.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, regionFilter, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const regions = Array.from(new Set(MOCK_MUNICIPALITIES.map(m => m.region)));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Priorização Inteligente</h2>
          <p className="text-slate-500">Ranking de municípios baseado no Score de Vulnerabilidade Social (SVS).</p>
        </div>
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all shadow-sm">
          <Download size={18} />
          Exportar Relatório
        </button>
      </div>

      {/* Methodology Info */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-4 items-start">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 mb-1">Cálculo do Score (SVS)</h4>
          <p className="text-sm text-blue-800 leading-relaxed">
            O score é calculado ponderando: <span className="font-bold">Pobreza (40%)</span>, <span className="font-bold">Insegurança Alimentar (30%)</span>, <span className="font-bold">Evasão Escolar (20%)</span> e <span className="font-bold">Déficit de Cobertura (10%)</span>.
          </p>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por município ou estado..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">Todas as Regiões</option>
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} />
            Filtros
          </button>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ranking</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600" onClick={() => requestSort('name')}>
                  <div className="flex items-center gap-2">Município <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Região</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600" onClick={() => requestSort('povertyRate')}>
                  <div className="flex items-center gap-2">Pobreza <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600" onClick={() => requestSort('vulnerabilityScore')}>
                  <div className="flex items-center gap-2">SVS <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {municipalities.map((m, index) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm",
                      index < 3 && regionFilter === 'all' && sortConfig?.key === 'vulnerabilityScore' && sortConfig?.direction === 'desc' 
                        ? "bg-red-100 text-red-700" 
                        : "bg-slate-100 text-slate-600"
                    )}>
                      #{index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.state}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{m.region}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            m.povertyRate > 40 ? "bg-red-500" : m.povertyRate > 20 ? "bg-amber-500" : "bg-emerald-500"
                          )}
                          style={{ width: `${m.povertyRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{m.povertyRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-slate-900">{m.vulnerabilityScore}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      m.riskLevel === 'Crítico' ? "bg-red-100 text-red-700" :
                      m.riskLevel === 'Alto' ? "bg-orange-100 text-orange-700" :
                      m.riskLevel === 'Médio' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                    )}>
                      {m.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
