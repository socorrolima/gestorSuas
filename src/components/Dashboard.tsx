import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { MOCK_MUNICIPALITIES } from '../mockData';
import { cn } from '../lib/utils';

const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  value: string; 
  trend: 'up' | 'down'; 
  trendValue: string; 
  icon: React.ElementType; 
  color: string;
}) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon className="text-white" size={24} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
        trend === 'up' ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50"
      )}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trendValue}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
  </div>
);

export default function Dashboard() {
  const data = [
    { name: 'Norte', value: 45 },
    { name: 'Nordeste', value: 52 },
    { name: 'C. Oeste', value: 25 },
    { name: 'Sudeste', value: 18 },
    { name: 'Sul', value: 15 },
  ];

  const COLORS = ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Painel Executivo</h2>
        <p className="text-slate-500">Visão consolidada dos indicadores de assistência social em território nacional.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Pobreza Extrema" 
          value="12.4M" 
          trend="up" 
          trendValue="2.4%" 
          icon={AlertTriangle} 
          color="bg-red-500"
        />
        <StatCard 
          title="Cobertura CadÚnico" 
          value="94.2%" 
          trend="down" 
          trendValue="0.8%" 
          icon={Users} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Insegurança Alimentar" 
          value="33.1M" 
          trend="up" 
          trendValue="5.1%" 
          icon={TrendingUp} 
          color="bg-amber-500"
        />
        <StatCard 
          title="Ações Concluídas" 
          value="854" 
          trend="down" 
          trendValue="12%" 
          icon={CheckCircle2} 
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vulnerability by Region */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Vulnerabilidade por Região</h3>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Média %</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Critical Municipalities */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Municípios em Alerta Crítico</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Ver todos</button>
          </div>
          <div className="space-y-4">
            {MOCK_MUNICIPALITIES.filter(m => m.riskLevel === 'Crítico').map(m => (
              <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-red-600 rounded-full"></div>
                  <div>
                    <p className="font-bold text-slate-900">{m.name} - {m.state}</p>
                    <p className="text-xs text-slate-500">Score de Vulnerabilidade: {m.vulnerabilityScore}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">CRÍTICO</p>
                  <p className="text-xs text-slate-400">{m.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
