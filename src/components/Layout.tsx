import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  ShieldAlert, 
  Lightbulb, 
  ClipboardList, 
  BarChart3, 
  Users,
  Menu,
  X,
  Bell,
  UserCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  key?: string;
}

const SidebarItem = ({ to, icon: Icon, label, active }: SidebarItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
    <span className="font-medium">{label}</span>
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();

  const menuItems = [
    { to: '/', icon: LayoutDashboard, label: 'Visão Geral' },
    { to: '/diagnostico', icon: MapIcon, label: 'Diagnóstico Territorial' },
    { to: '/priorizacao', icon: ShieldAlert, label: 'Priorização Inteligente' },
    { to: '/recomendacoes', icon: Lightbulb, label: 'Recomendações' },
    { to: '/planejamento', icon: ClipboardList, label: 'Planejamento' },
    { to: '/monitoramento', icon: BarChart3, label: 'Monitoramento' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3 border-bottom border-slate-100">
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              G
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">GestorSUAS</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Inteligência Social</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.to} 
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to} 
              />
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users size={16} />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Gestor Federal</p>
                  <p className="text-xs text-slate-500">MDS / Brasília</p>
                </div>
              </div>
              <button className="w-full py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                Sair do Sistema
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-96">
            <input 
              type="text" 
              placeholder="Buscar município ou indicador..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <UserCircle size={24} />
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Socorro Lima</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
