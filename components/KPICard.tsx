
import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { classNames } from '../utils/formatters';

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg transition-all hover:border-slate-600">
      <div className="flex justify-between items-start mb-4">
        <div className={classNames("p-3 rounded-xl", color)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={classNames(
            "flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg",
            isPositive ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change).toFixed(2)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default KPICard;
