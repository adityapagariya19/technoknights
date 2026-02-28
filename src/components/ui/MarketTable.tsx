import { motion } from "framer-motion";
import {
  Plus,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Coin } from "../../types/market";

export type SortField =
  | "name"
  | "current_price"
  | "price_change_percentage_24h"
  | "market_cap";

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface MarketTableProps {
  coins: Coin[];
  onAddToWatchlist: (coin: Coin) => void;
  watchlistIds: string[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  selectedCoinId: string | null;
  onRowClick: (coinId: string) => void;
}

interface SectorHeatmapProps {
  sectors: {
    name: string;
    marketCap: number;
    change: number;
  }[];
}

export const SectorHeatmap = ({ sectors }: SectorHeatmapProps) => {
  const totalMarketCap = sectors.reduce(
    (sum, sector) => sum + sector.marketCap,
    0
  );

  const layoutStyles = [
    "col-span-12 md:col-span-8 row-span-2",
    "col-span-6 md:col-span-4 row-span-1",
    "col-span-6 md:col-span-4 row-span-1",
    "col-span-4 md:col-span-3 row-span-1",
    "col-span-4 md:col-span-3 row-span-1",
    "col-span-4 md:col-span-6 row-span-1",
  ];

  return (
    <div className="bg-[#151619] rounded-2xl border border-[#1A1B1E] overflow-hidden p-1.5 h-full min-h-[400px]">
      <div className="grid grid-cols-12 auto-rows-fr gap-1.5 h-full w-full">
        {sectors.slice(0, 6).map((sector, index) => {
          const isPositive = sector.change >= 0;
          const percentage = Math.abs(sector.change);
          const intensity = Math.min(percentage / 10, 1);

          const bgColorStyle = isPositive
            ? `rgba(16, 185, 129, ${0.1 + intensity * 0.4})`
            : `rgba(239, 68, 68, ${0.1 + intensity * 0.4})`;

          return (
            <div
              key={sector.name}
              className={`${layoutStyles[index]} rounded-xl p-4 flex flex-col justify-between`}
              style={{ backgroundColor: bgColorStyle }}
            >
              <div className="text-sm font-semibold text-white">
                {sector.name}
              </div>
              <div
                className={`text-lg font-bold ${
                  isPositive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {sector.change.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MarketTable = ({
  coins,
  onAddToWatchlist,
  watchlistIds,
  sortConfig,
  onSort,
  selectedCoinId,
  onRowClick,
}: MarketTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-zinc-400 uppercase text-xs border-b border-[#1A1B1E]">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">24h</th>
            <th className="px-6 py-3 text-left">Market Cap</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <motion.tr
              key={coin.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => onRowClick(coin.id)}
              className={`cursor-pointer transition-colors ${
                selectedCoinId === coin.id
                  ? "bg-[#141414]"
                  : "hover:bg-[#151619]"
              }`}
            >
              <td className="px-6 py-4 text-white flex items-center gap-3">
                <span className="font-semibold">{coin.name}</span>
                <span className="text-xs text-zinc-500 uppercase">
                  {coin.symbol}
                </span>
              </td>
              <td className="px-6 py-4 text-white font-mono">
                ${coin.current_price.toLocaleString()}
              </td>
              <td
                className={`px-6 py-4 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? (
                  <ArrowUpRight size={14} className="inline mr-1" />
                ) : (
                  <ArrowDownRight size={14} className="inline mr-1" />
                )}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </td>
              <td className="px-6 py-4 text-zinc-400">
                ${(coin.market_cap / 1e9).toFixed(2)}B
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToWatchlist(coin);
                  }}
                  disabled={watchlistIds.includes(coin.id)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {watchlistIds.includes(coin.id) ? (
                    <ShieldCheck
                      size={18}
                      className="text-emerald-500"
                    />
                  ) : (
                    <Plus
                      size={18}
                      className="text-zinc-400 hover:text-white"
                    />
                  )}
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
