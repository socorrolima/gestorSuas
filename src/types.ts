export interface Municipality {
  id: string;
  name: string;
  state: string;
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  povertyRate: number; // 0-100
  extremePovertyRate: number; // 0-100
  foodInsecurityRate: number; // 0-100
  cadUnicoCoverage: number; // 0-100
  schoolDropoutRate: number; // 0-100
  vulnerabilityScore: number; // calculated
  riskLevel: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  coordinates: [number, number]; // [lat, lng]
}

export interface SocialAction {
  id: string;
  title: string;
  description: string;
  municipalityId: string;
  status: 'Planejado' | 'Em Execução' | 'Concluído' | 'Atrasado';
  targetDate: string;
  progress: number; // 0-100
}

export interface Recommendation {
  id: string;
  type: 'Expansão' | 'Busca Ativa' | 'Infraestrutura' | 'Equipes';
  title: string;
  description: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  impact: string;
}

export type UserRole = 'Federal' | 'Estadual' | 'Municipal' | 'Analista';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  location?: string; // State or Municipality ID
}
