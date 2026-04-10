import React from 'react';
import { Recommendation } from '../types';
import { 
  Lightbulb, 
  ArrowRight, 
  Users, 
  Utensils, 
  Home, 
  Truck,
  AlertCircle,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { cn } from '../lib/utils';

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'r1',
    type: 'Expansão',
    title: 'Expansão de Benefícios Eventuais',
    description: 'Municípios com insegurança alimentar acima de 35% devem priorizar a ampliação da oferta de cestas básicas e auxílio-natalidade.',
    priority: 'Alta',
    impact: 'Redução imediata da fome em 15%'
  },
  {
    id: 'r2',
    type: 'Busca Ativa',
    title: 'Busca Ativa CadÚnico',
    description: 'Identificada baixa cobertura em áreas rurais. Recomenda-se mutirão para cadastramento de famílias invisíveis ao sistema.',
    priority: 'Alta',
    impact: 'Inclusão de ~500 novas famílias'
  },
  {
    id: 'r3',
    type: 'Equipes',
    title: 'Equipes Itinerantes',
    description: 'Para territórios de difícil acesso, a implantação de equipes volantes do CRAS é a estratégia mais eficaz para garantir o acesso ao SUAS.',
    priority: 'Média',
    impact: 'Aumento de 25% na cobertura territorial'
  },
  {
    id: 'r4',
    type: 'Infraestrutura',
    title: 'Modernização de Unidades CRAS',
    description: 'Unidades com alta demanda e infraestrutura precária necessitam de reforma para melhor acolhimento dos usuários.',
    priority: 'Baixa',
    impact: 'Melhoria na qualidade do atendimento'
  }
];

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Expansão': return <Utensils size={20} />;
    case 'Busca Ativa': return <Users size={20} />;
    case 'Infraestrutura': return <Home size={20} />;
    case 'Equipes': return <Truck size={20} />;
    default: return <Lightbulb size={20} />;
  }
};

export default function Recommendations() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Recomendações Automáticas</h2>
          <p className="text-slate-500">Sugestões de intervenção baseadas na análise inteligente dos dados territoriais.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
          <CheckCircle2 size={16} />
          Análise Atualizada
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {RECOMMENDATIONS.map((rec) => (
          <div key={rec.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className={cn(
                "p-3 rounded-xl",
                rec.type === 'Expansão' ? "bg-orange-100 text-orange-600" :
                rec.type === 'Busca Ativa' ? "bg-blue-100 text-blue-600" :
                rec.type === 'Equipes' ? "bg-purple-100 text-purple-600" : "bg-slate-100 text-slate-600"
              )}>
                <TypeIcon type={rec.type} />
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                rec.priority === 'Alta' ? "bg-red-100 text-red-700" :
                rec.priority === 'Média' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
              )}>
                Prioridade {rec.priority}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">{rec.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {rec.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                <TrendingUp size={12} />
                Impacto Estimado
              </div>
              <p className="text-sm font-semibold text-slate-700">{rec.impact}</p>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all group-hover:translate-y-[-2px]">
              Iniciar Planejamento
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* AI Insight Box */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-blue-200">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
              <AlertCircle size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Insight da Inteligência</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Tendência de Aumento na Vulnerabilidade Rural</h3>
          <p className="text-blue-100 leading-relaxed mb-6">
            Detectamos um padrão de crescimento na insegurança alimentar em municípios de pequeno porte na região Norte. 
            Recomendamos a antecipação de repasses do FNAS para ações de proteção social básica nestas localidades antes do período de entressafra.
          </p>
          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all">
            Ver Análise Detalhada
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
