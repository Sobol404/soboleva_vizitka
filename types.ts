import { LucideIcon } from 'lucide-react';

export interface ServiceFeature {
  text: string;
  included: boolean;
}

export interface ServicePackage {
  title: string;
  priceRub: string;
  priceUsd: string;
  duration?: string;
  format?: string;
  features: string[];
  result?: string;
  isVip?: boolean;
  notes?: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface SocialStat {
  value: string;
  label: string;
}

export interface GuaranteeItem {
  title: string;
  features: string[];
}