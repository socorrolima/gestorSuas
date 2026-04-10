import React from 'react';
import { MOCK_ACTIONS } from '../mockData';
import { cn } from '../lib/utils';
import { Plus, Calendar, Target, CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function Planning() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Planejamento e Execução</h2>
          <p className="text-slate-500">Gestão de ações estratégicas e acompanhamento de metas do SUAS.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus size={20} />
          Nova Ação
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Ações em Andamento</h3>
          <div className="space-y-4">
            {MOCK_ACTIONS.map((action) => (
              <div key={action.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                        action.status === 'Em Execução' ? "bg-blue-100 text-blue-700" :
                        action.status === 'Concluído' ? "bg-emerald-100 text-emerald-700" :
                        action.status === 'Atrasado' ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                      )}>
                        {action.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{action.title}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Prazo</p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                      <Calendar size={14} />
                      {new Date(action.targetDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-6">{action.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-700">Progresso</span>
                    <span className="font-bold text-blue-600">{action.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        action.status === 'Atrasado' ? "bg-red-500" : "bg-blue-600"
                      )}
                      style={{ width: `${action.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Metas do Período</h3>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Target size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700">Cobertura CadÚnico</span>
                    <span className="text-sm font-bold text-slate-400">95%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Clock size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700">Tempo Médio Atend.</span>
                    <span className="text-sm font-bold text-slate-400">15 min</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Resumo de Status</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="text-2xl font-bold text-emerald-700">12</p>
                  <p className="text-xs font-medium text-emerald-600">Concluídas</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-2xl font-bold text-red-700">03</p>
                  <p className="text-xs font-medium text-red-600">Atrasadas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3">
            <AlertCircle className="text-amber-600 shrink-0" size={20} />
            <p className="text-sm text-amber-800 font-medium">
              3 ações de busca ativa estão com prazo vencendo em 48h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
