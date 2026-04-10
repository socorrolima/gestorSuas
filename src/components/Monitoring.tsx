import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingDown, TrendingUp, Filter, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

const EVOLUTION_DATA = [
  { month: 'Jan', pobreza: 42, inseguranca: 35 },
  { month: 'Fev', pobreza: 41, inseguranca: 34 },
  { month: 'Mar', pobreza: 43, inseguranca: 36 },
  { month: 'Abr', pobreza: 40, inseguranca: 33 },
  { month: 'Mai', pobreza: 38, inseguranca: 31 },
  { month: 'Jun', pobreza: 37, inseguranca: 30 },
];

export default function Monitoring() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Monitoramento e Avaliação</h2>
          <p className="text-slate-500">Acompanhamento temporal do impacto das políticas públicas.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all shadow-sm">
            <Calendar size={18} />
            Últimos 6 meses
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
            Filtrar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Evolution Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Evolução dos Indicadores</h3>
              <p className="text-xs text-slate-500">Comparativo mensal de pobreza e insegurança alimentar</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs font-bold text-slate-600">Pobreza</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs font-bold text-slate-600">Insegurança</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={EVOLUTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Line type="monotone" dataKey="pobreza" stroke="#1e3a8a" strokeWidth={3} dot={{r: 4, fill: '#1e3a8a'}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="inseguranca" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: '#f59e0b'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Análise de Impacto</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Meta Atingida</span>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Redução da Extrema Pobreza</p>
                  <p className="text-xs text-slate-500">Comparado ao mesmo período de 2025</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-emerald-600">-8.4%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Variação</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Eficiência de Repasse</p>
                  <p className="text-xs text-slate-500">Tempo médio de processamento FNAS</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">+12.5%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Variação</p>
              </div>
            </div>

            <div className="p-6 bg-blue-700 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Conclusão do Monitoramento</h4>
              <p className="text-sm text-blue-100 leading-relaxed">
                As políticas de busca ativa implementadas no último trimestre resultaram em uma redução significativa da invisibilidade social em territórios críticos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
