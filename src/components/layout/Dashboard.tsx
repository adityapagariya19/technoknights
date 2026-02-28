import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Activity, ShieldCheck } from "lucide-react";

import DashboardLayout from "../layout/DashboardLayout";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Card } from "../ui/Card";
import { MarketTable } from "../components/MarketTable";
import { WatchlistSidebar } from "../components/WatchlistSidebar";
import { StatCard } from "../components/StatCard";
import { ActivityView } from "../views/ActivityView";
import { TrendingView } from "../views/TrendingView";
import { SettingsView } from "../views/SettingsView";

/* ================= TYPES ================= */

type TabType = "dashboard" | "activity" | "trending" | "settings";

type SortField =
  | "market_cap"
  | "current_price"
  | "price_change_percentage_24h";

interface SortConfig {
  field: SortField;
  direction: "asc" | "desc";
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  market_cap: number;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
}

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
}

/* ================= COMPONENT ================= */

export default function Dashboard() {
  const queryClient = useQueryClient();

  const [walletConnected, setWalletConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "market_cap",
    direction: "desc",
  });

  /* ---------- Fetch Market ---------- */

  const { data: coins = [] } = useQuery({
    queryKey: ["marketData"],
    queryFn: async () => {
      const res = await axios.get("/api/market");
      return Array.isArray(res.data) ? res.data : [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  /* ---------- Default Selected Coin ---------- */

  useEffect(() => {
    if (coins.length > 0 && !selectedCoinId) {
      setSelectedCoinId(coins[0].id);
    }
  }, [coins, selectedCoinId]);

  /* ---------- Watchlist ---------- */

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const res = await axios.get("/api/watchlist");
      return res.data as WatchlistItem[];
    },
  });

  const addToWatchlist = useMutation({
    mutationFn: (coin: Coin) =>
      axios.post("/api/watchlist", {
        item: { id: coin.id, symbol: coin.symbol, name: coin.name },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  const removeFromWatchlist = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/watchlist/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  /* ---------- Filter + Sort ---------- */

  const filteredCoins = useMemo(() => {
    const filtered = coins.filter(
      (c: Coin) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const field = sortConfig.field;
      const valA = a[field] as number;
      const valB = b[field] as number;

      return sortConfig.direction === "asc"
        ? valA - valB
        : valB - valA;
    });
  }, [coins, searchQuery, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "desc"
          ? "asc"
          : "desc",
    }));
  };

  const selectedCoinData = useMemo(() => {
    return coins.find((c: Coin) => c.id === selectedCoinId) || coins[0];
  }, [coins, selectedCoinId]);

  const watchlistIds = watchlist.map((i: WatchlistItem) => i.id);

  /* ================= RENDER ================= */

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      walletConnected={walletConnected}
      setWalletConnected={setWalletConnected}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      {activeTab === "dashboard" ? (
        <div className="p-8 max-w-7xl mx-auto grid grid-cols-12 gap-8">

          {/* Stats */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Global Market Cap" value="$2.48T" change={2.4} icon={TrendingUp} />
            <StatCard title="24h Volume" value="$84.2B" change={-1.2} icon={Activity} />
            <StatCard title="BTC Dominance" value="52.4%" change={0.8} icon={ShieldCheck} />
          </div>

          {/* Market Section */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card>
              <div className="w-full p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {selectedCoinData?.name}
                </h3>

                {selectedCoinData && (
                  <ResponsiveContainer width="100%" aspect={2.5}>
                    <AreaChart
                      data={(selectedCoinData.sparkline_in_7d?.price ?? []).map(
                        (p: number, i: number) => ({
                          time: i,
                          price: p,
                        })
                      )}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#141414" />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#10b981"
                        fillOpacity={0.2}
                        fill="#10b981"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>

            <Card>
              <MarketTable
                coins={filteredCoins}
                onAddToWatchlist={(c) => addToWatchlist.mutate(c)}
                watchlistIds={watchlistIds}
                sortConfig={sortConfig}
                onSort={handleSort}
                selectedCoinId={selectedCoinId}
                onRowClick={setSelectedCoinId}
              />
            </Card>
          </div>

          {/* Watchlist */}
          <div className="col-span-12 lg:col-span-4 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
            <WatchlistSidebar
              items={watchlist}
              onRemove={(id) => removeFromWatchlist.mutate(id)}
            />
          </div>
        </div>
      ) : activeTab === "activity" ? (
        <ActivityView />
      ) : activeTab === "trending" ? (
        <TrendingView />
      ) : activeTab === "settings" ? (
        <SettingsView />
      ) : null}
    </DashboardLayout>
  );
}
