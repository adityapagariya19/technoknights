import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "./Card";

export interface GainerLoser {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface PlayPokerLoseMoneyProps {
  gainers: GainerLoser[];
  losers: GainerLoser[];
}

const TokenList = ({ title, tokens, isGainer }: { title: string; tokens: GainerLoser[]; isGainer: boolean }) => (
  <Card className="p-6 h-full flex flex-col">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      <div
        className={`px-2 py-1 rounded bg-[#1A1B1E] text-xs font-mono border border-[#2A2B2E] ${
          isGainer ? "text-emerald-500" : "text-red-500"
        }`}
      >
        24h Top 5
      </div>
    </div>

    <div className="flex-1 space-y-3">
      {tokens.map((token) => (
        <motion.div
          key={token.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col"
        >
          <div className="text-white font-medium">{token.symbol}</div>
          <div className="text-xs text-zinc-400">{token.name}</div>
          <div className="text-white font-bold">
            ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </div>
          <div
            className={`text-xs flex items-center justify-end gap-1 ${
              isGainer ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isGainer ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(token.change).toFixed(2)}%
          </div>
        </motion.div>
      ))}
    </div>
  </Card>
);

export const PlayPokerLoseMoney = ({ gainers, losers }: PlayPokerLoseMoneyProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <TokenList title="Gainers" tokens={gainers} isGainer={true} />
      <TokenList title="Losers" tokens={losers} isGainer={false} />
    </div>
  );
};
