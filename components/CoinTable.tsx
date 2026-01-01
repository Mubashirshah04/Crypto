
import React from 'react';
import { Star, ChevronUp, ChevronDown } from 'lucide-react';
import { Coin, SortField, SortOrder } from '../types';
import { formatCurrency, formatPercent, formatCompactNumber, classNames } from '../utils/formatters';

interface CoinTableProps {
  coins: Coin[];
  watchlist: string[];
  onToggleWatchlist: (id: string) => void;
  onSelectCoin: (coin: Coin) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const CoinTable: React.FC<CoinTableProps> = ({ 
  coins, 
  watchlist, 
  onToggleWatchlist, 
  onSelectCoin,
  sortField,
  sortOrder,
  onSort
}) => {
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
            <th className="px-4 py-4 w-10"></th>
            <th className="px-4 py-4 font-semibold">#</th>
            <th className="px-4 py-4 font-semibold">Coin</th>
            <th 
              className="px-4 py-4 font-semibold cursor-pointer hover:text-white transition-colors"
              onClick={() => onSort('current_price')}
            >
              <div className="flex items-center gap-1">Price {renderSortIcon('current_price')}</div>
            </th>
            <th 
              className="px-4 py-4 font-semibold cursor-pointer hover:text-white transition-colors text-right"
              onClick={() => onSort('price_change_percentage_24h')}
            >
              <div className="flex items-center justify-end gap-1">24h % {renderSortIcon('price_change_percentage_24h')}</div>
            </th>
            <th 
              className="px-4 py-4 font-semibold cursor-pointer hover:text-white transition-colors text-right"
              onClick={() => onSort('market_cap')}
            >
              <div className="flex items-center justify-end gap-1">Market Cap {renderSortIcon('market_cap')}</div>
            </th>
            <th className="px-4 py-4 font-semibold text-right">Volume (24h)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {coins.map((coin) => (
            <tr 
              key={coin.id} 
              className="group hover:bg-slate-800/40 transition-colors cursor-pointer"
              onClick={() => onSelectCoin(coin)}
            >
              <td className="px-4 py-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlist(coin.id);
                  }}
                  className={classNames(
                    "transition-colors",
                    watchlist.includes(coin.id) ? "text-amber-400" : "text-slate-600 hover:text-slate-400"
                  )}
                >
                  <Star className="w-5 h-5" fill={watchlist.includes(coin.id) ? "currentColor" : "none"} />
                </button>
              </td>
              <td className="px-4 py-4 text-slate-400 font-mono text-sm">{coin.market_cap_rank}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{coin.name}</div>
                    <div className="text-slate-500 text-xs font-medium uppercase">{coin.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-medium text-white">{formatCurrency(coin.current_price)}</td>
              <td className={classNames(
                "px-4 py-4 font-semibold text-right text-sm",
                coin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-rose-400"
              )}>
                {formatPercent(coin.price_change_percentage_24h)}
              </td>
              <td className="px-4 py-4 text-right text-slate-300 font-medium">
                {formatCompactNumber(coin.market_cap)}
              </td>
              <td className="px-4 py-4 text-right text-slate-300 font-medium">
                {formatCompactNumber(coin.total_volume)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
