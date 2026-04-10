import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Users, AlertTriangle, Calendar, MapPin, BarChart3 } from 'lucide-react';
import { Municipality } from '../types';
import { cn } from '../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface MunicipalityModalProps {
  municipality: Municipality | null;
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_HISTORY = [
  { year: '2022', score: 65 },
  { year: '2023', score: 68 },
  { year: '2024', score: 72 },
  { year: '2025', score: 70 },
  { year: '2026', score: 75 },
];

export default function MunicipalityModal({ municipality, isOpen, onClose }: MunicipalityModalProps) {
  if (!municipality) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-2xl text-white shadow-lg",
                  municipality.riskLevel === 'Crítico' ? "bg-red-700" : 
                  municipality.riskLevel === 'Alto' ? "bg-red-500" : 
                  municipality.riskLevel === 'Médio' ? "bg-amber-500" : "bg-emerald-500"
                )}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{municipality.name} - {municipality.state}</h2>
                  <p className="text-slate-500 font-medium">{municipality.region} • ID: {municipality.id}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Indicators Column */}
                <div className="lg:col-span-1 space-y-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Indicadores Atuais</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-3 text-red-600">
                        <AlertTriangle size={18} />
                        <span className="text-xs font-bold uppercase">Pobreza</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{municipality.povertyRate}%</p>
                      <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${municipality.povertyRate}%` }} />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-3 text-amber-600">
                        <TrendingUp size={18} />
                        <span className="text-xs font-bold uppercase">Insegurança Alimentar</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{municipality.foodInsecurityRate}%</p>
                      <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${municipality.foodInsecurityRate}%` }} />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3 mb-3 text-blue-600">
                        <Users size={18} />
                        <span className="text-xs font-bold uppercase">Cobertura CadÚnico</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{municipality.cadUnicoCoverage}%</p>
                      <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${municipality.cadUnicoCoverage}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Column */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Histórico de Risco (SVS)</h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar size={14} />
                      2022 - 2026
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={MOCK_HISTORY}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#1e3a8a" 
                          strokeWidth={4} 
                          dot={{ r: 6, fill: '#1e3a8a', strokeWidth: 2, stroke: '#fff' }} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <BarChart3 size={20} />
                        <span className="font-bold text-sm">Score Atual</span>
                      </div>
                      <p className="text-4xl font-black text-blue-900">{municipality.vulnerabilityScore}</p>
                      <p className="text-xs text-blue-700 mt-1 font-medium">Classificação: {municipality.riskLevel}</p>
                    </div>
                    <div className="p-6 bg-slate-900 rounded-2xl text-white">
                      <h4 className="font-bold mb-2">Análise Inteligente</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        O município apresenta tendência de alta no SVS nos últimos 3 anos. Recomenda-se intervenção imediata em segurança alimentar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all"
              >
                Fechar
              </button>
              <button className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Gerar Relatório Completo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
